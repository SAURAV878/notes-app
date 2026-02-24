import { Router } from "express";
import multer from "multer";

import db from "../data/database.js";

 const router = Router();

 const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
 });

 const upload = multer({
    storage: storage
 });


 router.get('/', (req, res) => {
    try {
        const notes = db.prepare('SELECT * FROM notes').all();
        res.json(notes);
    }catch(error) {
        res.status(500).json({
            message: error.message
        })

    }
 });

 router.get('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const note = db.prepare('SELECT * FROM notes WHERE id = ?').get(id);

        if(!note) {
            return res.status(404).json({
                message: `note with id ${id} not found`
            });
        }

        res.json(note);
    }catch (error) {
        res.status(500).json({
            message: error.message
        })

        
    }
 });

router.post('/',upload.single('image'), (req, res) => {
    try {
        const {userId, title, content} = req.body;

        const imagePath = req.file ? req.file.filename : null;

        if (!title || title === "") {
            return res.status(400).json({
                message : "Title is required"
            });
        }

        const user = db.prepare('SELECT * FROM users WHERE id = ?').get(userId);
        if (!user) {
            return res.status(400).json({
                message: "User not found"
            });
        }

        const result = db.prepare('INSERT INTO notes (userID, title, content, image) VALUES(?,?,?,?)').run(userId, title, content || null, imagePath);

        const newNote = db.prepare('SELECT * FROM notes WHERE id = ?').get(result.lastInsertRowid);

        res.status(201).json(newNote);
    } catch (error) {
        res.json(500).json({
            message: error.message
        });
    }
});

router.put('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const {title, content} = req.body;

        const note = db.prepare('SELECT * FROM notes WHERE id = ?').get(id);
        
        if(!note) {
            return res.status(404).json({
                message: "Note not found"
            });
        }

        const updateTitle = title ?? note.title;
        const updateContent = content ?? note.content;

        db.prepare('UPDATE notes SET title=?, content=? WHERE id = ?').run(updateTitle, updateContent, id);

        const updateNote = db.prepare('SELECT * FROM notes WHERE id = ?').get(id);

        res.json(updateNote);
    } catch (error) {
        res.status(500).json ({
            message: error.message
        });
    }
});

router.delete('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);

        const note = db.prepare('SELECT * FROM notes WHERE id = ?').get(id);

        if(!note) {
            return res.status(404).json({
                message: "note not found"
            });
        }
        
        db.prepare('DELETE FROM notes WHERE id = ?').run(id);
        res.json({
            message: "Deleted succesfully"
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
})


 export default router;
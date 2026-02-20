import { raw, Router } from "express";

import db from "../data/database.js";

 const router = Router();



 router.get('/', (req, res) => {
    const notes = db.prepare('SELECT * FROM notes').all();
    res.json(notes);
 });

 router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const note = db.prepare('SELECT * FROM notes WHERE id = ?').get(id);

    if(!note) {
        return res.status(404).json({
            message: `note with id ${id} not found`
        });
    }

    res.json(note);
 });

router.post('/', (req, res) => {
    const {userId, title, content} = req.body;

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

    const result = db.prepare('INSERT INTO notes (userID, title, content) VALUES(?,?,?)').run(userId, title, content || null);

    const newNote = db.prepare('SELECT * FROM notes WHERE id = ?').get(result.lastInsertRowid);

    res.status(201).json(newNote);
});

router.put('/:id', (req, res) => {
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
});

router.delete('/:id', (req, res) => {
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
})


 export default router;
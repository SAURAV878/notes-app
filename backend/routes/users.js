import { Router } from "express";


import db from "../data/database.js";



const router = Router();


router.get('/', (req, res) => {
    const users =  db.prepare('SELECT * FROM users').all();
    res.json(users);
});

router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(id);

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    res.json(user);

});

router.post('/', (req, res) => {
    const {name, age} = req.body;

    if (!name || name.trim() === "") {
        return res.status(400).json ({
            message: "Name is required"
        });
    }  

    const result  = db.prepare('INSERT INTO users (name, age) VALUES (?,?)').run(name, age || null);
    
    const newUser = db.prepare('SELECT * FROM users WHERE id = ?').get(result.lastInsertRowid);
    
    res.status(201).json(newUser);

});

router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const {name, age} = req.body;

    const existingUser = db.prepare('SELECT * FROM users WHERE id = ?').get(id);

    if (!existingUser) {
        return res.status(404).json ({
            message: "User not found"
        });
    }

    const updateName = name ?? existingUser.name;
    const updateAge = age ?? existingUser.age;

    db.prepare('UPDATE users SET name = ?, age = ? WHERE id = ?').run(updateName, updateAge, id);

    const updateUser =db.prepare('SELECT * FROM users WHERE id = ?').get(id);


    res.json(updateUser);

});


router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const existingUser = db.prepare('SELECT * FROM users WHERE id = ?').get(id);

    if(!existingUser) {
        return res.status(404).json({
            message : "Cant delete user"
        });
    }

   db.prepare('DELETE FROM users WHERE id = ?').run(id);
    res.json({
        message: "user is deleted succesfully"
    });

});

// router.get('/:id/notes', (req, res) => {
//     const userId = parseInt(req.params.id);
//     const userNote = notes.filter(n => n.userId === userId);
//     res.json(userNote);
// });



export default router;
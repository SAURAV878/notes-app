import { Router } from "express";

import { users } from "../data/database.js";
import { notes } from "../data/database.js";



const router = Router();
let nextId = 1;

router.get('/', (req, res) => {
    res.json(users);
})

router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find( u => u.id === id);

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    res.json(user);

});

router.post('/', (req, res) => {
    if (!req.body.name || req.body.name.trim() === "") {
        return res.status(400).json ({
            message: "Name is required"
        });
    }  

    const newUser = req.body;
    
    newUser.id = nextId;

    nextId = nextId + 1;

    users.push(newUser);
    
    res.status(201).json(newUser);

});

router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find( u => u.id === id);

    if (!user) {

        return res.status(404).json ({
            message: "User not updated"
        });
    }
        user.name = req.body.name ?? user.name;
        user.age = req.body.age ?? user.age;

    res.json(user);

});


router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find( u => u.id === id);

    if(!user) {
        return res.status(404).json({
            message : "Cant delete user"
        });
    }

    const index = users.findIndex(u => u.id === id);
    users.splice(index , 1);

    res.json({
        message: "user is deleted succesfully"
    })

});

router.get('/:id/notes', (req, res) => {
    const userId = parseInt(req.params.id);
    const userNote = notes.filter(n => n.userId === userId);
    res.json(userNote);
});



export default router;
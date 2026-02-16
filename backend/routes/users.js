import { Router } from "express";

import { users } from "../data/database.js";



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


router.post('/', (req, res) => {
    const newUser = req.body;
    newUser.id = nextId;
    nextId = nextId + 1;
    users.push(newUser);
    res.status(201).json(newUser);

});


export default router;
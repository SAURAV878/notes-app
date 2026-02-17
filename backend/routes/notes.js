// import { Router } from "express";
//  import { notes } from "../data/database.js";
//  import { users } from "../data/database.js";

//  const router = Router();

//  let nextId = 1

//  router.get('/', (req, res) => {
//     res.json(notes);
//  });

//  router.get('/:id', (req, res) => {
//     const id = parseInt(req.params.id);
//     const note = notes.find(n => n.id === id);

//     if(!note) {
//         return res.status(404).json({
//             message: "note not found of id"
//         });
//     }

//     res.json(note);
//  });

// router.post('/', (req, res) => {
//     const user = users.find(u => u.id === req.body.userId);
//     if (!user) {
//         return res.status(404).json({
//             message : "User not found"
//         });
//     }

//     if (!req.body.title || req.body.title.trim() === "") {
//         return res.status(400).json({
//             message: "title is required"
//         });
//     }

//     const newNote = {
//         id: nextId,
//         title: req.body.title,
//         content: req.body.content,
//         userId: req.body.userId
//     };
//     nextId = nextId + 1;
//     notes.push(newNote);

//     res.status(201).json(newNote);
// });

// router.put('/:id', (req, res) => {
//     const id = parseInt(req.params.id);
//     const note = notes.find(n => n.id === id);

//     if(!note) {
//         return res.status(404).json({
//             message: "Note not found"
//         });
//     }

//     note.title = req.body.title ?? note.title;
//     note.content = req.body.content ?? note.content;

//     res.json(note);
// });

// router.delete('/:id', (req, res) => {
//     const id = parseInt(req.params.id);
//     const note = notes.find(n =>  n.id === id)

//     if(!note) {
//         return res.status(404).json({
//             message: "id not delete"
//         });
//     }

//     const index = notes.findIndex(n => n.id === id);
//     notes.splice(index, 1);

//     res.json({
//         message: "Deleted succesfully"
//     })
// })


//  export default router;
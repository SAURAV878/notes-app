import express from 'express';
import usersRouter from './routes/users.js';
// import notesRouter from './routes/notes.js';

const app = express();
app.use(express.json());

app.use('/users', usersRouter);
// app.use('/notes', notesRouter);

app.listen(8000 , () => {
    
});




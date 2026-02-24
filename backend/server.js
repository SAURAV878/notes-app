import express from 'express';
import usersRouter from './routes/users.js';
import notesRouter from './routes/notes.js';
import logger from './middleware/logger.js';

const app = express();
app.use(express.json()); //prase JSON body
app.use(logger); //log the request

app.use(express.static('../frontend'));
app.use('/uploads', express.static('uploads'));

app.use('/users', usersRouter);
app.use('/notes', notesRouter);


app.listen(8000 , () => {
    
});



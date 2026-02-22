import express from 'express';
import usersRouter from './routes/users.js';
import notesRouter from './routes/notes.js';
import logger from './middleware/logger.js';

const app = express();
app.use(express.json());
app.use(logger);

app.use(express.static('../frontend'));
app.use('/uploads', express.static('uploads'));

app.use('/users', usersRouter);
app.use('/notes', notesRouter);


app.listen(8000 , () => {
    
    console.log('is runinf')
});



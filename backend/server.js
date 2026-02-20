import express from 'express';
import usersRouter from './routes/users.js';
import notesRouter from './routes/notes.js';
import logger from './middleware/logger.js';

const app = express();
app.use(express.json());


app.use('/users', usersRouter);
app.use('/notes', notesRouter);
app.use(logger);

app.listen(8000 , () => {
    
});




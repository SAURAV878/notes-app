import Database from 'better-sqlite3';

const db = new Database('./data/users.db'); //data leive in a file

db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        age INTEGER
    )
`);

export default db;
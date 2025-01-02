const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, '../../ecommerce.db'), (err) => {
  if (err) {
    console.error('Error connecting to SQLite3 database:', err.message);
  } else {
    console.log('Connected to SQLite3 database');
  }
});

module.exports = db;

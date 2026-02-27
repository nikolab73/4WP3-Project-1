const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const { init } = require('./app.ctrl');

const dbPath = path.join(__dirname, 'trips.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
  } else {
    initializeDatabase();
  }
});

async function initializeDatabase() {
    db.run(`CREATE TABLE IF NOT EXISTS trips (
        rowid INTEGER PRIMARY KEY AUTOINCREMENT,
        routeName TEXT NOT NULL,
        routeStartingPoint TEXT NOT NULL,
        region TEXT NOT NULL,
        difficulty TEXT NOT NULL,
        portageDistance INTEGER NOT NULL,
        description TEXT NOT NULL,
        image BLOB,
        password TEXT NOT NULL
    )`);
}

async function getAllTrips() {
    return new Promise((resolve, reject) => {
        db.all('SELECT rowid, * FROM trips', (err, rows) => {
            if (err) {
                reject(err);
            }
            resolve(rows);
        });
    });
}

module.exports = {
    initializeDatabase,
    getAllTrips
};
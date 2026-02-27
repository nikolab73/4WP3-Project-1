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
    distance REAL NOT NULL,
    portageDistance INTEGER NOT NULL,
    description TEXT NOT NULL,
    image BLOB,
    password TEXT NOT NULL
  )`, (err) => {
    if (err) {
      console.error('Error creating table:', err);
    } else {
      console.log('Trips table is ready');
    }
  });
}

async function getAllTrips() {
    return new Promise((resolve, reject) => {
        db.all('SELECT rowid, routeName, routeStartingPoint, region, difficulty, distance, portageDistance, description, image FROM trips', (err, rows) => {
            if (err) {
                reject(err);
            }
            resolve(rows);
        });
    });
}

async function getTripById(id) {
    return new Promise((resolve, reject) => {
        db.get('SELECT rowid, routeName, routeStartingPoint, region, difficulty, distance,portageDistance, description, image, password FROM trips WHERE rowid = ?', [id], (err, row) => {
            if (err) {
                reject(err);
            }
            resolve(row);
        });
    });
}

async function tripsSortedByRegion() {
    return new Promise((resolve, reject) => {
        db.all('SELECT rowid, routeName, routeStartingPoint, region, difficulty, distance, portageDistance, description, image FROM trips ORDER BY region', (err, rows) => {
            if (err) {
                reject(err);
            }
            resolve(rows);
        });
    });
}

async function tripsSortedByDifficulty() {
    return new Promise((resolve, reject) => {
        db.all('SELECT rowid, routeName, routeStartingPoint, region, difficulty, distance, portageDistance, description, image FROM trips ORDER BY difficulty', (err, rows) => {
            if (err) {
                reject(err);
            }
            resolve(rows);
        });
    });
}

async function tripsSortedByDistance() {
    return new Promise((resolve, reject) => {
        db.all('SELECT rowid, routeName, routeStartingPoint, region, difficulty, distance, portageDistance, description, image FROM trips ORDER BY distance', (err, rows) => {
            if (err) {
                reject(err);
            }
            resolve(rows);
        });
    });
}

async function addTrip(rowId, routeName, routeStartingPoint, region, difficulty, distance, portageDistance, description, image, password) {
    return new Promise((resolve, reject) => {
        db.run('INSERT INTO trips (rowid, routeName, routeStartingPoint, region, difficulty, distance, portageDistance, description, image, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [rowId, routeName, routeStartingPoint, region, difficulty, distance, portageDistance, description, image, password], function(err) {
            if (err) {
                reject(err);
            } else {
                resolve(this.lastID);
            }
        });
    });
}

async function updateTrip(id, routeName, routeStartingPoint, region, difficulty, distance, portageDistance, description, image, password) {
    return new Promise((resolve, reject) => {
        db.run('UPDATE trips SET routeName = ?, routeStartingPoint = ?, region = ?, difficulty = ?, distance = ?, portageDistance = ?, description = ?, image = ?, password = ? WHERE rowid = ?', [routeName, routeStartingPoint, region, difficulty, distance, portageDistance, description, image, password, id], function(err) {
            if (err) {
                reject(err);
            } else {
                resolve(this.changes);
            }
        });
    });
}

async function deleteTrip(id) {
    return new Promise((resolve, reject) => {
        db.run('DELETE FROM trips WHERE rowid = ?', [id], function(err) {
            if (err) {
                reject(err);
            } else {
                resolve(this.changes);
            }
        });
    });
}

module.exports = {
    initializeDatabase,
    getAllTrips,
    getTripById,
    tripsSortedByRegion,
    tripsSortedByDifficulty,
    addTrip,
    updateTrip,
    deleteTrip
};
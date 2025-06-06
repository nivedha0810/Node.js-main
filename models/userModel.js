const db = require('../db/sqlite');

exports.createUser = (username, callback) => {
  db.run('INSERT INTO users (username) VALUES (?)', [username], function (err) {
    callback(err, { id: this.lastID, username });
  });
};

exports.findUserByUsername = (username, callback) => {
  db.get('SELECT * FROM users WHERE username = ?', [username], callback);
};

exports.findUserById = (id, callback) => {
  db.get('SELECT * FROM users WHERE id = ?', [id], callback);
};

exports.getAllUsers = (callback) => {
  db.all('SELECT * FROM users', callback);
};

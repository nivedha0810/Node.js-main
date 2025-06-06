const db = require('../db/sqlite');

exports.addExercise = (userId, description, duration, date, callback) => {
  db.run(
    'INSERT INTO exercises (userId, description, duration, date) VALUES (?, ?, ?, ?)',
    [userId, description, duration, date],
    function (err) {
      callback(err, {
        id: this.lastID,
        userId,
        description,
        duration,
        date,
      });
    }
  );
};

exports.getExerciseLogs = (userId, from, to, limit, callback) => {
  let params = [userId];
  let query = 'SELECT * FROM exercises WHERE userId = ?';

  if (from) {
    query += ' AND date >= ?';
    params.push(from);
  }
  if (to) {
    query += ' AND date <= ?';
    params.push(to);
  }

  query += ' ORDER BY date';

  if (limit) {
    query += ' LIMIT ?';
    params.push(limit);
  }

  db.all(query, params, callback);
};

exports.countExercises = (userId, from, to, callback) => {
  let params = [userId];
  let query = 'SELECT COUNT(*) as count FROM exercises WHERE userId = ?';

  if (from) {
    query += ' AND date >= ?';
    params.push(from);
  }
  if (to) {
    query += ' AND date <= ?';
    params.push(to);
  }

  db.get(query, params, callback);
};

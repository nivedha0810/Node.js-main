const exerciseModel = require('../models/exerciseModel');
const userModel = require('../models/userModel');

function isValidDateFormat(date) {
  return /^\d{4}-\d{2}-\d{2}$/.test(date);
}

function isValidDate(date) {
  const parsed = new Date(date);
  return parsed instanceof Date && !isNaN(parsed.getTime());
}

exports.addExercise = (userId, data, callback) => {
  const { description, duration, date } = data;

  if (!description || typeof description !== 'string') {
    return callback('Invalid description');
  }

  const numDuration = Number(duration);
  if (!duration || isNaN(numDuration) || numDuration <= 0) {
    return callback('Invalid duration');
  }

  const exerciseDate = date ? date : new Date().toISOString().split('T')[0];
  if (!isValidDateFormat(exerciseDate) || !isValidDate(exerciseDate)) {
    return callback('Invalid date format (yyyy-mm-dd)');
  }

  userModel.findUserById(userId, (err, user) => {
    if (err || !user) return callback('User not found');
    exerciseModel.addExercise(userId, description, numDuration, exerciseDate, callback);
  });
};

exports.getLogs = (userId, query, callback) => {
  const { from, to, limit } = query;

  userModel.findUserById(userId, (err, user) => {
    if (err || !user) return callback('User not found');

    exerciseModel.countExercises(userId, from, to, (err, countData) => {
      if (err) return callback('Error counting exercises');

      exerciseModel.getExerciseLogs(userId, from, to, limit, (err, logs) => {
        if (err) return callback('Error getting logs');

        callback(null, {
          id: user.id,
          username: user.username,
          count: countData.count,
          log: logs,
        });
      });
    });
  });
};

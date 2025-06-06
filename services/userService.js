const userModel = require('../models/userModel');

exports.createUser = (username, callback) => {
  const trimmed = username.trim();
  if (trimmed.length === 0) {
    return callback('Username cannot be empty or whitespace only');
  }

  userModel.findUserByUsername(trimmed, (err, existingUser) => {
    if (err) return callback('Database error');
    if (existingUser) return callback('Username already exists');

    userModel.createUser(trimmed, callback);
  });
};

exports.getAllUsers = (callback) => {
  userModel.getAllUsers(callback);
};

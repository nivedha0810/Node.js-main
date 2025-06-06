const userService = require('../services/userService');

exports.createUser = (req, res) => {
  const { username } = req.body;
  userService.createUser(username, (err, user) => {
    if (err) return res.status(400).json({ error: err });
    res.status(201).json(user);
  });
};

exports.getAllUsers = (req, res) => {
  userService.getAllUsers((err, users) => {
    if (err) return res.status(500).json({ error: 'Server error' });
    res.status(200).json(users);
  });
};

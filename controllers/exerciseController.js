const exerciseService = require('../services/exerciseService');

exports.addExercise = (req, res) => {
  const userId = parseInt(req.params._id);
  exerciseService.addExercise(userId, req.body, (err, result) => {
    if (err) return res.status(400).json({ error: err });
    res.status(201).json(result);
  });
};

exports.getLogs = (req, res) => {
  const userId = parseInt(req.params._id);
  exerciseService.getLogs(userId, req.query, (err, result) => {
    if (err) return res.status(400).json({ error: err });
    res.status(200).json(result);
  });
};

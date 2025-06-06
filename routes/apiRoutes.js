const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const exerciseController = require('../controllers/exerciseController');

router.post('/api/users', userController.createUser);
router.get('/api/users', userController.getAllUsers);
router.post('/api/users/:_id/exercises', exerciseController.addExercise);
router.get('/api/users/:_id/logs', exerciseController.getLogs);

module.exports = router;

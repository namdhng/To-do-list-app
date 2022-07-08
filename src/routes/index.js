const express = require('express');
const router = express.Router();
const { registerUserControl, loginUserControl, createTaskControl, readTaskControl, updateTaskControl, deleteTaskControl } = require('../controllers/todoController');

router.route('/').post(createTaskControl);
router.route('/:id').patch(updateTaskControl).delete(deleteTaskControl).get(readTaskControl);
router.route('/register').post(registerUserControl);
router.route('/login').post(loginUserControl);

module.exports = router
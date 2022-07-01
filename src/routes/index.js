const express = require('express');
const router = express.Router();
const {createNewTask, readNewTask, updateNewTask, deleteNewTask} = require('../controllers/todoController');

router.route('/').post(createNewTask);
router.route('/:id').patch(updateNewTask).delete(deleteNewTask).get(readNewTask);

module.exports = router
const express = require('express');
const router = express.Router();
const { createTaskCtrl, getTasksFilterCtrl, getTaskByIDCtrl, getTaskByTitleCtrl, getTaskByUsernameCtrl, updateTaskCtrl, deleteTaskCtrl } = require('../controllers/taskController');
const authToken = require('../controllers/authController');

// router.route('/')
//     .post(authToken, createTaskCtrl)
//     .post(authToken, getTasksFilterCtrl)
//     .post(authToken, getTaskByTitleCtrl)
//     .post(authToken, getTaskByUsernameCtrl);

router.route('/post')
    .post(createTaskCtrl)
router.route('/statusfilter')
    .post(getTasksFilterCtrl)
router.route('/titlefilter')
    .post(getTaskByTitleCtrl)
router.route('/usernamefilter')
    .post(getTaskByUsernameCtrl)

// router.route('/:id')
//     .patch(authToken, updateTaskCtrl)
//     .delete(authToken, deleteTaskCtrl)
//     .get(authToken, getTaskByIDCtrl);

router.route('/:id')
    .get(getTaskByIDCtrl)
    .patch(updateTaskCtrl)
    .delete(deleteTaskCtrl)

module.exports = router
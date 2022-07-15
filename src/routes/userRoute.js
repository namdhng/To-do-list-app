const express = require('express');
const router = express.Router();
const { registerUserCtrl, loginUserCtrl, getUserCtrl, getUsersAndTasksCtrl } = require('../controllers/userController');
const authToken = require('../controllers/authController');

router.route('/register')
    .post(registerUserCtrl);
router.route('/login')
    .post(loginUserCtrl);
router.route('/userswithtask')
    .get(getUsersAndTasksCtrl);
router.route('/:id')
    .get(getUserCtrl);

module.exports = router;
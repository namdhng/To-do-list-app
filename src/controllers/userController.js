const { registerUser, loginUser, getUser, getUsersAndTasks } = require('../services/userServices');

async function registerUserCtrl(req, res) {
    const { name, email, password } = req.body;
    const newUser = await registerUser(name, email, password);
    res.send(newUser);
}

async function loginUserCtrl(req, res) {
    const { email, password } = req.body;
    const token = await loginUser(email, password);
    res.header('auth-token', token).send(token);
}

async function getUserCtrl(req, res) {
    const givenID = req.params.id;
    const user = await getUser(givenID);
    res.send(user);
}

async function getUsersAndTasksCtrl(req, res) {
    const allUsers = await getUsersAndTasks();
    console.log(allUsers);
    res.send(allUsers);
}

module.exports = { registerUserCtrl, loginUserCtrl, getUserCtrl, getUsersAndTasksCtrl };
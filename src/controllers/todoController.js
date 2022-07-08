const {registerUser, loginUser, createTask, readTask, updateTask, deleteTask} = require('../services/todoServices');

async function registerUserControl(req, res) {
    const { name, email, password } = req.body;
    const newUser = await registerUser(name, email, password);
    res.send(newUser);
}

async function loginUserControl(req, res) {
    const { email, password } = req.body;
    const token = await loginUser(email, password);
    res.header('auth-token', token).send(token);
}

async function createTaskControl(req, res) {
    console.log(req.body);
    const { taskBody, userId } = req.body;
    const task = await createTask(userId, taskBody);
    res.send(task);
}

async function readTaskControl(req, res) {
    const id = req.params.id;
    const task = await readTask(id);
    res.send(task);
}

async function updateTaskControl(req, res) {
    const id = req.params.id;
    const taskBody = req.body;
    const updatedTask = await updateTask(id, taskBody);
    res.send(updatedTask);
}

async function deleteTaskControl(req, res) {
    const id = req.params.id;
    const task = await deleteTask(id);
    res.send('Deleted', 200);
}

module.exports = { registerUserControl, loginUserControl, createTaskControl, readTaskControl, updateTaskControl, deleteTaskControl };
const {createTask, readTask, updateTask, deleteTask} = require('../services/todoServices');

async function createNewTask(req, res) {
    console.log(req.body);
    const { taskBody, userId } = req.body;
    const task = await createTask(userId, taskBody);
    res.send(task);
}

async function readNewTask(req, res) {
    const id = req.params.id;
    const task = await readTask(id);
    res.send(task);
}

async function updateNewTask(req, res) {
    const id = req.params.id;
    const taskBody = req.body;
    const updatedTask = await updateTask(id, taskBody);
    res.send(updatedTask);
}

async function deleteNewTask(req, res) {
    const id = req.params.id;
    const task = await deleteTask(id);
    res.send('Deleted', 200);
}

module.exports = {createNewTask, readNewTask, updateNewTask, deleteNewTask};
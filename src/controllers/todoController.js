const {createTask, readTask, updateTask, deleteTask} = require('../services/todoServices');

async function createNewTask(req, res) {
    const taskInfo = req.body;
    const task = await createTask(taskInfo);
    res.send(task);
}

async function readNewTask(req, res) {
    const id = req.params.id;
    const task = await readTask(id);
    res.send(task);
}

async function updateNewTask(req, res) {
    const id = req.params.id;
    const {title, description} = req.body;
    const task = await updateTask(id, title, description);
    res.send(task);
}

async function deleteNewTask(req, res) {
    const id = req.params.id;
    const task = await deleteTask(id);
    res.send(task);
}

module.exports = {createNewTask, readNewTask, updateNewTask, deleteNewTask};
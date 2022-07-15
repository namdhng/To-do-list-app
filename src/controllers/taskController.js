const { createTask, getTasksFilter, getTaskByID, getTaskByTitle, getTaskByUsername, updateTask, deleteTask } = require('../services/taskServices');

async function createTaskCtrl(req, res) {
    const { taskBody, userId } = req.body;
    const task = await createTask(userId, taskBody);
    task.save();
    res.send(task);
}

async function getTasksFilterCtrl(req, res) {
    const { status } = req.body;
    const tasks = await getTasksFilter(status);
    res.send(tasks);
}

async function getTaskByIDCtrl(req, res) {
    const id = req.params.id;
    const task = await getTaskByID(id);
    res.send(task);
}

async function getTaskByTitleCtrl(req, res) {
    const { task } = req.body;
    const specifiedTask = await getTaskByTitle(task);
    res.send(specifiedTask);
}

async function getTaskByUsernameCtrl(req, res) {
    const { name, status } = req.body;
    const task = await getTaskByUsername(name, status);
    res.send(task);
}

async function updateTaskCtrl(req, res) {
    const id = req.params.id;
    const taskBody = req.body;
    const updatedTask = await updateTask(id, taskBody);
    res.send(updatedTask);
}

async function deleteTaskCtrl(req, res) {
    const id = req.params.id;
    const task = await deleteTask(id);
    res.send('Deleted', 200);
}

module.exports = { createTaskCtrl, getTasksFilterCtrl, getTaskByIDCtrl, getTaskByTitleCtrl, getTaskByUsernameCtrl, updateTaskCtrl, deleteTaskCtrl };
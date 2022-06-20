module.exports = new class {
    constructor() {

    }

    create() {
        const id = uuidv4();
        const taskInfo = req.body;
        const newTask = {'id': id, ...taskInfo};
        let allTasks = this.readFile();
        allTasks.push(newTask);
        this.writeFile(allTasks);
        return id;
    }
}

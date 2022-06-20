module.exports = new class {
    constructor() {

    }

    insert() {
        // const id = uuidv4();
        // const taskInfo = req.body;
        // console.log(taskInfo);
        // const newTask = { 'id': id, ...taskInfo };
        // this.readFile().push(newTask);
        let id = this.service.insert();
        return id;
        // console.log(users);
    }
}
const express = require('express');
const { v4: uuidv4 } = require('uuid')
const controller = require("../controllers/todoController");
const fs = require('fs');

const api = new class {
    constructor(router) {
        this.router = router;
        this.controller = controller;
    }

    create() {
        this.router.post('/', (req, res) => {
            const id = uuidv4();
            const taskInfo = req.body;
            console.log(taskInfo);
            const newTask = {'id': id, ...taskInfo};
            console.log(this.readFile());
            this.readFile().push(newTask);
            // let id = this.controller.create();
            res.send(`Task with ID ${id} added`);
        })
    }

    read() {
        this.router.get('/', (req, res) => {
            // const id = req.params.id;
            // const userData = users.find((user) => user.id == id);
            res.send(this.readFile());
        })
    }

    update() {
        this.router.patch('/', (req, res) => {
            const {id} = req.params;
            const {title, description} = req.body;
            let modifiedTask = this.readFile().find((user) => user.id == id);
            console.log(req.body);
            if (title) {
                modifiedTask[title] = title;
            }
            if (description) {
                modifiedTask[description] = description;
            }
            res.send(`Task with ID ${id} modified`);
        })
    }

    delete() {
        this.router.delete('/:id', (req, res) => {
            let tasks = this.readFile();
            const id = req.params.id;
            const updatedToDos = tasks.filter((task) => task.id !== id.toString());
            console.log(updatedToDos);
            res.send(updatedToDos);
        })
    }

    readFile() {
        // let users = [];
        var data = fs.readFileSync('C:/Users/User/Desktop/FPT Proj/data.json', (err, data) => {
            if (err) throw err;
            // console.log(JSON.parse(data));
            // const database = JSON.parse(data);
            // users = users.concat(database);
            // users.forEach(obj => {
                //     console.log(`${  obj.id}: ${obj.title}`);
                //     });
            });
            // console.log(data);
            
            return JSON.parse(data);
        // return data;
    }
    proceed() {
        this.create();
        this.read();
        this.update();
        this.delete();
    }
}(express.Router());



api.proceed();
module.exports = api.router;

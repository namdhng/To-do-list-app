const express = require('express');
const { v4: uuidv4 } = require('uuid');
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
            const newTask = {'id': id, ...taskInfo};
            let allTasks = this.readFile();
            allTasks.push(newTask);
            console.log(allTasks);
            this.writeFile(allTasks);
            // let id = this.controller.create();
            res.send(`Task with ID ${id} added`);
        })
    }

    read() {
        this.router.get('/', (req, res) => {
            let allTasks = this.readFile();
            // if (!req.params.id) {
            //     console.log("here");
                res.send(allTasks);
            // } else {
            //     console.log("there");
            //     const id = req.params.id;
            //     const specifiedTasks = allTasks.find((task) => task.id == id);
            //     res.send(specifiedTasks);
            // }
        })
    }

    update() {
        this.router.patch('/:id', (req, res) => {
            let allTasks = this.readFile();
            const id = req.params.id;
            const {title, description} = req.body;
            let modifiedTask = allTasks.find((task) => task.id == id);
            console.log(id);
            console.log(modifiedTask);
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
            let allTasks = this.readFile();
            console.log(req.params.id);
            const id = req.params.id;
            console.log(id);
            const updatedToDos = allTasks.filter((task) => task.id !== id);
            console.log(updatedToDos);
            res.send(updatedToDos);
        })
    }

    readFile() {
        // let users = [];
        const dataPath = 'C:/Users/User/Desktop/FPT Proj/data.json';
        let data = fs.readFileSync(dataPath, (err, data) => {
            if (err) throw err;
            // console.log(JSON.parse(data));
            // const database = JSON.parse(data);
            // users = users.concat(database);
            // users.forEach(obj => {
            //         console.log(`${  obj.id}: ${obj.title}`);
            //         });
            });
            // console.log(data);
            
            return JSON.parse(data);
    }

    writeFile(data) {
        const dataPath = 'C:/Users/User/Desktop/FPT Proj/data.json';

        fs.writeFile(dataPath, JSON.stringify(data), (err) => {
            if (err) throw err;
            console.log("File written successfully\n");
            console.log("The written has the following contents:");
            console.log(fs.readFileSync(dataPath, "utf8"));
          });
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

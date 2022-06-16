const express = require("express");
const app = express();
const port = "8000";

const users = [
    {
        "id": 1,
        "title": "Do exercise",
        "description": "Do exercise at 7AM"
    },
    {
        "id": 2,
        "title": "Go to school",
        "description": "at 9AM"
    },
    {
        "id": 3,
        "title": "Do something",
        "description": "I don't know"
    }
]

app.post('/', (req, res) => {
    const id = uuidv4();
    const taskInfo = req.body();
    const newTask = {'id': id, ...taskInfo};
    users.push(newTask);
    res.send(`Task with ID ${id} added`);
})

app.get('/', (req, res) => {
    const userData = users.find((id) => users.id == id);
    res.send(userData);
})

app.patch('/', (req, res) => {
    const id = req.paramsn;
    const {title, description} = req.body();
    const modifiedTask = users.find((id) => users.id == id);
    modifiedTask[title] = title;
    modifiedTask[description] = description;
    res.send(`Task with ID ${id} modified`);
})

app.delete('/', (req, res) => {
    const id = req.body.params;
    const updatedToDos = users.filter(() => {
        users.id !== id
    })
})

app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  });


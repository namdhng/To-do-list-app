const { v4: uuidv4 } = require('uuid');
const fs = require('fs')
const UserModel = require('../../models/user');
const TaskModel = require('../../models/task');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

async function registerUser(userName, userEmail, userPassword) {
    if (! (userName && userEmail && userPassword)) {
        return "All fields are required."
    }

    const searchUser = await UserModel.findOne({where: { email: userEmail }});
    if (searchUser) {
        return "This email was already used."
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(userPassword, salt);
    const newUser = await UserModel.create({
        name: userName,
        email: userEmail.toLowerCase(),
        password: hashedPassword
    });

    return newUser;
}

async function loginUser(enteredEmail, enteredPassword) {
    if (! (enteredEmail && enteredPassword)) {
        return "All fields are required."
    }

    const user = await UserModel.findOne({where: { email: enteredEmail }});
    console.log(enteredPassword);
    console.log(user.password);
    if (user == null) {
        return "User is not found. Double check your email or register here if you have not."
    } else if (! (await bcrypt.compare(enteredPassword, user.password))) {
        return "Wrong password. Try again."
    } else {
        const token = jwt.sign({ 
            name: user.name, 
            email: enteredEmail.toLowerCase() }, 
            process.env.TOKEN_KEY, 
            { expiresIn: "2h" });
        
        return token;
    }
}

async function createTask(userId, taskInfo) {
    const user = await UserModel.findOne({where: { id: userId }});
    const task = await TaskModel.create({
        ...taskInfo,
        userId: userId
    });
    return task

    // const id = uuidv4();
    // const newTask = {'id': id, ...taskInfo};
    // let allTasks = await readFile();
    // console.log(allTasks);
    // allTasks.push(newTask);
    // await writeFile(allTasks);
    // return newTask;
}

async function readTask(givenId) {
    return TaskModel.findOne({ where: { id: givenId }});

    // let allTasks = await readFile();
    // if (!id) {
    //     return allTasks
    // } else {
    //     const specifiedTasks = allTasks.find((task) => task.id == id);
    //     return specifiedTasks;
    // }
}

async function updateTask(givenID, givenTaskBody) {
    console.log(givenTaskBody);
    return TaskModel.update(
        { ...givenTaskBody }, 
        { where: { id: givenID } } )

    // let allTasks = await readFile();
    // let modifiedTask = allTasks.find((task) => task.id == id);
    // if (title) {
    //     modifiedTask['title'] = title;
    // }
    // if (description) {
    //     modifiedTask['description'] = description;
    // }
    // console.log(modifiedTask);
    // await writeFile(allTasks);
    // return modifiedTask
}

async function deleteTask(givenId) {
    const test = await TaskModel.destroy(
        { where: { id: givenId }, truncate: true }
    );
        console.log(test);
        return test
    // let allTasks = await readFile();
    // const updatedToDos = allTasks.filter((task) => task.id !== id);
    // await writeFile(updatedToDos);
}

async function readFile() {
    const dataPath = 'C:/Users/User/Desktop/FPT Project/To-do-list-app/data.json';     
    let data = await fs.readFileSync(dataPath, (err, data) => {
        if (err) throw err;
    });           
    return JSON.parse(data);
}

async function writeFile(data) {
    const dataPath = 'C:/Users/User/Desktop/FPT Project/To-do-list-app/data.json';
    return fs.writeFile(dataPath, JSON.stringify(data), (err) => {
    if (err) throw err;
    console.log("File written successfully\n");
    console.log("The written has the following contents:");
    console.log(fs.readFileSync(dataPath, "utf8"));
    });
}

module.exports = {registerUser, loginUser, createTask, readTask, updateTask, deleteTask};

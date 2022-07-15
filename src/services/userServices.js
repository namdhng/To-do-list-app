const { v4: uuidv4 } = require('uuid');
const fs = require('fs')
const UserModel = require('../models/userModel')
const TaskModel = require('../models/taskModel');
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

    if (user === null) {
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

async function getUser(givenID) {
    return UserModel.findOne({where: { id: givenID }});
}

async function getUsersAndTasks() {
    const allUsers = UserModel.findAll({
        include: [{ 
            model: TaskModel, 
            required: false }]
        });
    return allUsers;
    }

module.exports = { registerUser, loginUser, getUser, getUsersAndTasks };

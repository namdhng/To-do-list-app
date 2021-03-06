const express = require("express");
const app = express();
const port = 8000;
const parser = require('body-parser');
const taskRoute = require('./src/routes/taskRoute');
const userRoute = require('./src/routes/userRoute')
const morgan = require('morgan');

const sequelize = require('./database');
const taskModel = require('./src/models/taskModel');
const userModel = require('./src/models/userModel');

app.use(parser.json());
app.use(parser.urlencoded({extended: false}));
app.use('/', taskRoute);
app.use('/', userRoute)
app.use(morgan());

userModel.hasMany(taskModel);
taskModel.belongsTo(userModel);

sequelize
  .sync({force: true})
  // .then((result) => {
  //   return userModel.bulkCreate([{ name: 'Nam', email: 'hungnama3ll@gmail.com' }, 
  //                               { name: 'Pom', email: 'thisispomelodao@gmail.com' }], 
  //                               { returning: true });
  // })
  // .then((result) => {
  //   const addedTasks = [{ task: 'homework', deadline: 2022-06-30, check: false },
  //   { task: 'assessment test', deadline: 2022-06-28, check: true }];
  //   return Tasks.bulkCreate(addedTasks, { returning: true });
  // })
  // .then((result, addedTasks) => {
  //   const specifiedUser = userTable.findOne({ where: { name: 'Nam' }});
  //   return specifiedUser.createTasks(addedTasks);
    // for (let row of addedTasks) {
    //   let eachTask = taskTable.findOne({ where: { task: row.task } });
    //   eachTask.userId = specifiedUser.id;
    // }
  // })
  // .then((result) => {
  //   console.log(result);
  // })
  // .catch((err) => {
  //   console.log(err.message);
  // });

app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  });


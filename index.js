const express = require("express");
const app = express();
const port = "8000";
const parser = require('body-parser');
const toDoList = require("./src/routes");
const morgan = require('morgan')

app.use(parser.json());
app.use(parser.urlencoded({extended: false}));
app.use("/", toDoList)
app.use(morgan())
app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  });


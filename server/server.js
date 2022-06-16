const express = require("express");
const cors = require("cors");
const path = require("path");

var mongo = require("mongodb");
var monk = require("monk");
var db = monk("localhost:27017/pizzeria", function (err, db) {
    if (err) {
        console.error("Db is not connected", err.message);
    }
});

var usersRouter = require("./routes/users");
var pizzasRouter = require("./routes/pizzas");

const app = express();

app.use(express.static(path.join(__dirname, "build")));
app.use(cors());

app.use(function (req, res, next) {
    req.db = db;
    next();
});

app.use("/users", usersRouter);
app.use("/pizzas", pizzasRouter);

app.listen(process.env.PORT || 8080);

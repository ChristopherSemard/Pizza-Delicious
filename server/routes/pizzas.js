var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res) {
    var db = req.db;
    var collection = db.get("pizzas");
    collection.find({}, {}, function (e, docs) {
        res.json(docs);
    });
});

/* GET users listing. */
router.get("/:id", function (req, res) {
    var db = req.db;
    var pizzaToFind = req.params.id;
    var collection = db.get("pizzas");
    collection.findOne({ name: pizzaToFind }, {}, function (e, docs) {
        res.json(docs);
    });
});
module.exports = router;

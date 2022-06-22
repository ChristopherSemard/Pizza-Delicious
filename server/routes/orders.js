var express = require("express");
var router = express.Router();
router.use(express.json());

router.post("/add", function (req, res) {
    var db = req.db;

    var collection = db.get("orders");

    collection.insert(req.body, function (err, doc) {
        if (err) {
            res.send("ERROR ADD");
        } else {
            res.json(doc);
        }
    });
});

module.exports = router;

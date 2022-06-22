var express = require("express");
var router = express.Router();
router.use(express.json());
const bcrypt = require("bcrypt");

/* GET users listing. */
router.post("/connect", function (req, res) {
    var db = req.db;

    var email = req.body.email;
    var password = req.body.password;
    var collection = db.get("users");

    collection.find({ $and: [{ email: email }] }, {}, function (e, docs) {
        if (docs == "") {
            res.json({
                code: 404,
                message: "Wrong informations.",
            });
            return;
        } else {
            bcrypt.compare(password, docs[0].password, function (err, result) {
                if (!result) {
                    res.json({
                        code: 404,
                        message: "Wrong informations.",
                    });
                    return;
                } else {
                    delete docs[0].password;
                    res.json({
                        code: 200,
                        message: "User connected.",
                        data: docs[0],
                    });
                }
            });
        }
    });
});

/* GET users listing. */
router.get("/:email", function (req, res) {
    var db = req.db;
    var userToFind = req.params.email;
    var collection = db.get("users");
    collection.findOne({ email: userToFind }, {}, function (e, docs) {
        console.log(docs);
        if (!docs) {
            res.json({
                code: 404,
                message: "User doesn't exists",
            });
            return;
        } else {
            res.json({
                code: 200,
                message: "User exists.",
            });
        }
    });
});

/* GET users listing. */
router.post("/update", function (req, res) {
    var db = req.db;

    var id = req.body.id;
    var street = req.body.street;
    var zip = req.body.zip;
    var city = req.body.city;
    var collection = db.get("users");

    collection.update(
        { _id: id },
        {
            $set: {
                address: {
                    street: street,
                    zip: zip,
                    city: city,
                },
            },
        },
        function (err, doc) {
            if (err) {
                res.send("ERROR UPDATE");
                console.log(err);
            } else {
                res.json({
                    code: 200,
                    message: "User connected.",
                    data: doc[0],
                });
            }
        }
    );
});

/* GET users listing. */
router.post("/add", function (req, res) {
    var db = req.db;

    var collection = db.get("users");
    bcrypt.hash(req.body.password, 5, function (err, hash) {
        req.body.password = hash;
        collection.insert(req.body, function (err, doc) {
            if (err) {
                res.send("ERROR ADD");
            } else {
                res.json({
                    code: 200,
                    message: "User created.",
                    data: doc[0],
                });
            }
        });
    });
});

module.exports = router;

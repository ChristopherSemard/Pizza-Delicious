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
module.exports = router;

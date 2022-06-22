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

module.exports = router;

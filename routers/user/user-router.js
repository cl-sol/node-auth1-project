const express = require("express");
const router = express.Router();
const User = require("./user-model");

router.get("/", (req, res) => {
    User.find()
        .then(users => {
            res.json(users);
        })
        .catch(err => res.send(err));
});

module.exports = router;
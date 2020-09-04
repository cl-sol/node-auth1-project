const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("./user-model");
const userMiddleware = require("../../middleware/user-middleware");

const router = express.Router();

router.get("/", (req, res) => {
    User.find()
        .then(users => {
            res.json(users);
        })
        .catch(err => res.send(err));
});

router.post("/register", async(req, res, next) => {
    try {
        const { username, password} = req.body;
        const user = await User
            .findBy({ username })
            .limit(1);

        if(user) {
            return res.status(409).json({
                message: "Username is already taken"
            })
        }

        const newUser = await User.addUser({
            username,
            password: await bcrypt.hash(password, 10)
        })

        res.status(201).json(newUser)

    } catch(err) {
        next(err);
    }
});

router.post("/login", async(req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await User
            .findBy({ username })
            .limit(1);

        const validateError = {
            message: "You shall not pass!"
        }

        if (!user) {
            return res.status(401).json(validateError);
        }
        //check that pw is valid by comparing plain text pw w hashed pw stored in db
        const passwordValid = await bcrypt.compare(password, user.password)

        if(!passwordValid) {
            return res.status(401).json(validateError);
        }
        
        req.session.user = user
        res.json({
            message: `Logged in as ${user.username}`
        })
        
    } catch(err) {
        next(err);
    }
});

router.get("/logout", userMiddleware.restrict(), async (req, res, next) => {
    try {
        req.session.destroy((err) => {
            if(err) {
                next(err)
            } else {
                res.status(204).end();
            }
        })
    } catch (err){
        next(err);
    }
});

router.get("/users", userMiddleware.restrict(), async (req, res, next) => {
    try {
        res.json(await User.find())
    } catch (err){
        next(err);
    }
});

module.exports = router;
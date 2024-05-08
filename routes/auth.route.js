const express = require("express");
const router = express.Router();
const { User } = require("../models/db.models");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/jwt.config");


router.post("/signup", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    console.log(username + " " + password);
    if (!username || !password) {
        return res.status(411).json({
            message: "All Field are Required"
        })
    }

    const isUserPresent = await User.findOne({
        username: username
    })

    if (isUserPresent) {
        return res.status(411).json({
            message: "User Already Exist "
        })
    }

    //! Create a user :
    const user = await User.create({
        username: username,
        password: password
    })

    const userId = user._id;

    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    res.json({
        message: "User Created Successfuly",
        token: token
    })


})

router.post("/test", async (req, res) => {
    const { username, password } = req.body;
    res.json({
        username: username,
        password: password
    })
});

router.get("/me", (req, res) => {
    res.send("hello")
})


module.exports = router;
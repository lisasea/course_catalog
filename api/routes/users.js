const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models").User;
const authenticateUser = require("./authenticate");
const Sequelize = require("sequelize"); //do I need this here?
const morgan = require("morgan"); //do I need this here?

router.get("/", authenticateUser, (req, res) => { // ?? (req, res, next) ?? returns the current authenticated user
    res.status(200);
    res.json({
        id: req.currentUser.id,
        firstName: req.currentUser.firstName,
        lastName: req.currentUser.lastName,
        emailAddress: req.currentUser.emailAddress
    });
});
    
router.post("/", (req, res, next) => {
    if (!req.body.emailAddress || !req.body.password) {
        const err = new Error("Insufficient email or password.  Please re-enter. ");
        err.status=400;
        next(err);
    } else {
        const newUser = { //if email does NOT exist create new user
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            emailAddress: req.body.emailAddress,
            password: req.body.password
        };
        newUser.password = bcrypt.hashSync(newUser.password); //hash password
        User.create(newUser) //create new user
            .then (() => {
                res.location("/"); //set Location header to "/"
                res.status(201).end();
            })
            .catch((err) => {
                console.log(err);
                if(err.name === "SequelizeValidationError" || err.name === "SequelizeConstraintError") {
                    res.status(400).json ({
                    err: err.errors
                    })
                } else {
                    err.status=500;
                    next(err);
                }
            })
        };      
    });

module.exports = router;
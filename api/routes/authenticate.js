"use strict";

const User = require("../models").User;
const auth = require("basic-auth");
const bcrypt = require("bcryptjs");

module.exports = (req, res, next) => {
    let message = null;

    const validData = auth(req);

    if (validData) {
        User.findOne({ where: { emailAddress: validData.name}}).then(user => {
            if (user) {
                const authenticated = bcrypt.compareSync(
                    validData.pass,
                    user.password   
                );
                if (authenticated) {
                    req.currentUser = user;
                    next();
                } else {
                    res.status(401);
                    message = "Passwords don't match. Please try again";
                    res.json({ message: message });
                }
            } else {
                message = "Email address not found";
                res.status(401);
                res.json({ message: message });
            }
        });
    } else {
        res.status(401);
        message = "Please provide your login data."
        res.json({ message: message });
    }
};
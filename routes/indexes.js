const express = require("express");
const router = express.Router();

router.get("/", function(req, res, next) {  // GET user
    res.redirect("/api/users")
});

module.exports = router;
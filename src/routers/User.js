const express = require("express");
const User = require("../controllers/User");

const router = express.Router();
const Controller = new User();

router.post("/register", Controller.register);
router.post("/signin", Controller.signin);

module.exports = router;

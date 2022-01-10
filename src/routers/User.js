const express = require("express");
const User = require("../controllers/User");

const router = express.Router();
const Controller = new User();

router.post("/register", Controller.register);
router.post("/login", (req, res) => {
  Controller.login(req, res);
  res.cookie("access_token", req.token);
});
router.post("/logout", (req, res) => {
  Controller.logout(req, res);
});

module.exports = router;

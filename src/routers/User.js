const express = require("express");
const User = require("../controllers/User");
const verifyToken = require("../middlewares/authenticate");

const router = express.Router();
const Controller = new User();

router.post("/register", Controller.register);
router.post("/login", (req, res) => {
  verifyToken, Controller.login(req, res);
  res.cookie("access_token", req.token);
});
router.post("/logout", Controller.logout);

module.exports = router;

const { User } = require("../models/User");
const cookie = require("cookie");
const bcrypt = require("bcrypt");
const httpStatus = require("http-status");
const redisClient = require("../loaders/redis");

const {
  generateAccessToken,
  generateRefreshToken,
} = require("../scripts/utils/helper");

class UserController {
  async register(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(httpStatus.BAD_REQUEST).json({
        message: "User already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(httpStatus.CREATED).json({
      message: "User created successfully",
      newUser,
    });
  }

  async login(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(httpStatus.BAD_REQUEST).json({
        message: "User does not exist",
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(httpStatus.BAD_REQUEST).json({
        message: "Invalid password",
      });
    }
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    res.cookie("access_token", accessToken);
    res.cookie("refresh_token", refreshToken);
    redisClient.set(refreshToken, user._id.toString());
    res.status(httpStatus.OK).json({
      message: "Login successfully",
      user,
      accessToken,
      refreshToken,
    });
  }

  async getUser(req, res) {
    const user = await User.findById(req.user._id);
    res.status(httpStatus.OK).json(user);
  }

  async logout(req, res) {
    const refreshToken = cookie.parse(req.headers.cookie).refresh_token;
    redisClient.del(refreshToken);
    res.clearCookie("access_token");
    res.clearCookie("refresh_token");
    res.status(httpStatus.OK).json({
      message: "Logout successfully",
    });
  }
}

module.exports = UserController;

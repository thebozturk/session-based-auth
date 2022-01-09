const { User } = require("../models/User");
const httpStatus = require("http-status");
const {
  passwordToHash,
  generateAccessToken,
  generateRefreshToken,
} = require("../scripts/utils/helper");

class UserController {
  async register(req, res) {
    const { full_name, email, password } = req.body;
    const user = new User({
      full_name,
      email,
      password: passwordToHash(password),
    });
    const savedUser = await user.save();
    res.status(httpStatus.CREATED).json({
      _id: savedUser._id,
      savedUser,
      token: generateAccessToken({ _id: savedUser._id }),
    });
  }
  async signin(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({
        message: "User not found",
      });
    }
    if (!user.authenticate(password)) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        message: "Invalid password",
      });
    }
    const token = generateAccessToken({ _id: user._id });
    const refreshToken = generateRefreshToken({ _id: user._id });
    res.status(httpStatus.OK).json({
      _id: user._id,
      token,
      refreshToken,
    });
  }
}

module.exports = UserController;

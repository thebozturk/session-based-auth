const httpStatus = require("http-status");

const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(httpStatus.UNAUTHORIZED).json({
      message: "Token is missing",
    });
  }
  next();
};

module.exports = verifyToken;

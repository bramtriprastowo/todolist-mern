const jwt = require("jsonwebtoken");

const generateAccessToken = (payload) => {
  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_CODE, {
    expiresIn: "900s",
  });
  return accessToken;
};

const generateRefreshToken = (payload) => {
  const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_CODE, {
    expiresIn: "24h",
  });
  return refreshToken;
};

module.exports = {generateAccessToken, generateRefreshToken}
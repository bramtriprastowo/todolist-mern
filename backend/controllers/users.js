const Users = require("../models/users");
const bcrypt = require("bcryptjs");
const { response, responseError500 } = require("../helper/response");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../helper/authentication");

const usersController = {
  getAllUsers: async (req, res) => {
    try {
      const result = await Users.find();
      return response(res, 200, "Success", "Get data success", result);
    } catch (error) {
      return responseError500(error);
    }
  },
  register: async (req, res) => {
    try {
      const { name, phone, email, username, password } = req.body;
      const [userEmail] = await Users.find({ email });
      if (userEmail) {
        return response(res, 409, "Conflict", "Email is already registered!");
      }
      const [userUsername] = await Users.find({ username });
      if (userUsername) {
        return response(
          res,
          409,
          "Conflict",
          "Username is already registered!"
        );
      }
      const hashPassword = bcrypt.hashSync(password, 10);
      let result = await Users.create({
        name,
        phone,
        email,
        username,
        password: hashPassword,
      });
      result = result.toObject();
      delete result.password;
      return response(res, 201, "Success", "Insert data success", result);
    } catch (error) {
      if (error.name === "ValidationError")
        return response(
          res,
          400,
          "Bad request",
          "Failed to create data",
          error.message
        );
      return responseError500(res, error);
    }
  },
  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      const errorInput = [];
      if (!username) errorInput.push("Username is required");
      if (!password) errorInput.push("Password is required");
      if (errorInput.length > 0) {
        return response(res, 400, "Bad request", "Login failed", errorInput);
      }
      let [user] = await Users.find({ username }).select(
        "_id username email password"
      );
      if (!user) {
        return response(res, 404, "Not found", "User is not found", []);
      }
      const isValidPassword = bcrypt.compareSync(password, user.password);
      if (!isValidPassword) {
        return response(
          res,
          401,
          "Unauthorized",
          "Login failed",
          "Password is invalid"
        );
      }
      user = user.toObject();
      delete user.password;
      const payload = {
        id: user.id,
        email: user.email,
      };
      user.accessToken = generateAccessToken(payload);
      user.refreshToken = generateRefreshToken(payload);
      return response(res, 200, "OK", "Login success", user);
    } catch (error) {
      return responseError500(res, error);
    }
  },
};

module.exports = usersController;

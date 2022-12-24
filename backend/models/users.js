const mongoose = require("mongoose");
const { Schema } = mongoose;

const usersSchema = new Schema({
  name: {
    type: String,
    required: [true, "Field cannot be empty"],
  },
  phone: {
    type: Number,
    required: true,
    min: 100000,
  },
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Users = mongoose.model("users", usersSchema);
module.exports = Users;

const mongoose = require("mongoose");
const { Schema } = mongoose;

const todosSchema = new Schema({
  id_user: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: false,
  },
  category: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
});

const Todos = mongoose.model("todos", todosSchema);
module.exports = Todos;

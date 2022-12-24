const { response, responseError500 } = require("../helper/response");
const Todos = require("../models/todos");

const todosController = {
  getAllTodos: async (req, res) => {
    try {
      const { id } = req.query;
      if (!id) {
        return response(
          res,
          400,
          "Bad request",
          "Failed to get data",
          "id is required"
        );
      }
      const result = await Todos.find({ id_user: id });
      response(res, 200, "Success", "Get data success", result);
    } catch (error) {
      responseError500(res, error);
    }
  },
  insertTodo: async (req, res) => {
    try {
      const { id_user, title, category } = req.body || "";
      if (!id_user) {
        return response(
          res,
          400,
          "Bad request",
          "Failed to insert data",
          "id_user is required"
        );
      }
      if (!category) {
        return response(
          res,
          400,
          "Bad request",
          "Failed to insert data",
          "category is required"
        );
      }
      const result = await Todos.create({ id_user, title, category });
      response(res, 201, "Success", "Insert data success", result);
    } catch (error) {
      responseError500(res, error);
    }
  },
  updateTodo: async (req, res) => {
    try {
      const { id, title, category, status } = req.body || "";
      if (!category) {
        return response(
          res,
          400,
          "Bad request",
          "Failed to update data",
          "category is required"
        );
      }
      const result = await Todos.updateOne(
        { _id: id },
        { $set: { title, category, status } }
      );
      return response(res, 200, "Success", "Update data success", result);
    } catch (error) {
      responseError500(res, error);
    }
  },
  deleteTodo: async (req, res) => {
    try {
      const { id } = req.params;
      const [todo] = await Todos.find({ _id: id });
      if (!todo) {
        return response(res, 404, "Not found", "Todo not found", []);
      }
      await Todos.deleteOne({ _id: id });
      return response(res, 200, "Success", "Delete todo success", []);
    } catch (error) {
      responseError500(res, error);
    }
  },
};

module.exports = todosController;

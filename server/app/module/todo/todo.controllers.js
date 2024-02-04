const {
  addTodoService,
  updateTodoService,
  getTodosService,
  deleteTodoService,
} = require("./todo.services");

module.exports = {
  addTodoController: async (req, res) => {
    try {
      const response = await addTodoService({
        ...req.body,
        userId: req.userId,
      });
      if (response.status === 500) {
        throw new Error(response.message);
      }

      res.send(response);
    } catch (controllerError) {
      console.log(
        "[DEBUG] Todo Controller at addTodoController Error :-",
        controllerError
      );
      res.status(400).send({ message: controllerError.message });
    }
  },

  deleteTodoController: async (req, res) => {
    try {
      const response = await deleteTodoService({
        ...req.params,
        userId: req.userId,
      });
      if (response.status === 500) {
        throw new Error(response.message);
      }

      res.send(response);
    } catch (controllerError) {
      console.log(
        "[DEBUG] Todo Controller at deleteTodoController Error :-",
        controllerError
      );
      res.status(400).send({ message: controllerError.message });
    }
  },

  updatedTodoController: async (req, res) => {
    try {
      const response = await updateTodoService({
        ...req.body,
        ...req.params,
        userId: req.userId,
      });
      if (response.status === 500) {
        throw new Error(response.message);
      }

      res.send(response);
    } catch (controllerError) {
      console.log(
        "[DEBUG] Todo Controller at updatedTodoController Error :-",
        controllerError.message
      );
      res.status(400).send({ message: controllerError.message });
    }
  },

  getTodosController: async (req, res) => {
    try {
      const response = await getTodosService({
        ...req.query,
        userId: req.userId,
      });
      if (response.status === 500) {
        throw new Error(response.message);
      }

      res.send(response);
    } catch (controllerError) {
      console.log(
        "[DEBUG] Todo Controller at getTodosController Error :-",
        controllerError
      );
      res.status(400).send({ message: controllerError.message });
    }
  },
};

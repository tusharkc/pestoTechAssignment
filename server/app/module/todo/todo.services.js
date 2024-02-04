const TodoModel = require("../../model//todo.model")(require("../../db"));

module.exports = {
  addTodoService: async (serviceInputParams) => {
    try {
      const { title, userId } = serviceInputParams;

      if (!title) {
        return { status: 400, message: "title is required" };
      } else {
        const newTodo = await TodoModel.create({
          userId: userId,
          title: title,
        });

        return { status: 201, data: newTodo };
      }
    } catch (serviceError) {
      console.log(
        "[DEBUG] Todo Service at addTodoService Error :-",
        serviceError
      );
      return { status: 500, message: "An error occurred" };
    }
  },
  deleteTodoService: async (serviceInputParams) => {
    try {
      const { id, userId } = serviceInputParams;

      await TodoModel.destroy({ where: { id, userId } });

      return { status: 200, message: "Todo Deleted" };
    } catch (serviceError) {
      console.log(
        "[DEBUG] Todo Service at deleteTodoService Error :-",
        serviceError
      );
      return { status: 500, message: "An error occurred" };
    }
  },

  updateTodoService: async (serviceInputParams) => {
    try {
      const { title, status, id, userId } = serviceInputParams;

      const existingTodo = await TodoModel.findOne({ where: { id, userId } });

      if (!existingTodo) {
        return { status: 404, message: "Todo not found" };
      }

      const updatedTodo = await TodoModel.update(
        {
          title: title || existingTodo?.title,
          status: status || existingTodo?.status || "Pending",
        },
        { where: { id: id, userId } }
      );

      return { status: 200, data: updatedTodo };
    } catch (serviceError) {
      console.log(
        "[DEBUG] Todo Service at updateTodoService Error :-",
        serviceError
      );
      return { status: 500, message: "An error occurred" };
    }
  },

  getTodosService: async (serviceInputParams) => {
    try {
      const { userId, selectedFilter } = serviceInputParams;
      console.log("selectedFilter", selectedFilter);

      let whereClause = { userId };

      switch (selectedFilter.toLowerCase()) {
        case "pending":
          whereClause.status = "Pending";
          break;
        case "completed":
          whereClause.status = "Completed";
          break;
        default:
          break;
      }

      const todoData = await TodoModel.findAll({
        where: whereClause,
      });

      return {
        status: 200,
        data: todoData,
      };
    } catch (serviceError) {
      console.log(
        "[DEBUG] Todo Service at getTodosService Error :-",
        serviceError
      );
      return { status: 500, message: "An error occurred" };
    }
  },
};

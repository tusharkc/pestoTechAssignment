const Sequelize = require("sequelize");
const sequelize = require("../db");
const { v4: uuidv4 } = require("uuid");

module.exports = () => {
  const Todo = sequelize.define("Todo", {
    userId: {
      type: Sequelize.UUID,
      allowNull: false,
    },

    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: () => uuidv4(),
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "Pending",
    },
  });

  Todo.associate = (model) => {
    Todo.belongTo(model.User, {
      foreignKey: "userId",
      as: "user",
    });
  };

  return Todo;
};

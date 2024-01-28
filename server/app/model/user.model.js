const Sequelize = require("sequelize");
const sequelize = require("../index");

const User = sequelize.define("User", {
  userId: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = User;

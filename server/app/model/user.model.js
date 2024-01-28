const Sequelize = require("sequelize");
const sequelize = require("../index");

const User = sequelize.define("User", {});

module.exports = User;

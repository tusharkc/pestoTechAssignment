require("dotenv-extended").load({
  path: "./app/.env.development",
});
const express = require("express");
const Sequelize = require("sequelize");
const config = require("./config/config");
const registerRoutes = require("./registerRoutes");
const app = express();
const sequelize = new Sequelize(config.database);

async function startServer() {
  try {
    console.log("[DEBUG] Establishing DB connection");
    await sequelize.authenticate();
    console.log("[DEBUG] Established DB connection");

    // Synchronize models
    await sequelize.sync();

    // Register routes
    registerRoutes(app);

    app.listen(config.port, () => {
      console.log(`Server listening on port ${config.port}`);
    });
  } catch (error) {
    console.error("error:", error);
    process.exit(1);
  }
}

startServer();

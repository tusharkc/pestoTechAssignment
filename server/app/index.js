const pg = require("pg");

async function startServer() {
  try {
    console.log("[DEBUG] Establishing DB connection");

    // Create database if it doesn't exist
    const dbName = config.database.database;
    const client = new pg.Client({
      user: config.database.username,
      password: config.database.password,
      host: config.database.host,
    });
    await client.connect();
    await client.query(`CREATE DATABASE IF NOT EXISTS ${dbName};`);
    await client.end();

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

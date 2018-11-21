module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    dialect: "mysql",
    seederStorage: "sequelize",
  },
  production: {
    username: "root",
    password: "toor",
    database: "orange",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};

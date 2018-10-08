module.exports = {
  development: {
    username: "root",
    password: "root",
    database: "tasks",
    dialect: "mysql",
    seederStorage: "sequelize",

    // username: process.env.DB_USERNAME,
    // password: process.env.DB_PASSWORD,
    // database: process.env.DB_DEVELOPMENT,
    // dialect: 'mysql',
    // seederStorage: 'sequelize'
  },
};

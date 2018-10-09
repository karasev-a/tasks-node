module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    dialect: "mysql",
    seederStorage: "sequelize",

    // username: process.env.DB_USERNAME,
    // password: process.env.DB_PASSWORD,
    // database: process.env.DB_DEVELOPMENT,
    // dialect: 'mysql',
    // seederStorage: 'sequelize'
  },
};

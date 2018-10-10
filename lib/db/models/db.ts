import * as Sequelize from "sequelize";
import * as dotenv from "dotenv";

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({ path: ".env" });

export default new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: "127.0.0.1",
    dialect: "mysql",
    // operatorsAliases: {
    //   $and: Sequelize.Op.and,
    //   $or: Sequelize.Op.or,
    //   $eq: Sequelize.Op.eq,
    //   $gt: Sequelize.Op.gt,
    //   $lt: Sequelize.Op.lt,
    //   $lte: Sequelize.Op.lte,
    //   $like: Sequelize.Op.like,
    // },
    operatorsAliases: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
});

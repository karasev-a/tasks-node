import Sequelize from "sequelize";
import db from "../../db/models/db";
import { Task } from "../task/task";

export interface ICategory extends Sequelize.Model<ICategory> {
  id?: string;
  name?: string;
  taskId?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

console.log("def category");

export const Category = db.define("Category", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [3, 255],
    },
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE,
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE,
  },
}, {});
Category.associate = () => {
   Category.hasMany(Task, { foreignKey: "categoryId", sourceKey: "id" });
  // Category.belongsToMany(models.User, { through: "UsersCategories", foreignKey: "categoryId" });
};

// Category.hasMany(Task, { foreignKey: "taskId", targetKey: "id" });

import Sequelize from "sequelize";
import db from "../../db/models/db";
import { Category } from "../category/category";

export interface ITask extends Sequelize.Model<ITask> {
  id?: string;
  title?: string;
  people?: number;
  price?: number;
  description?: string;
  date?: Date;
  subscrebedPeople?: number;
  status?: string;
  userId: number;
  categotyId: number;
  archived?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

console.log("def task");

export const Task = db.define("Task", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [3, 255],
    },
  },
  people: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1, max: 5,
    },
  },
  price: {
    type: Sequelize.FLOAT,
  },
  description: {
    type: Sequelize.TEXT,
  },
  date: {
    type: Sequelize.DATE,
  },
  status: {
    type: Sequelize.ENUM,
    values: ["OnReview", "Open", "Pending", "Done", "Decline"],
    defaultValue: "OnReview",
  },
  subscrebedPeople: {
    type: Sequelize.INTEGER,
  },
  // userId: {
  //   type: Sequelize.INTEGER,
  //   allowNull: false,
  // },
  categoryId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Category,
      key: "id",
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
Task.associate = () => {
  // Task.belongsTo(Category);
  Task.belongsTo(Category, { foreignKey: "categoryId", targetKey: "id" });
  // Task.belongsToMany(models.User, { through: "UsersTasks", foreignKey: "taskId" });
};

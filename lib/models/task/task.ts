import Sequelize from "sequelize";
import db from "../../db/models/db";

export interface ITask extends Sequelize.Model<ITask> {
  id?: string;
  title?: string;
  people?: number;
  price?: number;
  description?: string;
  date?: Date;
  subscrebedPeople?: number;
  status?: string;
  archived?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

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
  },
  subscrebedPeople: {
    type: Sequelize.INTEGER,
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
Task.associate = (models) => {
  // associations can be defined here
};

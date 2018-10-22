import * as Sequelize from "sequelize";
import db from "../../db/models/db";
import { Category } from "../category/category";
import { User } from "../user/user";
import { number } from "joi";

export interface ITaskAttributes {
  id?: string;
  title?: string;
  people?: number;
  price?: number;
  description?: string;
  date?: Date;
  status?: string;
  userId?: number;
  categoryId?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ITaskInstance extends Sequelize.Instance<ITaskAttributes> {
  dataValues: ITaskAttributes;
}

export enum Statuses {
  OnReview = 1,
  Open = 2,
  Pending = 3,
  Done = 4,
  Decline = 5,
}

export const Task = db.define<ITaskInstance, ITaskAttributes>("Task", {
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
    validate: {
      isDate: true,
      equalOrMoreToday(date) {
        const curDate = new Date();
        if (date < curDate ) {
          throw new Error("date must be current date or more");
        }
      },
    },
  },
  status: {
    type: Sequelize.INTEGER,
    defaultValue: Statuses.OnReview,
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },
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
  subscribedPeople: {
    type: Sequelize.INTEGER,
  },
}, {});
Task.associate = () => {
  Task.belongsTo(Category, { foreignKey: "categoryId", targetKey: "id" });
  Task.belongsTo(User, { foreignKey: "userId", targetKey: "id" });
  Task.belongsToMany(User, { through: "UsersTasks", foreignKey: "taskId" });
};

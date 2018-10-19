import * as Sequelize from "sequelize";
import db from "../../db/models/db";
import { Category } from "../category/category";
import { User } from "../user/user";

export interface ITaskAttributes {
  id?: string;
  title?: string;
  people?: number;
  price?: number;
  description?: string;
  date?: Date;
  subscrebedPeople?: number;
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
  // id: {
  //   allowNull: false,
  //   autoIncrement: true,
  //   primaryKey: true,
  //   type: Sequelize.INTEGER,
  // },
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
    // values: ["OnReview", "Open", "Pending", "Done", "Decline"],
    defaultValue: Statuses.OnReview,
  },
  subscrebedPeople: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0,
      lesOrEquelPeople(subscrebedPeople) {
        if (parseInt(this.people, 10) < parseInt(subscrebedPeople, 10)) {
          throw new Error("subscribed poeple must be less then needed people");
        }
      },
    },
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
}, {});
Task.associate = () => {
  // Task.belongsTo(Category);
  Task.belongsTo(Category, { foreignKey: "categoryId", targetKey: "id" });
  Task.belongsTo(User, { foreignKey: "userId", targetKey: "id" });
  // Task.belongsToMany(models.User, { through: "UsersTasks", foreignKey: "taskId" });
};

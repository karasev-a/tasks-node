
import * as Sequelize from "sequelize";
import db from "../../db/models/db";
import { User } from "../user/user";
import { Task } from "../task/task";

export interface ITasksCategoriesAttributes {
  id?: string;
  userId?: number;
  taskId?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ITasksCategoriesInstance extends Sequelize.Instance<ITasksCategoriesAttributes> {
  dataValues: ITasksCategoriesAttributes;
}

export const UsersTasks = db.define<ITasksCategoriesInstance, ITasksCategoriesAttributes>("UsersTasks", {
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },
  taskId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Task,
      key: "id",
    },
  },
}, {});
UsersTasks.associate = () => {
  UsersTasks.belongsTo(User, {foreignKey: "userId" });
  UsersTasks.belongsTo(Task, { foreignKey: "taskId" });
};

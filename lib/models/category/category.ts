import * as Sequelize from "sequelize";
import db from "../../db/models/db";
import { Task } from "../task/task";
import {User} from "../user/user";
import {UsersCategories} from "../users-categories/usersCategories";

export interface ICategoryAttributes {
  id?: string;
  name?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface ICategoryInstance extends Sequelize.Instance<ICategoryAttributes> {
  dataValues: ICategoryAttributes;
}

export const Category = db.define<ICategoryInstance, ICategoryAttributes>("Category", {
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
   Category.belongsToMany(User, { through: "UsersCategories", foreignKey: "categoryId" });
};


import * as Sequelize from "sequelize";
import db from "../../db/models/db";
import { User } from "../user/user";
import { Category } from "../category/category";

export interface IUsersCategoriesAttributes {
  id?: string;
  userId?: number;
  categoryId?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUsersCategoriesInstance extends Sequelize.Instance<IUsersCategoriesAttributes> {
  dataValues: IUsersCategoriesAttributes;
}

export const UsersCategories = db.define<IUsersCategoriesInstance, IUsersCategoriesAttributes>("UsersCategories", {
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
}, {});

// UsersCategories.belongsTo(User, { foreignKey: "userId" });
// UsersCategories.belongsTo(Category, { foreignKey: "categoryId" });
User.hasMany(UsersCategories, { foreignKey: "userId", sourceKey: "id" });
Category.hasMany(UsersCategories, { foreignKey: "categoryId", sourceKey: "id" });

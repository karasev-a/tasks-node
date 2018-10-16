import * as Sequelize from "sequelize";
import db from "../../db/models/db";
import { Task } from "../task/task";
import { Role } from "../role/role";
import { Category } from "../category/category";
import { UsersCategories } from "../users-categories/usersCategories";
import * as bcrypt from "bcrypt";

export interface IUserAttributes {
  id?: number;
  firstName?: string;
  lastName?: string;
  password?: string;
  phone?: string;
  email?: string;
  roleId?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserInstance extends Sequelize.Instance<IUserAttributes> {
  dataValues: IUserAttributes;
}

export const User = db.define<IUserInstance, IUserAttributes>("user", {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      is: ["^[a-z]+$", "i"],
    },
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      is: ["^[a-z]+$", "i"],
    },
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      is: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/,
    },
  },
  roleId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Role,
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
},
);

User.associate = (models) => {
  User.hasMany(Task, { foreignKey: "userId", sourceKey: "id" });
  User.belongsTo(Role, { foreignKey: "roleId", targetKey: "id" });
  User.belongsToMany(Category, { through: "UsersCategories", foreignKey: "userId" });
};

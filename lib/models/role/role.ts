import * as Sequelize from "sequelize";
import db from "../../db/models/db";
import {User} from "../user/user";

export interface IRoleAttributes {
  id?: string;
  name?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IRoleInstance extends Sequelize.Instance<IRoleAttributes> {
  dataValues: IRoleAttributes;
}

export const Role = db.define<IRoleInstance, IRoleAttributes>("Role", {
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
Role.associate = () => {
  // Role.hasMany(User, { foreignKey: "roleId", sourceKey: "id" });
};

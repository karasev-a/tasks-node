import * as Sequelize from "sequelize";
import db from "../../db/models/db";

const Role = db.define("Role", {
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
Role.associate = (models) => {
  // associations can be defined here
};

export default Role;

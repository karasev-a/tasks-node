import Sequelize from "sequelize";
import db from "../../db/models/db";

export const User = db.define("User", {
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
  // associations can be defined here
};

// export default User;

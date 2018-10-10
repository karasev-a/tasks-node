'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('UsersCategories', [{
      userId: 3,
      categoryId: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userId: 3,
      categoryId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userId: 3,
      categoryId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],

    {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('UsersCategories', null, {});
  }
};

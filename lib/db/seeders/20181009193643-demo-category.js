'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Categories', [{
      name: "Sport",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Info",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Politics",
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ],
    {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Categories', null, {});
  }
};

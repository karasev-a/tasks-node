'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Tasks', [{
      title: "Tasks 1",
      people: 3,
      price: 500,
      description: "description 1",
      date: new Date(),
      // subscrebedPeople: number,
      // status: string,
      userId: 3,
      categoryId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: "Tasks 2",
      people: 3,
      price: 1000,
      description: "description 2",
      date: new Date(),
      // subscrebedPeople: number,
      // status: string,
      userId: 3,
      categoryId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: "Tasks 3",
      people: 3,
      price: 1500,
      description: "description 3",
      date: new Date(),
      // subscrebedPeople: number,
      // status: string,
      userId: 3,
      categoryId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    
    ],
      {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Tasks', null, {});
  }
};
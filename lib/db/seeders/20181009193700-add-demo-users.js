'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      firstName: 'John',
      lastName: 'Doe',
      password: 'were',
      // phone: '453',
      email: 'my@mail.com',
      roleId: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      firstName: 'Bill',
      lastName: 'Smit',
      password: 'here',
     // phone: '453',
      email: 'own@mail.com',
      roleId: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      firstName: 'Kate',
      lastName: 'Wait',
      password: 'here',
     // phone: '453',
      email: 'own@mail.com',
      roleId: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ],
      [],
      {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};

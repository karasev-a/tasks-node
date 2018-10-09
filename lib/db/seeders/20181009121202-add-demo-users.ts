'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      firstName: 'John',
      lastName: 'Doe',
      password: 'were',
      phone: '453',
      email: 'my@mail.com',
      createdAt: new Date(),
      updatedAt: new Date(),

    }],
      [{
        firstName: 'Bill',
        lastName: 'Smit',
        password: 'here',
        phone: '453',
        email: 'own@mail.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      }],
      {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};

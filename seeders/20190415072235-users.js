'use strict'
const faker = require('faker')

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    const users = []

    for (let i = 0; i < 100; i++) {
      const user = {
        email: faker.internet.email(),
        userName: faker.internet.userName(),
        password: faker.internet.password(),
        createdAt: faker.date.recent(),
        updatedAt: faker.date.recent(),
      }

      users.push(user)
    }

    return queryInterface.bulkInsert('Users', users)
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Users', null, {})
  },
}

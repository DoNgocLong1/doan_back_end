'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      email: 'admin@gmail.com',
      password: '123123',
      firstName: 'John',
      lastName: 'Doe',
      address: "Vietnam",
      phonenumber: "3064148933",
      gender: 1,
      image: "https://i.pinimg.com/originals/19/d4/26/19d426a4ec158169e12675f014f51f5d.png",
      roleId: 'R1',
      positionId: 'jfjryj',
      createdAt: new Date(),
      updatedAt: new Date(),
    }])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};

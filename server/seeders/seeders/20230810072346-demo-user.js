"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "User",
      [
        {
          email: "JohnDoe@gmail.com",
          password: "adasdasd",
          username: "ngudot12",
        },
        {
          email: "JohnDoe123@gmail.com",
          password: "adasdasd123",
          username: "ngudot122",
        },
        {
          email: "JohnDoe32@gmail.com",
          password: "adasdasdq455",
          username: "ngudot123",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};

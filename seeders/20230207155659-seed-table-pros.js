'use strict';
const { v4 } = require("uuid")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const dataPros = require("../data/pros.json");

    dataPros.map((e) => {
      e.uuid = v4()
      e.createdAt = e.updatedAt = new Date();
    });

    await queryInterface.bulkInsert("Pros", dataPros, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Pros", null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  }
};

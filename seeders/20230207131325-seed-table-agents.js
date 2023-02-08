"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const dataAgents = require("../data/agents.json");
    dataAgents.map((e) => {
      e.createdAt = e.updatedAt = new Date();
    });

    await queryInterface.bulkInsert("Agents", dataAgents, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Agents", null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  },
};

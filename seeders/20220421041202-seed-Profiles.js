'use strict';

const fs = require('fs');

module.exports = {
  up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const dataProfiles = JSON.parse(fs.readFileSync('./data/profile.json'));
    // console.log(dataProfiles);
    dataProfiles.forEach(element => {
      element.createdAt = new Date();
      element.updatedAt = new Date();
    });

    return queryInterface.bulkInsert('Profiles', dataProfiles, {})
  },

  down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Profiles', null, {})
  }
};
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
    const dataProducts = JSON.parse(fs.readFileSync('./data/product.json'));
    // console.log(dataProducts);
    dataProducts.forEach(element => {
      element.createdAt = new Date();
      element.updatedAt = new Date();
    });

    return queryInterface.bulkInsert('Products', dataProducts, {})
  },

  down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Products', null, {})
  }
};
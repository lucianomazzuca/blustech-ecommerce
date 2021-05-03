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

    await queryInterface.bulkInsert("brands", [
      {
        name: "AMD",
        created_at: '2021-05-2 18:36:44.433739-03',
        updated_at: '2021-05-2 18:36:44.433739-03',
      },
      {
        name: "Nvidia",
        created_at: '2021-05-2 18:36:44.433739-03',
        updated_at: '2021-05-2 18:36:44.433739-03',
      }
    ]);

    await queryInterface.bulkInsert("categories", [
      {
        name: "Procesor",
        created_at: '2021-05-2 18:36:44.433739-03',
        updated_at: '2021-05-2 18:36:44.433739-03',
      },
      {
        name: "Graphics Card",
        created_at: '2021-05-2 18:36:44.433739-03',
        updated_at: '2021-05-2 18:36:44.433739-03',
      }
    ]);

    await queryInterface.bulkInsert("products", [
      {
        model: "Ryzen 7",
        price: 100,
        discount: 0,
        image: null,
        description: 'lorem ipsum',
        category_id: null,
        brand_id: null,
        created_at: '2021-05-2 18:36:44.433739-03',
        updated_at: '2021-05-2 18:36:44.433739-03',
      },
      {
        model: "RTX 3080",
        price: 100,
        discount: 0,
        image: null,
        description: 'lorem ipsum',
        category_id: null,
        brand_id: null,
        created_at: '2021-05-2 18:36:44.433739-03',
        updated_at: '2021-05-2 18:36:44.433739-03',
      },
    ]);

    await queryInterface.bulkInsert("users", [
      {
        name: "admin",
        email: 'admin@gmail.com',
        password: '$2b$10$tYNNaCC3oT4268p7YPXQmOccSfqpe.TDYZM5eBcH7/bSsvYxnVVWC',
        isAdmin: true,
        created_at: '2021-05-2 18:36:44.433739-03',
        updated_at: '2021-05-2 18:36:44.433739-03',
      }
    ]);

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('products', null, {});
    await queryInterface.bulkDelete('brands', null, {});
    await queryInterface.bulkDelete('categories', null, {});
  },
};

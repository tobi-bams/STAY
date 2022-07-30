"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("withdraws", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      walletId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "wallets",
          key: "id",
        },
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      payoutId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      reference: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("withdraws");
  },
};

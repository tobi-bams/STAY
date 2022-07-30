"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class deposit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      deposit.belongsTo(models.wallet);
    }
  }
  deposit.init(
    {
      walletId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "pending",
      },
      reference: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      coin: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rate: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "deposit",
    }
  );
  return deposit;
};

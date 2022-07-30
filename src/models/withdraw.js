"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class withdraw extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      withdraw.belongsTo(models.wallet);
    }
  }
  withdraw.init(
    {
      walletId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      payoutId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      reference: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "withdraw",
    }
  );
  return withdraw;
};

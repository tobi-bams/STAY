"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class wallet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      wallet.belongsTo(models.user);
      wallet.hasMany(models.deposit);
      wallet.hasMany(models.withdraw);
    }
  }
  wallet.init(
    {
      balance: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      pin: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1234,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "wallet",
    }
  );
  return wallet;
};

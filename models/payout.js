"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class payout extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      payout.belongsTo(models.user);
    }
  }
  payout.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      accountName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      accountNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bankName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bankCode: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      reference: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      saved: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "payout",
    }
  );
  return payout;
};

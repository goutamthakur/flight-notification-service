"use strict";

const { Model } = require("sequelize");

const { Enums } = require("../utils/common");
const { SUCCESS, FAILED, PENDING } = Enums.EMAIL_STATUS;

module.exports = (sequelize, DataTypes) => {
  class EmailNotification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  EmailNotification.init(
    {
      recipientEmail: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      subject: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM,
        values: [SUCCESS, FAILED, PENDING],
        defaultValue: PENDING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "EmailNotification",
      tableName: "email_notifications",
    }
  );
  return EmailNotification;
};

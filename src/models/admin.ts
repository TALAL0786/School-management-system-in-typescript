"use strict";

import { Model, InferAttributes, InferCreationAttributes } from "sequelize";

module.exports = (sequelize, DataTypes) => {
  class Admin extends Model<
    InferAttributes<Admin>,
    InferCreationAttributes<Admin>
  > {
    Aid: number;
    Admname: string;
    email: string;
    password: string;
    confirmpassword: string;
    image: string;
    createdAt: Date;
    updatedAt: Date;
    static associate() {
      // Define association here
    }
  }
  Admin.init(
    {
      Aid: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      Admname: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
      },
      confirmpassword: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          // This only works on CREATE and SAVE!!!
          validator: function (el) {
            return el === this.password;
          },
        },
      },
      image: {
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "Admin",
    }
  );
  return Admin;
};

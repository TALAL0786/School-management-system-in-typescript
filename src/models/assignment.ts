"use strict";

import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  ModelStatic,
} from "sequelize";

module.exports = (sequelize, DataTypes) => {
  class Assignment extends Model<
    InferAttributes<Assignment>,
    InferCreationAttributes<Assignment>
  > {
    Asid: number;
    title: string;
    description: string;
    uploadlink: string;
    createdAt: Date;
    updatedAt: Date;
    static associate(models) {
      // Define association here
      //one to many with teacher
      Assignment.belongsTo(models.Teacher, {
        foreignKey: { name: "Tid", allowNull: false },
        as: "assignments",
      });
      //many to many with students
      Assignment.belongsToMany(models.Student, {
        through: "studentassignment",
        foreignKey: {
          name: "Asid",
          allowNull: false,
        },
        as: "students",
      });
    }
  }
  Assignment.init(
    {
      Asid: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      title: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.TEXT,
      },
      uploadlink: {
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
      modelName: "Assignment",
    }
  );
  return Assignment;
};

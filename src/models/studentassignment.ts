"use strict";
module.exports = (sequelize, DataTypes) => {
  const studentassignment = sequelize.define(
    "studentassignment",
    {
      Asid: {
        type: DataTypes.INTEGER,
      },
      Sid: {
        type: DataTypes.INTEGER,
      },
    },
    {
      paranoid: true,
    }
  );

  return studentassignment;
};

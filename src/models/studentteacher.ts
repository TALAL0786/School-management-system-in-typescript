'use strict';
module.exports = (sequelize, DataTypes) => {
  const studentteacher = sequelize.define('studentteacher', {
    Tid: {
      type: DataTypes.INTEGER,
    },
    Sid: {
      type: DataTypes.INTEGER,
    }
  }, {
    paranoid: true
  });

  return studentteacher;
};

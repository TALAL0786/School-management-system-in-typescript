'use strict';
module.exports = (sequelize, DataTypes) => {
    const studentteacher = sequelize.define('studentteacher', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        Tid: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Teacher',
                key: 'id',
                as: 'teacher'
            }
        },
        Sid: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Student',
                key: 'id',
                as: 'student'
            }
        }
    }, {
        paranoid: true
    });
    return studentteacher;
};
//# sourceMappingURL=studentteacher.js.map
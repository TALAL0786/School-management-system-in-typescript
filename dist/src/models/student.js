'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Student extends sequelize_1.Model {
        static associate(models) {
            // Define association here
            Student.belongsToMany(models.Teacher, {
                through: "studentteacher",
                foreignKey: 'Sid',
                as: 'student'
            });
        }
    }
    Student.init({
        Sid: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        stname: {
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
    }, {
        sequelize,
        modelName: 'Student',
    });
    return Student;
};
//# sourceMappingURL=student.js.map
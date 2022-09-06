'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Teacher extends sequelize_1.Model {
        static associate(models) {
            // Define association here
            Teacher.belongsToMany(models.Student, {
                through: "studentteacher",
                foreignKey: 'Tid',
                as: 'teacher'
            });
        }
    }
    Teacher.init({
        Tid: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        tname: {
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
        modelName: 'Teacher',
    });
    return Teacher;
};
//# sourceMappingURL=teacher.js.map
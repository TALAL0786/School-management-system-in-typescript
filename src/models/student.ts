'use strict';
 
import {Model, InferAttributes, InferCreationAttributes, ModelStatic} from 'sequelize';
 
module.exports = (sequelize, DataTypes) => {
    class Student extends Model<InferAttributes<Student>, InferCreationAttributes<Student>> {
        Sid: number;
        stname: string;
        createdAt: Date;
        updatedAt: Date;
        static associate(models) {
            // Define association here
            //many to many with teacher
            Student.belongsToMany(models.Teacher, {
                through: "studentteacher",
                foreignKey: 'Sid',
                as: 'teachers'
            });
            //many to many with assignments
            Student.belongsToMany(models.Assignment, {
                through: "studentassignment",
                foreignKey: 'Sid',
                as: 'assignments'
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
    }, 
      {
        sequelize,
        modelName: 'Student',
    });
    return Student;
};


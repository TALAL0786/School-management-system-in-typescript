'use strict';
 
import {Model, InferAttributes, InferCreationAttributes, ModelStatic} from 'sequelize';
 
module.exports = (sequelize, DataTypes) => {
    class Student extends Model<InferAttributes<Student>, InferCreationAttributes<Student>> {
        Sid: number;
        stname: string;
        createdAt: Date;
        updatedAt: Date;
        static associate(models: { Teacher: ModelStatic<Model<any, any>>; }) {
            // Define association here
            Student.belongsToMany(models.Teacher, {
                through: "studentteacher",
                foreignKey: 'Sid',
                as: 'teachers'
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


'use strict';
 
import {Model, InferAttributes, InferCreationAttributes, ModelStatic} from 'sequelize';
 
module.exports = (sequelize, DataTypes) => {
    class Student extends Model<InferAttributes<Student>, InferCreationAttributes<Student>> {
        Sid: number;
        stname: string;
        stemail: string;
        fav_color:string;
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
        fav_color: {
            type: DataTypes.ENUM({
                values: ['red', 'yellow', 'green'],
                default: 'red',
              }),
              validate: {
                isIn: {
                  args: [['red', 'yellow', 'green']],
                    msg: "Must be yellow red or green"
                }
              }
              
          },
        stname: {
            type: DataTypes.STRING,
        },
        stemail: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
              isEmail: {
                msg: "Must be a valid email address",
              }
            }
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


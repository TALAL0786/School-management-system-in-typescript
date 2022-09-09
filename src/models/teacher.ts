'use strict';
 
import {Model, InferAttributes, InferCreationAttributes, ModelStatic} from 'sequelize';
 
module.exports = (sequelize, DataTypes) => {
    class Teacher extends Model<InferAttributes<Teacher>, InferCreationAttributes<Teacher>> {
        Tid: number;
        tname: string;
        createdAt: Date;
        updatedAt: Date;
        static associate(models) {
            // Define association here
            //many to many association with students
            Teacher.belongsToMany(models.Student, {
                through: "studentteacher",
                foreignKey: {
                            name: 'Tid',
                            allowNull: false
                            },
                as: 'students'});
            //many to one association with assignments
               Teacher.hasMany(models.Assignment, {
                foreignKey: 'Tid',
                as: 'assignments'});

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
    }, 
    {
        sequelize,
        modelName: 'Teacher',
    }
    );
    return Teacher;
};

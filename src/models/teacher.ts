'use strict';
 
import {Model, InferAttributes, InferCreationAttributes, ModelStatic} from 'sequelize';
 
module.exports = (sequelize, DataTypes) => {
    class Teacher extends Model<InferAttributes<Teacher>, InferCreationAttributes<Teacher>> {
        Tid: number;
        tname: string;
        createdAt: Date;
        updatedAt: Date;
        static associate(models: { Student: ModelStatic<Model<any, any>>; }) {
            // Define association here
            Teacher.belongsToMany(models.Student, {
                through: "studentteacher",
                foreignKey: 'Tid',
                as: 'teacher'});
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

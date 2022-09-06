"use strict";
var fs = require("fs");
var dotenv = require('dotenv');
var path = require("path");
var Sequelize = require("sequelize");
var basename = path.basename(__filename);
//const config = require(__dirname + "/../config/config.json")[env];
dotenv.config({ path: './.env' });
var sequelize;
var db = { }as IDbConnection;;
if (process.env.NODE_ENV === "development") {
    console.log("development server");
    sequelize = new Sequelize(process.env.DATABASE, process.env.USERNAM, process.env.PASSWORD, {
        host: process.env.HOST,
        dialect: process.env.DIALECT
    });
}
else {
    console.log("provide env");
}
fs.readdirSync(__dirname)
    .filter(function (file) {
    return (file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js");
})
    .forEach(function (file) {
    // const model = sequelize['import'](path.join(__dirname, file));
    // I commented the above line and added below line, to meet new changes in Sequelize
    var model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
});
Object.keys(db).forEach(function (modelName) {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});
db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;

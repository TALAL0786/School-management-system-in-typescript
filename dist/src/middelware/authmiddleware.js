"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const model = require('../models');
const util_1 = require("util");
const jwt = require('jsonwebtoken');
//to protect routes
exports.protect = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // 1) Getting token and check of it's there
    let token;
    if (req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
        //to split the string and access 2nd word of string which is on index[1]
    }
    if (!token) {
        res.status(400).send({
            message: "you are not logged in or having no access to this token"
        });
        return;
    }
    // 2) Verification token
    const decoded = yield (0, util_1.promisify)(jwt.verify)(token, process.env.JWT_SECRET);
    // 3) Check if user still exists
    const currentAdmin = yield model.Admin.findOne(decoded.id);
    if (!currentAdmin) {
        res.status(400).send({
            message: "user belong to this token does not exist"
        });
        return;
    }
    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentAdmin;
    next();
});
exports.restrictTo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.headers.role !== "admin" || "Admin") {
        res.status(400).send({
            message: "YOU ARE NOT AN AOUTHORIZED USER TO PERFORM THIS ACTION"
        });
        return;
    }
    next();
});
//# sourceMappingURL=authmiddleware.js.map
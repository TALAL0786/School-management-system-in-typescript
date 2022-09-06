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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const model = require('../models');
const multer = require("multer");
const path = require("path");
const signToken = (id, role) => {
    return jsonwebtoken_1.default.sign({ id, role }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};
const createSendToken = (admin, statusCode, res) => {
    const role = "admin";
    const id = 1;
    const token = signToken(id, role);
    //Remove password from output
    admin.Admpassword = undefined;
    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            admin
        }
    });
};
exports.signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newAdmin = yield model.Admin.create({
            Aid: req.body.Aid,
            Admname: req.body.Admname,
            password: req.body.password,
            confirmpassword: req.body.confirmpassword,
            email: req.body.email,
            image: req.file.path //for multiple images -->files
        });
        createSendToken(newAdmin, 201, res);
    }
    catch (error) {
        return res.status(400).send(error);
    }
    ;
});
/////////////////////////////Login
exports.login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { Admname, password } = req.body;
    // 1) Check if name and password exist
    if (!Admname || !password) {
        res.status(400).send({
            message: "provide name and password please"
        });
        return;
    }
    // 2) Check if admin exists && password is correct
    const admin = yield model.Admin.findOne({ where: { Admname: Admname } });
    if (!admin || !(password === admin.password)) {
        res.status(400).send({
            message: "your password or name is incorrect -"
        });
        return;
    }
    //id and role instead admin whole object
    // 3) If everything ok, send token to client
    createSendToken(admin, 200, res);
});
///image upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Images');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
exports.upload = multer({
    storage: storage,
    // limits:  { fileSize: '1000000' },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/;
        const mimeType = fileTypes.test(file.mimetype);
        const extname = fileTypes.test(path.extname(file.originalname));
        if (mimeType && extname) {
            return cb(null, true);
        }
        // cb('Give proper files formate to upload')
    }
}).single('image');
//# sourceMappingURL=authcontroller.js.map
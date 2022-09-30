import jwt from "jsonwebtoken";
const model = require("../models");
import multer = require("multer");
import { create } from "../services/adminServices";
const catchAsync = require("../helpers/catchAsync");

const signToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (tokenidrole, statusCode: number, res: any) => {
  const token = signToken(tokenidrole.id, tokenidrole.role);
  //Remove password from output
  res.status(statusCode).json({
    status: "success",
    token,
    data: {},
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  let tokenidrole: any;
  const newAdmin: IAdminAttributes = await create({
    Aid: req.body.Aid,
    Admname: req.body.Admname,
    password: req.body.password,
    confirmpassword: req.body.confirmpassword,
    email: req.body.email,
    image: req.file.path, //for multiple images -->files
  });
  tokenidrole = {
    id: newAdmin.Aid,
    role: req.body.loginType,
  };
  createSendToken(tokenidrole, 201, res);
});

/////////////////////////////Login
exports.login = catchAsync(async (req, res, next) => {
  console.log(req.body);
  let tokenidrole: any;
  const { Admname, password } = req.body;
  // 1) Check if name and password exist
  if (!Admname || !password) {
    return next(new AppError("Please provide name and password!", 400));
  }
  // 2) Check if admin exists && password is correct
  const admin = await model.Admin.findOne({ where: { Admname: Admname } });
  if (!admin || !(password === admin.password)) {
    return next(new AppError("Incorrect name or password", 401));
  }
  console.log("hyyyyy");
  tokenidrole = {
    id: admin.Aid,
    role: req.body.loginType,
  };
  createSendToken(tokenidrole, 200, res);
});

///image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

exports.upload = multer({
  storage: storage,
  // limits:  { fileSize: '1000000' },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimeType = fileTypes.test(file.mimetype);
    if (mimeType) {
      return cb(null, true);
    }
    // cb('Give proper files formate to upload')
  },
}).single("image");

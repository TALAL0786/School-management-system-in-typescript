const model= require('../models');
import { promisify } from 'util';
const jwt = require('jsonwebtoken');
let decoded:any=" ";
//to protect routes
exports.protect = async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
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
  decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  console.log(decoded.role)
  // 3) Check if user still exists
  const currentAdmin = await model.Admin.findOne({ where: { Aid:decoded.id }});
  if (!currentAdmin) {
    res.status(400).send({
      message: "user belong to this token does not exist"
    });
    return;
  }
   req.user=currentAdmin
  next();
};

exports.restrictTo= async (req, res, next) => {
  if(decoded.role !== "admin")
  {
    return res.status(400).json({ message: "admin role is authorized only" });
  }
  console.log(decoded)
    next();
};
  
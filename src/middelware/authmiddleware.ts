const model= require('../models');
import { promisify } from 'util';
const jwt = require('jsonwebtoken');
const AppError = require('../helpers/appError');
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
  // 3) Check if user still exists
  const currentAdmin = await model.Admin.findOne({ where: { Aid:decoded.id }});
  if (!currentAdmin) {
    return next(
      new AppError(
        'The user belonging to this token does no longer exist.',
        401
      )
    );
  }
   req.user=decoded
  next();
};

exports.restrictTo= async (req, res, next) => {
  console.log(req.user.role)
  if(req.user.role !== "Admin")
  {
    return next(
      new AppError('You do not have permission to perform this action', 403)
    );
  }
  console.log(decoded)
    next();
};
  
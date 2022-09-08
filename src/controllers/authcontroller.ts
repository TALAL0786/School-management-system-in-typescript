import jwt from 'jsonwebtoken';
const model= require('../models');
import multer= require("multer")
import path= require("path")
import {create} from "../services/adminServices"

const signToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });
  };
  
  const createSendToken = (tokenidrole, statusCode: number, res: any) => {
    const token = signToken(tokenidrole.id,tokenidrole.role);
    //Remove password from output
    res.status(statusCode).json({
      status: 'success',
      token,
      data: {
      }
    })
  };

  exports.signup =async(req, res, next) => {
    let tokenidrole:any;
    console.log(req.body)
    try{const newAdmin: IAdminAttributes =await create({
      Aid: req.body.Aid,
      Admname: req.body.Admname,
      password: req.body.password,
      confirmpassword: req.body.confirmpassword,
      email:req.body.email,
      image: req.file.path //for multiple images -->files
    })
    tokenidrole = {
      id: newAdmin.Aid,
      role: req.body.loginType 
    }
    createSendToken(tokenidrole, 201, res);
  }
    catch(error){return res.status(400).send(error);};
  }

/////////////////////////////Login
exports.login = async (req, res, next) => {
  console.log(req.body)
  let tokenidrole:any;
  const { Admname, password } = req.body;
  // 1) Check if name and password exist
  if (!Admname || !password) {
    res.status(400).send({
      message: "provide name and password please"
    });
    return;
  }
  // 2) Check if admin exists && password is correct
   const admin = await model.Admin.findOne({ where: { Admname: Admname } });
  if (!admin || !(password===admin.password))
   {
    res.status(400).send({
      message: "your password or name is incorrect -"
    });
    return; 
  }

  tokenidrole = {
    id: admin.Aid,
    role: req.body.loginType 
  }
  createSendToken(tokenidrole, 200, res);
};

///image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'Images')
  },
  filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname))
  }
})

exports.upload = multer({
  storage: storage,
  // limits:  { fileSize: '1000000' },
  fileFilter: (req, file, cb) => {
      const fileTypes = /jpeg|jpg|png|gif/
      const mimeType = fileTypes.test(file.mimetype)  
      const extname = fileTypes.test(path.extname(file.originalname))

      if(mimeType && extname) {
          return cb(null, true)
      }
      // cb('Give proper files formate to upload')
  }
}).single('image')


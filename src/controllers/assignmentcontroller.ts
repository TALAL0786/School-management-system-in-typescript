import {create} from "../services/assignmentServices"
import multer= require("multer")
import path= require("path")
import fs from 'fs';
const catchAsync = require('../helpers/catchAsync');
const AppError = require('../helpers/appError');

exports.addassignment =catchAsync(async(req, res, next) => {
       try{fs.readFile(req.file.path,"utf8", async (error,buffer)=>
       {
  
          const newAssignment: IAssignmentAttributes =await create({
          Asid: req.body.Asid,
          Tid:req.body.Tid,
          title: req.body.Title,
          description: buffer,
          uploadlink: req.file.originalname
      })
      res.status(201).json({
        status: 'success',
        data: {student: newAssignment}
                          });
                        
      })}
      catch(error){return next(new AppError('please provide a file .txt', 401));}
    })


  //file upload
const storage = multer.diskStorage({
  
  destination: (req, file, cb) => {
    cb(null, 'txtfiles')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname)
  }
})

exports.upload = multer({
  storage: storage,
  limits:  { fileSize: 1000000 },
  fileFilter: (req, file, next) => {
      const fileTypes = /plain/
      const mimeType = fileTypes.test(file.mimetype)  
      console.log(mimeType)
      if(mimeType) {
          return next(null, true)
      }
     return next(new AppError('Give a proper file format', 401));
  }
}).single('myFile')

//to download file
exports.download = (req, res, next) => {
  console.log('fileController.download: started  '+req.body.path)
  const path = `txtfiles/${req.body.path}`
  const file = fs.createReadStream(path)
  const filename = (new Date()).toISOString()
  res.setHeader('Content-Disposition', 'attachment: filename="' + filename + '"')
  file.pipe(res)
}

import {create} from "../services/assignmentServices"
import multer= require("multer")
import path= require("path")
import fs from 'fs';

exports.addassignment =async(req, res, next) => {
  let file = fs.readFileSync(req.file.path,"utf-8");
    try{const newAssignment: IAssignmentAttributes =await create({
        Asid: req.body.Asid,
        Tid:req.body.Tid,
        title: req.body.Title,
        description: file,
        uploadlink: req.file.path
    })
    res.status(201).json({
        status: 'success',
        data: {
          student: newAssignment
        }
      });

  }
    catch(error){return res.status(400).send(error);};
  }



  //file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'txtfiles')
  },
  filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname))
  }
})

exports.upload = multer({
  storage: storage,
  // limits:  { fileSize: '1000000' },
  fileFilter: (req, file, cb) => {
      const fileTypes = /plain/
      const mimeType = fileTypes.test(file.mimetype)  
      const extname = fileTypes.test(path.extname(file.originalname))
    
      if(mimeType) {
          return cb(null, true)
      }
     throw new Error ('Give proper files formate to upload')
  }
}).single('myFile')




// exports.readfile =async(req, res, next) => {
// console.log(req.file.path)
// const file = fs.readFileSync(req.file.path, 'utf-8');
// next()

// }

exports.download = (req, res, next) => {
  console.log('fileController.download: started')
  const path = req.body.path
  const file = fs.createReadStream(path)
  const filename = (new Date()).toISOString()
  res.setHeader('Content-Disposition', 'attachment: filename="' + filename + '"')
  file.pipe(res)
}
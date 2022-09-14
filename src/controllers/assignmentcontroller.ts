import { create } from "../services/assignmentServices";
import multer = require("multer");
import path = require("path");
const { Op } = require("sequelize");
import fs from "fs";
const model = require("../models");
const cron = require("node-cron");
const catchAsync = require("../helpers/catchAsync");
const AppError = require("../helpers/appError");
import { findAssignment } from "../services/assignmentServices";
import { response } from "express";
const sendEmail = require("../helpers/sendemail");

exports.addassignment = catchAsync(async (req, res, next) => {
  try {
    fs.readFile(req.file.path, "utf8", async (error, buffer) => {
      const newAssignment: IAssignmentAttributes = await create({
        Asid: req.body.Asid,
        Tid: req.body.Tid,
        title: req.body.Title,
        description: buffer,
        uploadlink: req.file.originalname,
      });
      res.status(201).json({
        status: "success",
        data: { student: newAssignment },
      });
    });
  } catch (error) {
    return next(new AppError("please provide a file .txt", 401));
  }
});

//file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "txtfiles");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

exports.upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: (req, file, next) => {
    const fileTypes = /plain/;
    const mimeType = fileTypes.test(file.mimetype);
    if (mimeType) {
      return next(null, true);
    }
    return next(new AppError("Give a proper file format", 401));
  },
}).single("myFile");

//to download file
exports.download = (req, res, next) => {
  console.log("fileController.download: started  " + req.params.asname);
  const path = `txtfiles/${req.params.asname}`;
  const file = fs.createReadStream(path);
  const filename = new Date().toISOString();
  res.setHeader(
    "Content-Disposition",
    'attachment: filename="' + filename + '"'
  );
  file.pipe(res);
};

//upload assignment on schedule
exports.onscheduler = catchAsync(async (req, res, next) => {
  cron.schedule("* * * * * *", async function () {
    let { minid, maxid, Asid } = req.body;
    minid = +minid;
    maxid = +maxid;
    var st_inrange = [];
    const temp = await model.Student.findAll({
      attributes: ["Sid"],
      where: {
        Sid: {
          [Op.between]: [minid, maxid],
        },
      },
    });
    st_inrange = temp.map((temp) => {
      return temp.dataValues.Sid;
    });
    console.log(st_inrange); //map //promiseall //promise
    await findAssignment(Asid).then(async (assignment) => {
      if (!assignment) {
        console.log("not found");
      }
      await assignment.setStudents(st_inrange, {
        ignoreDuplicate: true,
      });
    });

    console.log("running a task every minute");
  });
  res.status(201).json({
    status: "success Job is set to perform after time",
  });
});

//response from nodemailer
exports.sendemail = async (req, res) => {
  var st_inrangemails = [];
  let { minid, maxid } = req.body;
  let path = req.file.path;
  const message = "your deadline is 2 oct";
  //to send attachment
  var attachments = [
    {
      filename: req.file.originalname,
      path: path,
    },
  ];
  //to send download link
  var html = `<p>Click <a href="http://localhost:3000/teacher/downloadassignment/${req.file.originalname}">here </a>to Download</p>`;
  const user = await model.Student.findAll({
    attributes: ["stemail"],
    where: {
      Sid: {
        [Op.between]: [minid, maxid],
      },
    },
  });
  st_inrangemails = user.map((user) => {
    return user.dataValues.stemail;
  });
  console.log(st_inrangemails);
  for (var i in st_inrangemails) {
    try {
      await sendEmail({
        email: st_inrangemails[i],
        subject: "Your new assignment uploaded",
        message,
        attachments,
        html,
      });
    } catch (err) {
      console.log(err);
    }
  }
  res.status(201).json({
    status: "success email is send",
  });
};

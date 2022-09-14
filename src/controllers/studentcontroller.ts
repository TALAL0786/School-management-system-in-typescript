const model2= require('../models');
import {create,update,findOne, destroy,showassignments} from "../services/studentServices"
const catchAsync = require('../helpers/catchAsync');
//add student
exports.createStudent = catchAsync(async (req, res, next) => {
    const newStudent: IStudentAttributes =  await create(req.body);
  
    res.status(201).json({
      status: 'success',
      data: {
        student: newStudent
      }
    });
  });


//update student
  exports.updateStudent = catchAsync(async (req, res, next) => {
    //is there is any student having this ID?
    const checkstudent=await findOne(req.params);
    if (!checkstudent) {
      res.status(400).send({
        message: "no student have this ID"
      });
      return;
    }
    //if there are student in db than update it
    await update(req);

    res.status(200).json({
      status: 'success',
      data: {
        student: `Student at ${req.params.id} updated successfully`
      }
    });
  });


//Delete student
exports.deleteStudent =catchAsync( async (req, res, next) => {
  const student_data: IStudentAttributes = await destroy(req.params.id);
  if (!student_data) 
  {  return next(new AppError('cant find student with this ID', 404));}
  else res.status(201).send("success" + req.params.id);
});

//all assignments
exports.studenthaveassigments =catchAsync( async (req, res, next) => {
    const data = await showassignments(req.params.id)
    if(!data){return next(new AppError('cant find student with this ID', 404));} 
    return res.status(200).json(data);
  })

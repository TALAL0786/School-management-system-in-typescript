const express2 = require("express");
const authController1 = require("../controllers/authcontroller");
const teachercontroller1 = require("../controllers/teachercontroller");
const studentcontroller1 = require("../controllers/studentcontroller");
const assignmentcontroller = require("../controllers/assignmentcontroller");
///
const router2 = express2.Router();
//assign student
router2.post(
  "/:teacherId/assign/:studentId",
  teachercontroller1.addstudentstoclass
);
//assign assignment
router2.post(
  "/:stid/assigntostudent/:asid",
  teachercontroller1.assigntostudent
);
//upload asssisgnment
router2.post(
  "/uploadassignment",
  assignmentcontroller.upload,
  assignmentcontroller.addassignment
);
//onschedule
router2.post(
  "/uploadassignmentonschedule",
  assignmentcontroller.upload,
  assignmentcontroller.onscheduler,
  assignmentcontroller.sendemail
);

router2.post(
  "/sendassigmentgmails",
  assignmentcontroller.upload,
  assignmentcontroller.sendemail
);

router2.get("/downloadassignment/:asname", assignmentcontroller.download);
//get my assignments
router2.get("/showassigment", teachercontroller1.teacherhaveassigments);
//get all assigned students
router2.get("/allstudents", teachercontroller1.allteacherstudents);
//update student and teacher
router2.patch("/updatestudent/:id", studentcontroller1.updateStudent);
router2.patch("/updateteacher/:id", teachercontroller1.updateTeacher);
module.exports = router2;

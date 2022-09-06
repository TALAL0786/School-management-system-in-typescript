const express2 = require('express');
// const userController = require('./../controllers/userController');
const authController1 = require('../controllers/authcontroller');
const teachercontroller1 = require('../controllers/teachercontroller');
const studentcontroller1 = require('../controllers/studentcontroller');
const router2 = express2.Router();
//assign student
router2.post('/:teacherId/assign/:studentId', teachercontroller1.addstudentstoclass);
//update student and teacher
router2.patch('/updatestudent/:id', studentcontroller1.updateStudent);
router2.patch('/updateteacher/:id', teachercontroller1.updateTeacher);
module.exports = router2;
//# sourceMappingURL=teacher.js.map
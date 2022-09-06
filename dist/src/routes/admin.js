const express = require('express');
const studentController = require('./../controllers/studentcontroller');
const teacherController = require('../controllers/teachercontroller');
const authController = require('../controllers/authcontroller');
const authmiddleware = require('../middelware/authmiddleware');
const router = express.Router();
//authenticatiom
router.post('/signup', authController.upload, authController.signup);
router.post('/login', authController.login);
//create
router.post('/createnewteacher', authmiddleware.protect, teacherController.createTeacher);
router.post('/createnewStudent', authmiddleware.protect, studentController.createStudent);
//update by using req.params 
router.patch('/updatestudent/:id', authmiddleware.protect, studentController.updateStudent);
router.patch('/updateteacher/:id', authmiddleware.protect, teacherController.updateTeacher);
//delete by using req.params
router.delete('/deletestudent/:id', authmiddleware.protect, studentController.deleteStudent);
router.delete('/deleteteacher/:id', authmiddleware.restrictTo, authmiddleware.protect, teacherController.deleteTeacher);
module.exports = router;
//# sourceMappingURL=admin.js.map
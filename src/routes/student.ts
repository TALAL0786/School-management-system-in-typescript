const express1 = require('express');
// const userController = require('./../controllers/userController');
const authController2 = require('../controllers/authcontroller');
const studentcontroller2= require('../controllers/studentcontroller');

const router1 = express1.Router();
router1.patch('/updatestudent/:id', studentcontroller2.updateStudent)

//
router1.get('/showassigment/:id', studentcontroller2.studenthaveassigments);

module.exports = router1;

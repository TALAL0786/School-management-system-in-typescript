const model2= require('../models');

//add student
exports.createStudent = async (req, res, next) => {
    const newStudent = await model2.Student.create(req.body);
  
    res.status(201).json({
      status: 'success',
      data: {
        student: newStudent
      }
    });
  };


//update student
  exports.updateStudent = async (req, res, next) => {
    const id = req.params.id;
    await model2.Student.update(req.body, { where: { Sid: id } });
    const updatestudent= await model2.Student.findOne({ where: { Sid: id } });
    if (!updatestudent) {
      res.status(400).send({
        message: "no student have this ID"
      });
      return;
    }
  
    res.status(200).json({
      status: 'success',
      data: {
        student: updatestudent
      }
    });
  };


//Delete student
exports.deleteStudent = async (req, res, next) => {
  const user_data = await model2.Student.destroy({ where: { Sid: req.params.id } });
  if (user_data) return res.status(400).json({ message: "no record" });
  else res.status(201).send("success" + req.params.id);
};

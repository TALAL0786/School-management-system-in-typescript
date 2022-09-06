const model1= require('../models');

//add teacher
exports.createTeacher = async (req, res, next) => {
  const newTeacher = await model1.Teacher.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      teacher: newTeacher
    }
  });
};

//update teacher
exports.updateTeacher = async (req, res, next) => {
  const id = req.params.id;
  await model1.Teacher.update(req.body, { where: { Tid: id } });
  const updateteacher= await model1.Teacher.findOne({ where: { Tid: id } });
  if (!updateteacher) {
    res.status(400).send({
      message: "no teacher have this ID"
    });
    return;
  }

  res.status(200).json({
    status: 'success',
    data: {
      teacher: updateteacher
    }
  });
};

 //Delete teacher
 exports.deleteTeacher = async (req, res, next) => {
  const teacher_data = await model1.Teacher.destroy({
    where: { Tid: req.params.id },
  });
  if (!teacher_data) return res.status(400).json({ message: "no record" });
  else res.status(201).send("success" + req.params.id);
};

//get all teacher
exports.getall=(_req: any, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: any): any; new(): any; }; }; }, next: any)=>{
    model1.teacher.findAll({
        include: [{
            model: model1.Student,
            as: 'tasks'
          }]
    })
    .then((teacher: any) => {
      return res.status(200).json(teacher)
    })
    .catch((error: any) => {
      return res.status(400).json(error)
    });
  }

//assign student to teacher
exports.addstudentstoclass=async (req, res) =>{
  await model1.Teacher.findOne({ where: { Tid: req.params.teacherId }})
    .then(async(teacher) => {
      if (!teacher) {
        return res.status(400).json({ message: 'teacher Not Found' });
      }
      console.log(req.params.teacherId,req.params.studentId)
     
      await teacher.addStudent(req.params.studentId, {
        through: {   }
      })
        .then((response) => {
          console.log("created")
          return res.status(200).json(response)
        })
        .catch((error) => {
          return res.status(400).json(error)
        });
    })
    .catch((error) => {
      return res.status(400).json(error)
    });
}



// exports.createTeacherbyservice = async (req, res, next) => {
//   const newTeacher = await userservice.create(req.body);
//   res.status(201).json({
//     status: 'success',
//     data: {
//       teacher: newTeacher
//     }
//   });
// };


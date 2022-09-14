import {
  create,
  update,
  findOne,
  destroy,
  findAll,
} from "../services/teacherServices";
import {
  findAssignment,
  showassignments,
} from "../services/assignmentServices";

const catchAsync = require("../helpers/catchAsync");
//add teacher
exports.createTeacher = async (req, res, next) => {
  const newTeacher: ITeacherAttributes = await create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      teacher: newTeacher,
    },
  });
};

//all assignments
exports.teacherhaveassigments = async (req, res) => {
  try {
    const data = await showassignments(req.query.id);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json(error);
  }
};

//update teacher
exports.updateTeacher = async (req, res, next) => {
  const checkteacher = await findOne(req.params.id);
  if (!checkteacher) {
    res.status(400).send({
      message: "no teacher have this ID",
    });
    return;
  }
  //if teacher in db than update it
  await update(req);
  res.status(200).json({
    status: "success",
    data: {
      teacher: `teacher at ${req.params.id} updated successfully`,
    },
  });
};

//Delete teacher
exports.deleteTeacher = async (req, res, next) => {
  const teacher_data: ITeacherAttributes = await destroy(req.params.id);
  if (!teacher_data) return res.status(400).json({ message: "no record" });
  else res.status(201).send("success" + req.params.id);
};

//get all teacher along students
exports.allteacherstudents = async (req, res) => {
  try {
    const data = await findAll();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json(error);
  }
};

//assign assignment to student
exports.assigntostudent = async (req, res) => {
  await findAssignment(req.params.asid)
    .then(async (assignment) => {
      if (!assignment) {
        return res.status(400).json({ message: "assignment Not Found" });
      }
      console.log(req.params.asid);
      await assignment
        .addStudent(req.params.stid, {
          through: {},
        })
        .then((response) => {
          console.log("created");
          return res.status(200).json(response);
        })
        .catch((error) => {
          return res.status(400).json(error);
        });
    })
    .catch((error) => {
      return res.status(400).json(error);
    });
};

//assign student to teacher
exports.addstudentstoclass = async (req, res) => {
  await findOne(req.params.teacherId)
    .then(async (teacher) => {
      if (!teacher) {
        return res.status(400).json({ message: "teacher Not Found" });
      }
      console.log(req.params.teacherId, req.params.studentId);

      await teacher
        .addStudent(req.params.studentId, {
          through: {},
        })
        .then((response) => {
          console.log("created");
          return res.status(200).json(response);
        })
        .catch((error) => {
          return res.status(400).json(error);
        });
    })
    .catch((error) => {
      return res.status(400).json(error);
    });
};

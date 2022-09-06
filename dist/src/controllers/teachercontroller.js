var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const model1 = require('../models');
//add teacher
exports.createTeacher = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const newTeacher = yield model1.Teacher.create(req.body);
    res.status(201).json({
        status: 'success',
        data: {
            teacher: newTeacher
        }
    });
});
//update teacher
exports.updateTeacher = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const id = req.params.id;
    yield model1.Teacher.update(req.body, { where: { Tid: id } });
    const updateteacher = yield model1.Teacher.findOne({ where: { Tid: id } });
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
});
//Delete teacher
exports.deleteTeacher = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const teacher_data = yield model1.Teacher.destroy({
        where: { Tid: req.params.id },
    });
    if (!teacher_data)
        return res.status(400).json({ message: "no record" });
    else
        res.status(201).send("success" + req.params.id);
});
//get all teacher
exports.getall = (_req, res, next) => {
    model1.teacher.findAll({
        include: [{
                model: model1.Student,
                as: 'tasks'
            }]
    })
        .then((teacher) => {
        return res.status(200).json(teacher);
    })
        .catch((error) => {
        return res.status(400).json(error);
    });
};
//assign student to teacher
exports.addstudentstoclass = (req, res) => __awaiter(this, void 0, void 0, function* () {
    yield model1.Teacher.findOne({ where: { Tid: req.params.teacherId } })
        .then((teacher) => __awaiter(this, void 0, void 0, function* () {
        if (!teacher) {
            return res.status(400).json({ message: 'teacher Not Found' });
        }
        // console.log(req.params.teacherId,req.params.studentId,req.body.class)
        yield teacher.addStudent(req.params.studentId, {
            through: {
                class: req.body.class
            }
        })
            .then((response) => {
            console.log("created");
            return res.status(200).json(response);
        })
            .catch((error) => {
            return res.status(400).json(error);
        });
    }))
        .catch((error) => {
        return res.status(400).json(error);
    });
});
// exports.createTeacherbyservice = async (req, res, next) => {
//   const newTeacher = await userservice.create(req.body);
//   res.status(201).json({
//     status: 'success',
//     data: {
//       teacher: newTeacher
//     }
//   });
// };
//# sourceMappingURL=teachercontroller.js.map
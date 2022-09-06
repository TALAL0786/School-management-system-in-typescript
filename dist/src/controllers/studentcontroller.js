var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const model2 = require('../models');
//add student
exports.createStudent = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const newStudent = yield model2.Student.create(req.body);
    res.status(201).json({
        status: 'success',
        data: {
            student: newStudent
        }
    });
});
//update student
exports.updateStudent = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const id = req.params.id;
    yield model2.Student.update(req.body, { where: { Sid: id } });
    const updatestudent = yield model2.Student.findOne({ where: { Sid: id } });
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
});
//Delete student
exports.deleteStudent = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const user_data = yield model2.Student.destroy({ where: { Sid: req.params.id } });
    if (user_data)
        return res.status(400).json({ message: "no record" });
    else
        res.status(201).send("success" + req.params.id);
});
//# sourceMappingURL=studentcontroller.js.map
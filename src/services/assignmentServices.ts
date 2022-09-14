const model=require("../models")

const create=(obj:IAssignmentAttributes)=>{

    obj.description = obj.description.replace(/(\r\n|\n|\r)/gm, "");
    return model.Assignment.create(obj)
}

const showassignments=(id:number)=>{
    return model.Teacher.findByPk(id,{
        include: [{
          model: model.Assignment,
          as: 'assignments',
        }]
      });
}


const findAssignment=(id:number)=>{
    return model.Assignment.findOne({ where: { Asid: id } });
  
  }

export{
    create,
    findAssignment,
    showassignments
}
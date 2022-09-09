const model=require("../models")

const create=(obj:IStudentAttributes)=>{

    return model.Student.create(obj)
}

const update=(obj)=>{
    const id = obj.params.id;
    return model.Student.update(obj.body, { where: { Sid: id } });

}

const findOne=(obj)=>{
    const id = obj.id;
    console.log(id)
    return model.Student.findOne({ where: { Sid: id } });

}


const destroy=(obj)=>{

    return model.Student.destroy({ where: { Sid: obj } });

}

const showassignments=(id:number)=>{
      return model.Student.findByPk(id,{
        include: [{
            model: model.Assignment,
            as: 'assignments',
           through: {
            attributes: []
          }
        }]
      });
}


export{
    create,
    update,
    findOne,
    destroy,
    showassignments
}
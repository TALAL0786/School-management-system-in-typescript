const model=require("../models")

const create=(obj:ITeacherAttributes)=>{

    return model.Teacher.create(obj)
}

const update=(obj)=>{
    const id = obj.params.id;
    return model.Teacher.update(obj.body, { where: { Tid: id } });

}

const findOne=(obj)=>{
    const id = obj.id;
    console.log(id)
    return model.Teacher.findOne({ where: { Tid: id } });

}


const destroy=(obj)=>{

    return model.Teacher.destroy({ where: { Tid: obj } });

}

const findAll=()=>{

    return model.Teacher.findAll({
    include: [{
       model: model.Student,
       as: 'students',
       attributes: ['stname'],
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
    findAll
}
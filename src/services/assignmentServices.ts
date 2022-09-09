const model=require("../models")

const create=(obj:IAssignmentAttributes)=>{

    return model.Assignment.create(obj)
}

export{
    create
}
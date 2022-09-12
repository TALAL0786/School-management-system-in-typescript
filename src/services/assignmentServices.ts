const model=require("../models")

const create=(obj:IAssignmentAttributes)=>{

    obj.description = obj.description.replace(/(\r\n|\n|\r)/gm, "");
    return model.Assignment.create(obj)
}

export{
    create
}
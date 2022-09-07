const model=require("../models")

const create=(obj:IAdminAttributes)=>{

    return model.Admin.create(obj)
}

export{
    create
}
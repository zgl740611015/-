import Config from './Config.js'

const db = wx.cloud.database();
let Type = db.collection(Config.dataBaseName.Type)

let getType = function(type_id,cb) {
    Type.where({
        type_id:type_id
    }).get({
        success:res=>{
            cb(res)
        } ,
        fail:console.error
    })
}

module.exports={
    getType
}
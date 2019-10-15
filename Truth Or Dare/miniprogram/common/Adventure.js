import Config from './Config.js'

const db = wx.cloud.database();
let Adventure = db.collection(Config.dataBaseName.Adventure)

let getAdventure = function (type_id,cb) {
    Adventure.where({
        type_id:type_id
    }).get({
        success: res => {
            cb(res)
        },
        fail: console.error
    })
}

let updateOpp = function (_id, obj, cb) {
    Adventure.doc(_id).update({
        data: {
            opposition: obj.opposition
        }
    }).then(res=>{
        cb(res)
    }).catch(console.error)
}

let updateApp = function (_id, obj, cb) {
    Adventure.doc(_id).update({
        data: {
            approve: obj.approve
        }
    }).then(res => {
        cb(res)
    }).catch(console.error)
}

module.exports ={
    getAdventure,
    updateOpp,
    updateApp
}

import Config from './Config.js'

const db = wx.cloud.database();
const Sincere_Words = db.collection(Config.dataBaseName.Sincere_Words)

let getSincere_Words = function(type_id, cb) {
    Sincere_Words.where({
        type_id: type_id
    }).get({
        success:res=>{
            cb(res)
        },
        fail:console.error
    })
}

let updateOpp = function(_id, obj, cb) {
    Sincere_Words.doc(_id).update({
        data: {
            opposition: obj.opposition
        }
    }).then(res => {
        cb(res)
    }).catch(console.error)
}

let updateApp = function(_id, obj, cb) {
    Sincere_Words.doc(_id).update({
        data: {
            approve: obj.approve
        }
    }).then(res => {
        cb(res)
    }).catch(console.error)
}

module.exports = {
    getSincere_Words,
    updateOpp,
    updateApp
}
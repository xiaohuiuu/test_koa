const user = require('../model/userModel')



//查找所有的用户
const findAll = async function () {
    let Users = await user.findAll()
    return Users
}





module.exports = {
    findAll
}
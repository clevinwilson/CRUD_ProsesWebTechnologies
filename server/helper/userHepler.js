const userCollection = require('../model/userModel')

module.exports = {
    findUserByPhone: async (phone) => {
        const userData = await userCollection.findOne({ phone: phone })
        return userData;
    },
    getAllUsers:async()=>{
        return await userCollection.find();
    },
    deleteUserById:async(id)=>{
        return await userCollection.deleteOne({_id:id});
    }
}
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
    },
    findUserById:async(id)=>{
        return await userCollection.findOne({_id:id})
    },
    updateUserById: async (id, name, email, phone, address, image)=>{
        return await userCollection.updateOne({_id:id},{
            $set:{
                name,
                email,
                phone,
                address,
                avatar: image
            }
        })
    }
}
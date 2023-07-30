const userCollection = require('../model/userModel')

module.exports = {
    findUserByPhone: async (phone) => {
        const userData = await userCollection.findOne({ phone: phone })
        return userData;
    }
}
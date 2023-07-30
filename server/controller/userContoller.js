const expressAsyncHandler = require("express-async-handler");
const AppError = require("../utils/error");
const userCollection = require('../model/userModel');
const { findUserByPhone } = require("../helper/authHepler");


//signup
const register = expressAsyncHandler(async (req, res) => {
    let { name, phone, email, address } = req.body;
    if (!name || !phone || !email || !address) throw new AppError(400, "All fields required");
    console.log(req.body);
    let userExist = await findUserByPhone(phone);
    if (userExist) {
        throw new AppError(409, "user already exists");
    } else {
        const user = new userCollection({
            name,
            phone,
            email,
            address
        });

        await user.save();
        res.status(201).json({
            created: true,
            email: user.email
        });
    }
})



module.exports = {
    register
}
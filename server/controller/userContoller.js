const expressAsyncHandler = require("express-async-handler");
const AppError = require("../utils/error");
const userCollection = require('../model/userModel');
const { findUserByPhone, getAllUsers, deleteUserById } = require("../helper/userHepler");


//add user
const register = expressAsyncHandler(async (req, res) => {
    let { name, phone, email, address } = req.body;
    if (!name || !phone || !email || !address) throw new AppError(400, "All fields required");
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

const getUsers=expressAsyncHandler(async(req,res)=>{
    let userList=await getAllUsers();
    res.json({user:userList})
})

const deleteUser=expressAsyncHandler(async(req,res)=>{
    const {id}=req.params;
    if(!id) throw new AppError(400,'bad request');

    const result= await deleteUserById(id);
    res.json({status:true})
})



module.exports = {
    register,
    getUsers,
    deleteUser
}
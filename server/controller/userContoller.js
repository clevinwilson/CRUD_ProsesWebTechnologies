const expressAsyncHandler = require("express-async-handler");
const AppError = require("../utils/error");
const userCollection = require('../model/userModel');
const { findUserByPhone, getAllUsers, deleteUserById, findUserById, updateUserById } = require("../helper/userHepler");


//add user
const register = expressAsyncHandler(async (req, res) => {
    let image = req.files.image[0].path;
    image = image.replace('public', "");

    let { name, phone, email, address } = req.body;
    if (!image || !name || !phone || !email || !address) throw new AppError(400, "All fields required");
    let userExist = await findUserByPhone(phone);
    if (userExist) {
        throw new AppError(409, "user already exists");
    } else {
        const user = new userCollection({
            name,
            phone,
            email,
            address,
            avatar: image
        });

        await user.save();
        res.status(201).json({
            created: true,
            email: user.email
        });
    }
})

const getUsers = expressAsyncHandler(async (req, res) => {
    let userList = await getAllUsers();
    res.json({ user: userList })
})

const deleteUser = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id) throw new AppError(400, 'bad request');

    const result = await deleteUserById(id);
    res.json({ status: true })
})

const getUserDetails = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id) throw new AppError(400, 'bad request');
    const user = await findUserById(id);
    res.json({ status: true, user })
})

const updateUserDetails = expressAsyncHandler(async (req, res) => {
    let image = req.files.image[0].path;
    image = image.replace('public', "");

    const { id } = req.params;
    const { name, email, phone, address } = req.body;

    let user = await findUserById(id)
    if (!user) throw new AppError(400, 'User not exist');

    //if image file not in the request seting old image
    if (!image) image = user.avatar;

    if (!id || !name || !email || !phone || !address) throw new AppError(400, 'bad request');

    const updateUser = await updateUserById(id, name, email, phone, address, image);
    if (!updateUser) throw new Error("something went wrong")
    res.json({ status: true })
})


module.exports = {
    register,
    getUsers,
    deleteUser,
    getUserDetails,
    updateUserDetails
}
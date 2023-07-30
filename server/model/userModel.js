const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "User name is required"],
        },
        phone: {
            type: String,
            required: [true, "Phone name is required"],
            unique: true
        },
        email: {
            type: String,
            required: [true, "Email name is required"],
        },
        address: {
            type: String,
            required: [true, "Address is required"],
        },
        avatar: {
            type: String,
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model("Users", userSchema);
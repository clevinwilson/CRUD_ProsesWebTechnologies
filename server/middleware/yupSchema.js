const Yup = require('yup');

// user registration
const userSchema = Yup.object().shape({
    name: Yup
        .string()
        .trim()
        .required("Please provide fullname")
        .matches(/^[a-zA-Z\s]+$/, "Only alphabets are allowed"),
    phone: Yup
        .string()
        .matches(/^\+?[0-9]{6,14}$/, 'Invalid phone number'),
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is Required'),
    address: Yup
        .string()
        .required("Please provide Address")
});

module.exports = {
    userSchema
}
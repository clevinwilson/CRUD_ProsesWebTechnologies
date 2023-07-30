const express = require('express');
const { register, getUsers, deleteUser, getUserDetails, updateUserDetails } = require('../controller/userContoller');
const { validateBody } = require('../utils/validateBody.js');
const { userSchema } = require('../middleware/yupSchema');
const { validate_id } = require('../utils/validateId');
const router = express.Router();

//add User
router.post('/register', validateBody(userSchema), register);
router.get('/user', getUsers);
router.route('/user/:id')
    .get(validate_id, getUserDetails)
    .delete(validate_id, deleteUser)
    .put(validate_id, updateUserDetails)


module.exports = router;
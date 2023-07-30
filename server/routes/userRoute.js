const express=require('express');
const { register, getUsers, deleteUser } = require('../controller/userContoller');
const { validateBody } = require('../utils/validateBody.js');
const { userSchema } = require('../middleware/yupSchema');
const { validate_id } = require('../utils/validateId');
const router=express.Router();

//add User
router.post('/register',validateBody(userSchema),register);
router.get('/user',getUsers);
router.route('/user/:id').delete(validate_id,deleteUser)


module.exports = router;
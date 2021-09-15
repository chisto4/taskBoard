const { check } = require("express-validator")
const multer = require('multer')
const upload = multer({ dest: "static" });

const  auth  = require('../middleware/authMiddleware')
const userController = require('../Controller/userController')

const express = require("express");
const userRouter = express.Router();



userRouter.post('/registration/', [
  check('name', "Input name, please!").notEmpty(),
  check('surname', "Input surname, please!").notEmpty(),
  check('login', "Input login please!").notEmpty(),
  check('email', "Input email please!").notEmpty(),
  check('password', "Minimal length of password 4 maximum 50").isLength({ min: 4, max: 50 })
],
  userController.registrationUser);

userRouter.post('/login/',
  [
    check('login', "Input login please!").notEmpty(),
  ],
  userController.loginUser);

userRouter.get('/token', auth.tokenModule, userController.tokenUser);

userRouter.get('/users', auth.tokenModule, userController.getUsers);
userRouter.get('/user/:id', auth.tokenModule, userController.getOneUser);
userRouter.put('/user', auth.tokenModule, userController.updateUser);
userRouter.put('/user/email', auth.tokenModule, userController.updateEmail);
userRouter.delete('/user/:id', auth.tokenModule, userController.deleteUser);
userRouter.post('/user', auth.tokenModule, upload.single("file"), userController.uploadAvatar);
// userRouter.get('/avatar', auth.tokenModule, avatarController.getAvatarInfo);

// export default userRouter;
module.exports = userRouter;
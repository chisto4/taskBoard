import {Router} from "express";
import {check} from "express-validator";

import {tokenModule} from '../middleware/authMiddleware.js';
import userController from '../Controller/userController.js';

const userRouter = new Router();

userRouter.post('/registration/', [
  check('name', "Input name, please!").notEmpty(),
  check('surname', "Input surname, please!").notEmpty(),
  check('login', "Input login please!").notEmpty(),
  check('email', "Input email please!").notEmpty(),
  check('password', "Minimal length of password 4 maximum 16").isLength({min:4, max:16})
],
userController.registrationUser);

userRouter.post('/login/', 
[
  check('login', "Input login please!").notEmpty(),
  check('email', "Input email please!").notEmpty(),
  check('password', "Minimal length of password 4 maximum 16").isLength({min:4, max:16})
],
userController.loginUser);

userRouter.get('/token', tokenModule, userController.tokenUser);

userRouter.get('/users', tokenModule, userController.getUsers);
userRouter.get('/user/:id', tokenModule, userController.getOneUser);
userRouter.put('/user', tokenModule, userController.updateUser);
userRouter.put('/user/email', tokenModule, userController.updateEmail);
userRouter.delete('/user/:id', tokenModule, userController.deleteUser);
userRouter.post('/avatar', tokenModule, userController.uploadAvatar);

export default userRouter;

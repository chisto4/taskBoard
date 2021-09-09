
const express = require("express");
const boardRouter = express.Router();
const { check } = require("express-validator")

const multer = require('multer')
const upload = multer({ dest: "static" });

const  auth  = require('../middleware/authMiddleware')
const boardController = require('../Controller/boardController')


boardRouter.post('/board', auth.tokenModule, boardController.createBoard);
boardRouter.get('/boards', auth.tokenModule, boardController.getAllBoards);
boardRouter.get('/board', auth.tokenModule, boardController.getOneBoard);
boardRouter.put('/board', auth.tokenModule, boardController.updateBoard);
boardRouter.delete('/board', auth.tokenModule, boardController.deleteBoard);

boardRouter.post('/board/column', auth.tokenModule, boardController.createColumn);
boardRouter.get('/board/columns/:id', auth.tokenModule, boardController.getAllColumns);
boardRouter.get('/board/column', auth.tokenModule, boardController.getOneColumn);
boardRouter.put('/board/column', auth.tokenModule, boardController.updateColumn);
boardRouter.delete('/board/column', auth.tokenModule, boardController.deleteColumn);

boardRouter.post('/board/column/task', auth.tokenModule, boardController.createTask);
boardRouter.get('/board/column/tasks/:id', auth.tokenModule, boardController.getAllTasks);
boardRouter.get('/board/column/task', auth.tokenModule, boardController.getOneTask);
boardRouter.put('/board/column/task', auth.tokenModule, boardController.updateTask);
boardRouter.put('/board/column/tasks', auth.tokenModule, boardController.updateTaskPosition);
boardRouter.delete('/board/column/task', auth.tokenModule, boardController.deleteTask);

// userRouter.post('/login/',
//   [
//     check('login', "Input login please!").notEmpty(),
//     check('email', "Input email please!").notEmpty(),
//     check('password', "Minimal length of password 4 maximum 16").isLength({ min: 4, max: 16 })
//   ],
//   userController.loginUser);

// userRouter.get('/token', auth.tokenModule, userController.tokenUser);

// userRouter.get('/users', auth.tokenModule, userController.getUsers);
// userRouter.get('/user/:id', auth.tokenModule, userController.getOneUser);
// userRouter.put('/user', auth.tokenModule, userController.updateUser);
// userRouter.put('/user/email', auth.tokenModule, userController.updateEmail);
// userRouter.delete('/user/:id', auth.tokenModule, userController.deleteUser);
// userRouter.post('/user', auth.tokenModule, upload.single("file"), userController.uploadAvatar);
// // userRouter.get('/avatar', auth.tokenModule, avatarController.getAvatarInfo);

module.exports = boardRouter;
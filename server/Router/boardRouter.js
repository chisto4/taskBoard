
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
boardRouter.put('/board/send', auth.tokenModule, boardController.sendBoard);
boardRouter.delete('/board', auth.tokenModule, boardController.deleteBoard);

boardRouter.post('/board/column', auth.tokenModule, boardController.createColumn);
boardRouter.get('/board/columns/:id', auth.tokenModule, boardController.getAllColumns);
boardRouter.get('/board/column', auth.tokenModule, boardController.getOneColumn);
boardRouter.put('/board/column', auth.tokenModule, boardController.updateColumn);
boardRouter.put('/board/columns', auth.tokenModule, boardController.updateColumnPosition);
boardRouter.delete('/board/column', auth.tokenModule, boardController.deleteColumn);

boardRouter.post('/board/column/task', auth.tokenModule, boardController.createTask);
boardRouter.get('/board/column/tasks/:id', auth.tokenModule, boardController.getAllTasks);
boardRouter.get('/board/column/task', auth.tokenModule, boardController.getOneTask);
boardRouter.put('/board/column/task', auth.tokenModule, boardController.updateTask);
boardRouter.put('/board/column/tasks', auth.tokenModule, boardController.updateTaskPosition);
boardRouter.delete('/board/column/task', auth.tokenModule, boardController.deleteTask);

module.exports = boardRouter;
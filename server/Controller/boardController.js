const db = require('../db/models')


class BoardController {

  //BOARD
  
  async createBoard(req, res) {

    const { title } = req.body

    try {
      const { id } = req.user
      if (!id) {
        return res.status(400).json({ message: "ID not found in user data" })
      }
      let newBoard = await db.Board.create({ title })
      newBoard.setUsers([id])
      newBoard = newBoard.toJSON();
      return res.status(200).json(newBoard)
    }
    catch (e) { res.status(500).json(e) }
  }

  async getAllBoards(req, res) {
    try {
      const { id } = req.user
      if (!id) {
        return res.status(400).json({ message: "ID not found in user data" })
      }
      const userBoards = await db.User.findOne({
        where: { id },
        include: [{
          model: db.Board,
          as: 'Boards',
          through: { attributes: [] }
        }]
      })
      res.status(200).json(userBoards.Boards)
    }

    catch (e) {
      console.log(e);
      console.log('User Boards not download error')
    }
  }

  async getOneBoard(req, res) {
    try {
      const { id } = req.user
      const { boardId } = req.body
      if (!id) {
        return res.status(400).json({ message: "ID not found in user data" })
      }
      const userBoard = await db.Board.findOne({
        where: { id: boardId }
      })
         res.status(200).json(userBoard)
    }
    catch (e) {
      console.log(e);
      console.log('User Board not download error')
    }
  }

  async updateBoard(req, res) {
    try {
      const { id } = req.user
      const { boardId, title } = req.body
      if (!id) {
        return res.status(400).json({ message: "ID not found in user data" })
      }
      await db.Board.update({ title },
        { where: { id: boardId } });

      const userBoard = await db.Board.findOne({
        where: { id: boardId }
      })
    res.status(200).json(userBoard)
    }
    catch (e) {
      console.log(e);
      console.log('User Board not update error')
    }
  }

  async deleteBoard(req, res) {
    try {
      const { id: tokenId } = req.user
      const { id } = req.query
      if (!tokenId) {
        return res.status(400).json({ message: "ID not found in user data" })
      }
      await db.Board.destroy({where: { id }})
        res.status(200).json(id)
    }
    catch (e) {
      console.log(e);
      console.log('User Board not delete error')
    }
  }

  //COLUMN

  async createColumn(req, res) {
    try {
      const { title, position, boardId } = req.body
      const { id } = req.user
      if (!id) {
        return res.status(400).json({ message: "ID not found in user data" })
      }
      let newColumn = await db.Column.create({ title, position, boardId })
      // let newColumn = await db.Column.create({ title, position, boardId }).catch(err => console.log(err));
      newColumn = newColumn.toJSON();
      return res.status(200).json(newColumn)
    }
    catch (e) { res.status(500).json(e) }
  }

  async getAllColumns(req, res) {
    try {
      const { id } = req.params
      const { id: tokenId } = req.user
      if (!tokenId) {
        return res.status(400).json({ message: "ID not found in user data" })
      }
      const boardColumns = await db.Column.findAll({
        where: { boardId: id },
      })
      res.status(200).json(boardColumns)
    }

    catch (e) {
      console.log(e);
      console.log('Board Columns not download error')
    }
  }

  async getOneColumn(req, res) {
    try {
      const { id } = req.user
      console.log('query IDDD', id)
      const { columnId } = req.body
      if (!id) {
        return res.status(400).json({ message: "ID not found in user data" })
      }
      const boardColumn = await db.Column.findOne({
        where: { id: columnId }
      })
         res.status(200).json(boardColumn)
    }
    catch (e) {
      console.log(e);
      console.log('Board Column not download error')
    }
  }

  async updateColumn(req, res) {
    try {
      const { id } = req.user
      const { columnId, title, position } = req.body
      if (!id) {
        return res.status(400).json({ message: "ID not found in user data" })
      }
      await db.Column.update({ title, position },
        { where: { id: columnId } });

      const userColumn = await db.Column.findOne({
        where: { id: columnId }
      })
    res.status(200).json(userColumn)
    }
    catch (e) {
      console.log(e);
      console.log('Board Column not update error')
    }
  }

  async deleteColumn(req, res) {
    try {
      const { id: tokenId } = req.user
      const { id } = req.query
      if (!tokenId) {
        return res.status(400).json({ message: "ID not found in user data" })
      }
      await db.Column.destroy({where: { id }})
        res.status(200).json('User Column delete')
    }
    catch (e) {
      console.log(e);
      console.log('Board Column not delete error')
    }
  }

  //TASK

  async createTask(req, res) {
    try {
      const { title, position, columnId, description, priority } = req.body
      const { id } = req.user
      if (!id) {
        return res.status(400).json({ message: "ID not found in user data" })
      }
      let newTask = await db.Task.create({ title, position, columnId, description, priority })
      newTask = newTask.toJSON();
      return res.status(200).json(newTask)
    }
    catch (e) { res.status(500).json(e) }
  }

  async getAllTasks(req, res) {
    try {
      const { id } = req.query
      const { id: tokenId } = req.user
      if (!tokenId) {
        return res.status(400).json({ message: "ID not found in user data" })
      }
      const сolumnTasks = await db.Task.findAll({
        where: { id },
      })
      res.status(200).json(сolumnTasks)
    }
    catch (e) {
      console.log(e);
      console.log('Column Tasks not download error')
    }
  }

  async getOneTask(req, res) {
    try {
      const { id } = req.user
      const { taskId } = req.body
      if (!id) {
        return res.status(400).json({ message: "ID not found in user data" })
      }
      const columnTask = await db.Task.findOne({
        where: { id: taskId }
      })
         res.status(200).json(columnTask)
    }
    catch (e) {
      console.log(e);
      console.log('Column Tsak not download error')
    }
  }

  async updateTask(req, res) {
    try {
      const { id } = req.user
      const { taskId, title, position, columnId, description, priority } = req.body
      if (!id) {
        return res.status(400).json({ message: "ID not found in user data" })
      }
      await db.Task.update({ title, position, columnId, description, priority },
        { where: { id: taskId } });

      const columnTask = await db.Task.findOne({
        where: { id: taskId }
      })
    res.status(200).json(columnTask)
    }
    catch (e) {
      console.log(e);
      console.log('Column Task not update error')
    }
  }

  async deleteTask(req, res) {
    try {
      const { id: tokenId } = req.user
      const { id } = req.query
      if (!tokenId) {
        return res.status(400).json({ message: "ID not found in user data" })
      }
      await db.Task.destroy({where: { id }})
        res.status(200).json('Column Task delete')
    }
    catch (e) {
      console.log(e);
      console.log('Column Task not delete error')
    }
  }

}
module.exports = new BoardController()


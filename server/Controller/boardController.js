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
        order:[['position', 'ASC']],
        include: [
          {
              model: db.Task,
              // attributes: ['id', 'boardId', 'position', 'title']
          }
      ],
      order:[[db.Task, 'position', 'ASC']  ]
      // attributes: ['id', 'name', 'surname', 'login', 'email', 'dob', 'avatarId',],
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
      const { id: tokenId } = req.user
      const { id, title, position } = req.body
      if (!tokenId) {
        return res.status(400).json({ message: "ID not found in user data" })
      }
      await db.Column.update({ title, position },
        { where: { id } });

      const userColumn = await db.Column.findOne({
        where: { id }, 
        include: [
          {
              model: db.Task,
          }
      ],
      order:[[db.Task, 'position', 'ASC']  ]
      })
    res.status(200).json(userColumn)
    }
    catch (e) {
      console.log(e);
      console.log('Board Column not update error')
    }
  }
  async updateColumnPosition(req, res) {
    try{
      const{id: tokenId} = req.user
      const column = req.body
      const boardID = req.body[0].boardId
      console.log("ZALUPA", column)
        if(!tokenId){
          return res.status(400).json({ message: "ID not found in user data" })
        }
      column.forEach(async(elem) => {
        await db.Column.update({title: elem.title, position: elem.position,
        boardId: elem.boardId},
          {where: {id: elem.id}},
          console.log('FORECH UPDATE COLUMN ARR', elem)
          );
        }
        )
        const userColumn = await db.Column.findAll({
          where: {boardId: boardID},
          order:[['position', 'ASC']],
              include: [
                {
                  model: db.Task,
                }
              ],
              order:[[db.Task, 'position', 'ASC']]
          })
                  res.status(200).json(userColumn)


    }
    catch (e) {
      console.log(e);
      console.log('Board Column Array not update error')
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
      const { id } = req.params
      console.log('zalupa ne raboataetTUT', req.query)
      const { id: tokenId } = req.user
      if (!tokenId) {
        return res.status(400).json({ message: "ID not found in user data" })
      }
      const сolumnTasks = await db.Task.findAll({
        where: { columnId: id },
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
      const { id: taskId, title, position, columnId, description, priority } = req.body
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


  async updateTaskPosition(req, res) {
    try {
      const { id: tokenId } = req.user
      const task = req.body
      console.log('body', req.body)
      if (!tokenId) {
        return res.status(400).json({ message: "ID not found in user data" })
      }
      task.forEach(async(el) => {
        await db.Task.update({ position: el.position, columnId: el.columnId },
          { where: { id: el.id }})
        }
        )
    //   const columnTask = await db.Task.findAll({
    //     where: { columnId }
    //   })
    // res.status(200).json(columnTask)
    res.status(200).json('Array was Update')
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


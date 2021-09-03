const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator')
const authToken = require('../middleware/authMiddleware')
const db = require('../db/models')

const regularEmail = require('../middleware/regularConstant')

class BoardController {

  async createBoard(req, res) {

    const { title } = req.body

    try {
      const { id } = req.user
      if (!id) {
        return res.status(400).json({ message: "ID not use" })
      }
      let newBoard = await db.Board.create({ title })
      newBoard.setUsers([id])
      newBoard = newBoard.toJSON();
      return res.status(200).json({ newBoard })
    }
    catch (e) { res.status(500).json(e) }
  }

  async getAllBoard(req, res) {
    try {
      const { id } = req.user
      if (!id) {
        return res.status(400).json({ message: "ID not found in user data" })
      }
      // const myUser = await db.User.findOne({
      //   where: {  id }
      // });
      // console.log('my', myUser);
      // const userBoards = await myUser.getBoards();


      const userBoards = await db.User.findOne({
        where: { id },
        include: [{
          model: db.Board,
          as: 'Boards',
          through: { attributes: [] }
        }]
      })

      // const userBoards = await db.Board.findAll({
      //   include: [{
      //     model: db.User,
      //     as: 'Users',
      //     where: {
      //       id
      //     },
      //     through: { attributes: [] },
      //   }],
        
      //   attributes: { exclude: ['Users'] },

      // })

        // raw: true,

        // include: [{
        //   model: db.User,
        //   as: 'Users',
        //   where: {
        //     id
        //   },
        //   through: { attributes: [] }
        // }],
      // })
      res.status(200).json(userBoards.Boards)
      console.log('User information updated success! Congratulations!')
    }

    catch (e) {
      console.log(e);
      console.log('User information not update error')
    }
  }
  //   async getAllBoard(req, res) {    
  //     try {
  //       const { id } = req.user
  //         if (!id) {
  //           return res.status(400).json({ message: "ID not use" })
  //         }
  //         const userIdToken = await db.User.findOne({
  //           where: { id },
  //           include: [
  //               {
  //                   model: db.Board,
  //                   as: 'Boards',
  //                   attributes: ['id', 'title'],
  //                   through: {attributes:[]}
  //               }
  //           ],
  //           attributes: ['id', 'name', 'surname', 'login', 'email', 'dob', 'avatarId',],
  //       })

  //       res.status(200).json(userIdToken)
  //       console.log('User information updated success! Congratulations!')
  //   }

  //   catch (e) {
  //       console.log(e);
  //       console.log('User information not update error')
  //   }
  // }

  async loginUser(req, res) {
    try {
      const { login, password } = req.body
      const lowerCaseLogin = login.toLowerCase();
      let userLogin = await db.User.findOne({
        where: { login: lowerCaseLogin },
        include: [
          {
            model: db.Images,
            attributes: ['pathImages']
          }
        ]
      })
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Error Registration", errors })
      }
      if (!userLogin) {
        return res.status(400).json({ message: `Not found ${login}` })
      }
      const validPassword = bcrypt.compareSync(password, userLogin.password)
      if (!validPassword) {
        return res.status(400).json({ message: "Bad password! Try again" })
      }
      userLogin = userLogin.toJSON();
      delete userLogin.password;
      // userLogin.pathImage = userLogin['Image.pathImages']
      // delete userLogin['Image.pathImages']
      const token = authToken.genAccessToken(userLogin.id, userLogin.email)
      return res.json({ token, userLogin })
    } catch (e) {
      console.log(e)
      res.status(400).json({ message: 'Login fail error' })
    }
  }

  async uploadAvatar(req, res) {
    try {
      const { id } = req.user
      if (!id) {
        return res.status(400).json({ message: "ID not use" })
      }
      const file = req.file;
      const way = req.file.path
      let [avatarImage, created] = await db.Images.findOrCreate({
        where: { userId: id },
        defaults: {
          pathImages: way
        }
      })
      if (!created) {
        avatarImage.pathImages = way;
        await avatarImage.save();
      }
      await db.User.update({ avatarId: avatarImage.id }, { where: { id } })
      res.json({ message: "Avatar was uploaded", file, avatarImage })
    } catch (e) {
      console.log(e);
      res.json({ message: "Avatar was uploaded", message: e.message })
    }
  }

  async tokenUser(req, res) {
    try {
      const { id } = req.user
      if (!id) {
        return res.status(400).json({ message: "ID not use" })
      }
      const userIdToken = await db.User.findOne({
        where: { id },
        include: [
          {
            model: db.Images,
            attributes: ['pathImages']
          }
        ],
        attributes: ['id', 'name', 'surname', 'login', 'email', 'dob', 'avatarId',],
      })
      res.status(200).json(userIdToken)
    } catch (e) {
      console.log(e)
      res.status(400).json({ message: 'Token fail error' })
    }
  }

  async getUsers(req, res) {
    try {
      const users = await db.User.findAll({
        raw: true,
        attributes: ['id', 'name', 'surname', 'login', 'email', 'dob', 'avatarId']
      });
      console.log(users);
      res.status(200).json(users);
    }
    catch (e) {
      console.log(e);
    }
  }

  async getOneUser(req, res) {
    try {
      const id = req.params.id
      if (!id) {
        throw res.status(400).json('Not found user ID')
      }
      const getUser = await db.User.findOne({
        where: { id }, raw: true,
        attributes: ['id', 'name', 'surname', 'login', 'email', 'dob', 'avatarId']
      });
      console.log(getUser)
      res.status(200).json(getUser)
    }
    catch (e) {
      console.log(e);
      console.log('User ID not found')
    }
  }

  async updateUser(req, res) {
    try {
      const { id: tokenId, email } = req.user
      if (!tokenId) {
        return res.status(400).json({ message: "ID not use" })
      }
      const { name, surname, login, dob } = req.body

      await db.User.update({ name, surname, login, dob, email },
        { where: { email } });

      const { id } = req.user
      const userIdToken = await db.User.findOne({
        where: { id },
        include: [
          {
            model: db.Images,
            attributes: ['pathImages']
          }
        ],
        attributes: ['id', 'name', 'surname', 'login', 'email', 'dob', 'avatarId',],
      })

      res.status(200).json(userIdToken)
      console.log('User information updated success! Congratulations!')
    }

    catch (e) {
      console.log(e);
      console.log('User information not update error')
    }
  }


  async updateEmail(req, res) {
    const { id } = req.user
    const { email, password, login } = req.body
    const lowerCaseEmail = email.toLowerCase();

    try {
      const validEmail = await db.User.findOne({ where: { email: lowerCaseEmail } })
      if (!id) {
        return res.status(400).json({ message: "ID token not use" })
      } else

        if (!validEmail) {
          const hashPassword = bcrypt.hashSync(password, 5);
          await db.User.update({ login, email: lowerCaseEmail, password: hashPassword },
            { where: { login } })
        }
        else {
          const hashPassword = bcrypt.hashSync(password, 5);
          await db.User.update({ email, password: hashPassword },
            { where: { email } })
        }

      const userIdToken = await db.User.findOne({
        where: { id },
        include: [
          {
            model: db.Images,
            attributes: ['pathImages']
          }
        ],
        attributes: ['id', 'name', 'surname', 'login', 'email', 'dob', 'avatarId',],
      })
      res.status(200).json(userIdToken)
      console.log('User Email updated success! Congratulations!')
    }
    catch (e) {
      console.log(e);
      console.log('User Email not update error')
    }
  }

  async deleteUser(req, res) {
    try {
      const id = req.params.id
      const users = await db.User.destroy({ where: { id } });
      res.json(users)
      console.log('User delete')
    }
    catch (e) {
      console.log(e);
      console.log('User not found. Try again')
    }
  }
}
// export default new UserController()
module.exports = new BoardController()

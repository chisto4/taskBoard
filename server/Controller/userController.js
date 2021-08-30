import bcrypt from 'bcryptjs'
import { validationResult } from 'express-validator'
import { genAccessToken } from '../middleware/authMiddleware.js'
import db from '../database/models/index.js'
import { v4 } from 'uuid'

import regularEmail from '../middleware/regularConstant.js'

// const db = require ('../database/models/test.js');
// const db = {};

export const secretKey = 'q1w2e3r4'

class UserController {

    async registrationUser(req, res) {
        const { name, surname, login, email, password, dob, avatarId } = req.body
        const lowerCaseEmail = email.toLowerCase();
        const userEmail = await db.User.findOne({ where: { email: lowerCaseEmail } })
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: "Error Registration", errors })
            }
            if (userEmail) {
                return res.status(400).json({ message: 'This email is alredy registrated' })
            }
            if (!regularEmail.test(String(email).toLowerCase())) return res.status(400).json({ message: 'Not format e-mail - coorrect yor input e-mail' });
            const lowerCaseLogin = login.toLowerCase();
            const loginUser = await db.User.findOne({ where: { login: lowerCaseLogin } })
            if (loginUser) {
                return res.status(400).json({ message: 'This login is alredy registrated' })
            }
            const hashPassword = bcrypt.hashSync(password, 5);
            let newUser = await db.User.create(
                { name, surname, login: lowerCaseLogin, email: lowerCaseEmail, password: hashPassword, dob, avatarId }
            )
            newUser = newUser.toJSON();
            delete newUser.password;
            const token = genAccessToken(newUser.id, newUser.email)
            // console.log('test token content', userLogin.id, userLogin.email)
            // return res.json({token})
            console.log({ token, newUser })
            return res.status(200).json({ token, newUser })
        }
        catch (e) {
            res.status(500).json(e)
            console.log(e.message)
        }
    }

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
            const token = genAccessToken(userLogin.id, userLogin.email)
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
            // userIdToken.pathImage = userIdToken['Image.pathImages']
            // delete userIdToken['Image.pathImages']
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
            const { name, surname, login, email, password, dob } = req.body
            const lowerCaseEmail = email.toLowerCase();
            const userEmail = await db.User.findOne({ where: { email: lowerCaseEmail } })
            if (!userEmail) {
                return res.status(400).json({ message: `Access denide. Not found user E-mail: ${email}` })
              }
              const hashPassword = bcrypt.hashSync(password, 5);
              await db.User.update({ name, surname, login, email, password: hashPassword, dob },
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
      


    //   async updateUser(req, res) {
    //     try {
            
    //             const { id: tokenId, email: tokenEmail } = req.user
    //             // const tokenEmail = email;
    //             if (!tokenId) {
    //                 return res.status(400).json({ message: "ID not use" })
    //             } 

    //         const { name: newName, email, surname: newSurname,
    //              login: newLogin, 
    //              password, dob: newDob } = req.body
    //         const lowerCaseEmail = email.toLowerCase();
    //         if(!tokenEmail === lowerCaseEmail){
    //             console.log('db.User', db.User)
    //             const validEmailUser = await db.User.findOne({ where: { email: lowerCaseEmail } })
    //             console.log('BD USER', bdUser)
    //             if (validEmailUser) {
    //                 return res.status(400).json({ message: `Access denide. E-mail used}` })
    //             }
    //         }

    //         const bdUser = await db.User.findOne({ where: { email: tokenEmail } })
    //         const validPassword = bcrypt.compareSync(password, bdUser.password);
    //         if (!validPassword) {
    //             return res.status(400).json({ message: "Bad password! Try again" })
    //         }

    //         await db.User.update({ name: newName, surname: newSurname,
    //              login: newLogin, email: lowerCaseEmail, dob: newDob },
    //               { where: { email } });
    
    // const { id } = req.user
    // const userIdToken = await db.User.findOne({
    //     where: { id },
    //     include: [
    //         {
    //             model: db.Images,
    //             attributes: ['pathImages']
    //         }
    //     ],
    //     attributes: ['id', 'name', 'surname', 'login', 'email', 'dob', 'avatarId',],
    // })
    //           res.status(200).json(userIdToken)
    //           console.log('User information updated success! Congratulations!')
    //       }
    //       catch (e) {
    //           console.log(e);
    //           console.log('User information not update error')
    //       }
    //   }


    async updateEmail(req, res) {
        try {
            const { name, surname, login, email, password, dob } = req.body
            const lowerCaseLogin = login.toLowerCase();
            const userLogin = await db.User.findOne({ where: { login: lowerCaseLogin } })
            if (!userLogin) {
                return res.status(400).json({ message: `Access denied. Not found user Login: ${login}` })
            }
            const hashPassword = bcrypt.hashSync(password, 5);
            await db.User.update(
                { name, surname, login, email, password: hashPassword, dob },
                { where: { email } }
            );
            res.status(200).json({ name, surname, login, email, password: hashPassword, dob })
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
export default new UserController()



// static/097c2649d42f5d81f4e955c2039f9154
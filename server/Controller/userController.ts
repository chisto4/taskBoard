const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator')
const authToken = require('../middleware/authMiddleware')
const db = require('../db/models/index')
import { Request, Response, NextFunction } from 'express';
import { TokenUserType } from '../types/type';

const regularEmail = require('../middleware/regularConstant')

class UserController {

    async registrationUser(req: Request, res: Response) {
        const { name, surname, login, email, password, dob, avatarId } = req.body
        const lowerCaseEmail = email.toLowerCase();
        const userEmail = await db.User.findOne({ where: { email: lowerCaseEmail } })
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: "Error Registration Middleware", errors })
            }
            if (userEmail) {
                return res.status(400).json({ message: 'This E-mail is already registered' })
            }
            if (!regularEmail.test(String(email).toLowerCase())) return res.status(400).json({ message: 'Not format e-mail - correct yor input e-mail' });
            const lowerCaseLogin = login.toLowerCase();
            const loginUser = await db.User.findOne({ where: { login: lowerCaseLogin } })
            if (loginUser) {
                return res.status(400).json({ message: 'This login is already registered'})
            }
            const hashPassword = bcrypt.hashSync(password, 5);
            let newUser = await db.User.create(
                { name, surname, login: lowerCaseLogin, email: lowerCaseEmail, password: hashPassword, dob, avatarId }
            )
            newUser = newUser.toJSON();
            delete newUser.password;
            const token = authToken.genAccessToken(newUser.id, newUser.email)
            return res.status(200).json({ token, newUser })
        }
        catch (e) {
            res.status(500).json(e)
            console.log(e.message)
        }
    }

    async loginUser(req: Request, res: Response) {
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
                return res.status(400).json({ message: "Error Login Middleware", errors })
            }
            if (!userLogin) {
                return res.status(401).json({ message: `Not found ${login}` })
            }
            const validPassword = bcrypt.compareSync(password, userLogin.password)
            if (!validPassword) {
                return res.status(402).json({ message: "Bad password! Try again" })
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

    async uploadAvatar(req: Request, res: Response) {
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

    async tokenUser(req: TokenUserType, res: Response) {
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
            res.status(400).json({ message: 'Token FAIL Error' })
        }
    }

    async getUsers(req: TokenUserType, res: Response) {
        try {
            const { id } = req.user
            if (!id) {
                return res.status(400).json({ message: "ID not use" })
            }
            const users = await db.User.findAll({
                include: [
                    {
                        model: db.Images,
                        attributes: ['pathImages']
                    }
                ],
                attributes: ['id', 'name', 'surname', 'login', 'email', 'dob', 'avatarId']
            });
            res.status(200).json(users);
        }
        catch (e) {
            console.log(e);
            res.status(400).json({ message: "Fail Get User's" })

        }
    }

    async getOneUser(req, res) {
        try {
            const {id} = req.params
            if (!id) {
                throw res.status(400).json('Not found user ID')
            }
            const getUser = await db.User.findOne({
                where: { id }, raw: true,
                attributes: ['id', 'name', 'surname', 'login', 'email', 'dob', 'avatarId']
            });
            res.status(200).json(getUser)
        }
        catch (e) {
            res.status(400).json({ message: "User ID not Found!" })
            console.log(e);
            console.log('User ID not found')
        }
    }

    async updateUser(req: TokenUserType, res: Response) {
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
        }

        catch (e) {
            res.status(400).json({ message: "User information not update error!" })
            console.log(e);
            console.log('User information not update error')
        }
    }


    async updateEmail(req, res) {
        const { id } = req.user
        const { email, surname, password, login } = req.body
        const lowerCaseEmail = email.toLowerCase();

        try {
            const validEmail = await db.User.findOne({ where: { email: lowerCaseEmail } })
            if (!id) {
                return res.status(400).json({ message: "ID token not use" })
            } else{
                const userPasswordDb = await db.User.findOne({ where: { id: id } })
                console.log('USER BY ID', userPasswordDb)
                const validPassword = bcrypt.compareSync(surname, userPasswordDb.password)
                console.log('USER BY ID', validPassword)
                if (!validPassword) {
                    return res.status(402).json({ message: "Invalided old password! Try again" })
                }
            }

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
        }
        catch (e) {
            console.log(e);
            console.log('User Email not update error')
            return res.status(400).json({ message: "User Email not update error" })
        }
    }

    async deleteUser(req, res) {
        try {
            const id = req.params.id
            const users = await db.User.destroy({ where: { id } });
            res.json(users)
        }
        catch (e) {
            console.log(e);
            console.log('User not found. Try again')
        }
    }
}
// export default new UserController()
module.exports = new UserController()


import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import {validationResult} from 'express-validator'
import { v4 as uuidv4 } from 'uuid';
import {genAccessToken} from '../middleware/authMiddleware.js'

import user from '../database/models/user.js'
import regularEmail from '../middleware/regularConstant.js'

export const secretKey = 'q1w2e3r4'

class UserController{
    async registrationUser(req, res){
        const {name, surname, login, email, password, dob} = req.body
        const lowerCaseEmail = email.toLowerCase();
        const userEmail = await user.findOne({where:{email: lowerCaseEmail}})
        try{
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({message: "Error Registration" ,errors})
            }
            if(userEmail){
                return res.status(400).json({message:'This email is alredy registrated'})
            }
                if(!regularEmail.test(String(email).toLowerCase())) return res.status(400).json({message:'Not format e-mail - coorrect yor input e-mail'});
            const lowerCaseLogin = login.toLowerCase();
            const loginUser = await user.findOne({where:{login: lowerCaseLogin}})
            if(loginUser){
                return res.status(400).json({message:'This login is alredy registrated'})
            }
            const hashPassword = bcrypt.hashSync(password, 5);
            let newUser = await user.create(
                {name, surname, login:lowerCaseLogin, email:lowerCaseEmail, password:hashPassword, dob}
            )
                newUser = newUser.toJSON();
                delete newUser.password;
                const token = genAccessToken(newUser.id, newUser.email)
                // console.log('test token content', userLogin.id, userLogin.email)
                // return res.json({token})
                console.log({token, newUser})
            return res.status(200).json({token, newUser})    
        }
        catch(e){
            res.status(500).json(e)
            console.log(e.message)
        }
    }


    async loginUser(req, res){
        try{
            const {login, password} = req.body
            const lowerCaseLogin = login.toLowerCase();
            let userLogin = await user.findOne({where:{login: lowerCaseLogin}})
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({message: "Error Registration" ,errors})
            }
            if(!userLogin){
                return res.status(400).json({message:`Not found ${login}`})
            }
            const validPassword = bcrypt.compareSync(password, userLogin.password)
            if(!validPassword){
                return res.status(400).json({message:"Bad password! Try again"})
            }
            userLogin = userLogin.toJSON();
            delete userLogin.password;
            const token = genAccessToken(userLogin.id, userLogin.email)
            console.log('test token content', userLogin.id, userLogin.email)
            return res.json({token, userLogin})
} catch (e){
    console.log(e)
    res.status(400).json({message:'Login fail error'})
    }
}


async tokenUser(req, res){
    try{
        const {id} = req.user
        if(!id){
            return res.status(400).json({message: "ID not use"})
        }
        const userIdToken = await user.findAll({where:{id}, raw: true,
            attributes: ['id', 'name', 'surname', 'login', 'email', 'dob']
        })
        console.log(userIdToken)
        res.status(200).json(userIdToken)
} catch (e){
    console.log(e)
    res.status(400).json({message:'Token fail error'})
    }
}
    async getUsers(req, res) {
        try {
          const users = await user.findAll({raw: true,
        attributes: ['id', 'name', 'surname', 'login', 'email', 'dob']
        });
          console.log(users);
          res.status(200).json(users);
        }
        catch(e) {
          console.log(e);
        }
      }


    async getOneUser(req, res){
        try{
            const id = req.params.id
            if(!id){
                throw res.status(400).json('Not found user ID')
            }
            const getUser = await user.findAll({where:{id}, raw: true,
                attributes: ['id', 'name', 'surname', 'login', 'email', 'dob']
            });
            console.log(getUser)
            res.status(200).json(getUser)
        }
        catch(e) {
            console.log(e);
            console.log('User ID not found')
    }
}


    async updateUser(req, res){
        try{
            console.log(req.body)
        const {name, surname, login, email, password, dob} = req.body
        const lowerCaseEmail = email.toLowerCase();
        const userEmail = await user.findOne({where:{email: lowerCaseEmail}})
        if(!userEmail){
            return res.status(400).json({message:`Access denide. Not found user E-mail: ${email}`})
        }
        const hashPassword = bcrypt.hashSync(password, 5);
        await user.update({name, surname, login, email, password:hashPassword, dob},
            {where:{email}});
        res.status(200).json({name, surname, login, email, dob})
        console.log('User information updated success! Congratulations!')
    }
    catch(e) {
        console.log(e);
        console.log('User information not update error')
    }
    }


    async updateEmail(req, res){
        try{
        const {name, surname, login, email, password, dob} = req.body
        const lowerCaseLogin = login.toLowerCase();
        const userLogin = await user.findOne({where:{login: lowerCaseLogin}})
        if(!userLogin){
            return res.status(400).json({message:`Access denied. Not found user Login: ${login}`})
        }
        const hashPassword = bcrypt.hashSync(password, 5);
        await user.update({name, surname, login, email, password:hashPassword, dob},
            {where:{email}});
        res.status(200).json({name, surname, login, email, password:hashPassword, dob})
        console.log('User Email updated success! Congratulations!')
    }
    catch(e) {
        console.log(e);
        console.log('User Email not update error')
    }
    }


    async deleteUser(req, res){
        try{
        const id = req.params.id
        const users = await user.destroy({where:{id}});
        res.json(users)
        console.log('User delete')
        }
        catch {
            console.log(e);
            console.log('User not found. Try again')
        }
    }


    async uploadAvatar (req, res){
        try{
        const {file} = req.body.file
        const user = await user.findById(req.user.id);
        const avatarName = v4() + ".jpg";
        file.mv(config.get('staticPatch') + "\\" + avatarName)
        user.avatar = avatarName
        await user.save()
        return res.json({message: "Avatar was uploaded"})
        }
        catch(e) {
            console.log(e);
            return res.status(400).json({message: "Upload avatar error"})
        }
    }
}
export default new UserController()
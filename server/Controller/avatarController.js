import db from '../database/models/index.js'

class AvatarController {


  async getAvatarInfo(req, res) {
    try {
      const { id } = req.user
      if (!id) {
        return res.status(400).json({ message: "ID not use" })
      }
        const getUser = await db.User.findOne({
            where: { id }, raw: true,
            attributes: ['id', 'name', 'surname', 'login', 'email', 'dob', 'avatarId']
        });
        const avatarInfo = await db.Images.findOne({
          where: {id: getUser.avatarId}, raw: true,
          attributes: ['id', 'pathImages', 'userId']
      });
        console.log(avatarInfo)
        res.status(200).json(avatarInfo)
    }
    catch (e) {
        console.log(e);
        console.log('Avatar not found')
    }
  }
}

export default new AvatarController()

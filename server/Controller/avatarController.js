import db from '../database/models/index.js'

class AvatarController {
  async uploadAvatar(req, res) {
    try {
      const { id } = req.user
      if (!id) {
        return res.status(400).json({ message: "ID not use" })
      }
      const file = req.file;
      const way = req.file.path
      let avatarImage = await db.Images.create({
        pathImages: way, userId: id
      })
      await db.User.update({ avatarId: avatarImage.id }, { where: { id } })
      res.json({ message: "Avatar was uploaded", file, avatarImage })
    } catch (e) {
      console.log(e);
      res.json({ message: "Avatar was uploaded", message: e.message })
    }
  }

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

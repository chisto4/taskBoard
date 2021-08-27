import db from '../database/models/index.js'
import {v4} from 'uuid'
import path  from 'path';


class AvatarController {
  async uploadAvatar (req, res) {
    try {
    const { id } = req.user
    if (!id) {
      return res.status(400).json({ message: "ID not use" })
      }
    const file = req.file;
    const way = req.file.path
    const userIdToken = await db.User.findOne({
      where: { id }, raw: true,
      attributes: ['id']
      })
    let avatarImage = await db.Images.create({
      pathImages :way, userId: userIdToken.id
      }).catch(err => console.log(err));
    res.json({message: "Avatar was uploaded", file, avatarImage})
  } catch (e) {
    console.log(e);}
  }
}

export default new AvatarController()

    // 
    // const {img} = req.files
    // let fileName = v4() + ".jpg"
    // // img.mv(path.resolve(__dirname, '..', 'static', fileName))
    // const image = await db.Images.create({id, wayImages, userId, img: fileName});
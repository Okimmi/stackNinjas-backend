const { User } = require('../../models/user');
const {
  ctrlWrapper,
  updateImage,
  getImageFilename,
  httpError,
} = require('../../utils');

const updateAvatar = async (req, res, next) => {
  if (!req.file) {
    throw httpError({ status: 404, message: 'File is absent' });
  }

  const { path } = req.file;
  const { avatar, _id: id } = req.user;
  const imageFilename = getImageFilename(avatar);
  const { url: avatarURL } = await updateImage({
    path,
    imageFilename,
  });
  const result = await User.findByIdAndUpdate(id, { avatar: avatarURL });

  res.status(200).json({ avatar: result.avatar });
};

module.exports = ctrlWrapper(updateAvatar);

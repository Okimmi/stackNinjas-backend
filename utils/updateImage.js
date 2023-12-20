const fs = require('fs/promises');
const cloudinary = require('./cloudinary');

const updateImage = async ({ path, imageFilename }) => {
  const result = await cloudinary.uploader.upload(path, {
    public_id: imageFilename,
    folder: 'avatars',
    width: 200,
    height: 200,
    gravity: 'face',
    crop: 'thumb',
  });

  await fs.unlink(path);

  return result;
};

module.exports = updateImage;

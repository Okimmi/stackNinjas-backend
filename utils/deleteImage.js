const cloudinary = require('./cloudinary');

const { defaultAvatarsURL } = require('../constants');

const deleteImage = async (imageURL) => {
  if (imageURL === defaultAvatarsURL.contact) {
    return;
  }

  const imagePath = imageURL.split('/');
  const [filename] = imagePath[imagePath.length - 1].split('.');
  const fileDir = imagePath[imagePath.length - 2];

  await cloudinary.api.delete_resources([`${fileDir}/${filename}`], {
    type: 'upload',
    resource_type: 'image',
  });
};

module.exports = deleteImage;

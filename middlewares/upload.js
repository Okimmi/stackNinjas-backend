const multer = require('multer');
const path = require('path');
const { httpError } = require('../utils');

const destination = path.resolve('temp');

const storage = multer.diskStorage({
  destination,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const limits = {
  fileSize: 2 * 1024 * 1024,
};

const fileFilter = (req, file, cb) => {
  const extension = file.originalname.split('.').pop();
  const isValidExtension = ['jpg', 'jpeg', 'png'].includes(extension);
  if (!isValidExtension) {
    return cb(httpError({ status: 400, message: 'Invalid file extension' }));
  }
  cb(null, true);
};

const upload = multer({ storage, limits, fileFilter });

module.exports = upload;

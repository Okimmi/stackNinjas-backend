const getImageFilename = (url) => {
  if (!url) {
    return '';
  }

  const imagePath = url.split('/');
  const [filename] = imagePath[imagePath.length - 1].split('.');

  return filename;
};

module.exports = getImageFilename;

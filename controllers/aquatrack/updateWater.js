const { User } = require('../../models/user');
const { ctrlWrapper } = require('../../utils');

const updateWater = async (req, res, next) => {
  const { _id: id } = req.user;

  const result = await User.findByIdAndUpdate(id, req.body).select(
    'dailyWaterRequirement'
  );

  res.status(200).json(result);
};

module.exports = ctrlWrapper(updateWater);

const { User } = require("../models/user");

const getTelegramUsers = async () => {
  const result = await User.find(
    { chatId: { $ne: null } },
    "id name dailyWaterRequirement chatId"
  );

  return result;
};

module.exports = getTelegramUsers;

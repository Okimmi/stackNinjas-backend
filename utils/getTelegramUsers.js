const { User } = require("../models/user");

const getTelegramUsers = async () => {
  const result = await User.find(
    { chatId: { $exists: true, $nin: [null, ""] } },
    "id name dailyWaterRequirement chatId"
  );

  return result;
};

module.exports = getTelegramUsers;

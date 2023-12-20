const filterFieldsToUpdate = (data) => {
  const unset = {};
  const set = {};

  const keys = Object.keys(data);
  keys.forEach((key) => {
    data[key] === '' ? (unset[key] = 1) : (set[key] = data[key]);
  });

  return { set, unset };
};

module.exports = filterFieldsToUpdate;

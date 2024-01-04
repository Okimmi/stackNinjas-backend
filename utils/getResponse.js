const getResponse = ({ reqBody, result }) => {
  const response = {};
  const resKeys = Object.keys(reqBody);
  resKeys.forEach((key) => {
    response[key] = result[key];
  });

  return response;
};

module.exports = getResponse;

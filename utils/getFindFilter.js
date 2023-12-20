const getFindFilter = ({ owner, query }) => {
  const { page = 1, limit = 10, favorite } = query;
  const skip = (page - 1) * limit;
  const findFilter = { owner };

  if (favorite === 'false' || favorite === 'true') {
    findFilter.favorite = favorite;
  }

  return { skip, limit, findFilter };
};

module.exports = getFindFilter;

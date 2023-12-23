const getMatchByTimeStage = ({ year, month, owner }) => ({
  $match: {
    owner,
    time: {
      $gte: new Date(`${year}-${month}`),
      $lt: new Date(`${year}-${Number(month) + 1}`),
    },
  },
});

const getSortByTimeStage = () => ({
  $sort: {
    time: 1,
  },
});

const getGroupByDayStage = () => ({
  $group: {
    _id: {
      day: {
        $toString: {
          $dayOfMonth: '$time',
        },
      },
    },
    dailyWaterRequirement: {
      $last: '$dailyWaterRequirement',
    },
    time: {
      $last: '$time',
    },
    entries: {
      $push: '$amount',
    },
    entriesSum: {
      $sum: '$amount',
    },
  },
});

const getEntriesInfoStage = () => ({
  $project: {
    month: {
      $month: '$time',
    },
    dailyWaterRequirement: {
      $toString: {
        $divide: ['$dailyWaterRequirement', 1000],
      },
    },
    entriesQuantity: {
      $size: '$entries',
    },
    dailyProgress: {
      $toString: {
        $multiply: [
          {
            $divide: ['$entriesSum', '$dailyWaterRequirement'],
          },
          100,
        ],
      },
    },
  },
});

const getAddMonthNameStage = () => ({
  $project: {
    dailyProgress: 1,
    dailyWaterRequirement: 1,
    entriesQuantity: 1,
    month: {
      $switch: {
        branches: [
          {
            case: {
              $eq: ['$month', 1],
            },
            then: 'January',
          },
          {
            case: {
              $eq: ['$month', 2],
            },
            then: 'February',
          },
          {
            case: {
              $eq: ['$month', 3],
            },
            then: 'March',
          },
          {
            case: {
              $eq: ['$month', 4],
            },
            then: 'April',
          },
          {
            case: {
              $eq: ['$month', 5],
            },
            then: 'May',
          },
          {
            case: {
              $eq: ['$month', 6],
            },
            then: 'June',
          },
          {
            case: {
              $eq: ['$month', 7],
            },
            then: 'July',
          },
          {
            case: {
              $eq: ['$month', 8],
            },
            then: 'August',
          },
          {
            case: {
              $eq: ['$month', 9],
            },
            then: 'September',
          },
          {
            case: {
              $eq: ['$month', 10],
            },
            then: 'October',
          },
          {
            case: {
              $eq: ['$month', 11],
            },
            then: 'November',
          },
          {
            case: {
              $eq: ['$month', 12],
            },
            then: 'December',
          },
        ],
        default: 'Invalid Month Number',
      },
    },
  },
});

const getAddDailyDataPostfixStage = () => ({
  $project: {
    date: {
      $concat: ['$_id.day', ', ', '$month'],
    },
    dailyWaterRequirement: { $concat: ['$dailyWaterRequirement', ' L'] },
    entriesQuantity: 1,
    dailyProgress: {
      $concat: ['$dailyProgress', '%'],
    },
  },
});

const getAddObjectIdStage = () => ({
  $addFields: {
    _id: {
      $toObjectId: {
        $concat: [
          '$_id.day',
          {
            $substr: [
              {
                $literal: '5ab9cbfa31c2ab715d42129e',
              },
              0,
              {
                $subtract: [
                  24,
                  {
                    $strLenCP: '$_id.day',
                  },
                ],
              },
            ],
          },
        ],
      },
    },
  },
});

module.exports = {
  getMatchByTimeStage,
  getSortByTimeStage,
  getGroupByDayStage,
  getEntriesInfoStage,
  getAddMonthNameStage,
  getAddDailyDataPostfixStage,
  getAddObjectIdStage,
};

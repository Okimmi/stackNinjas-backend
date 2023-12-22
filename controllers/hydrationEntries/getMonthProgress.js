const { ctrlWrapper } = require('../../utils');
const { HydrationEntry } = require('../../models/hydrationEntry');

const getMonthProgress = async (req, res, next) => {
  const { month, year } = req.query;
  const { _id: owner } = req.user;

  const result = await HydrationEntry.aggregate([
    {
      $match: {
        owner,
        time: {
          $gte: new Date(`${year}-${month}`),
          $lt: new Date(`${year}-${Number(month) + 1}`),
        },
      },
    },
    {
      $sort: {
        time: 1,
      },
    },
    {
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
    },
    {
      $project: {
        month: {
          $month: '$time',
        },
        dailyWaterRequirement: {
          $concat: [
            {
              $toString: {
                $divide: ['$dailyWaterRequirement', 1000],
              },
            },
            ' L',
          ],
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
    },
    {
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
    },
    {
      $project: {
        date: {
          $concat: ['$_id.day', ', ', '$month'],
        },
        dailyWaterRequirement: 1,
        entriesQuantity: 1,
        dailyProgress: {
          $concat: ['$dailyProgress', '%'],
        },
      },
    },
    {
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
    },
  ]);

  res.status(200).json(result);
};

module.exports = ctrlWrapper(getMonthProgress);

const express = require('express');
const { validateBody, authenticate } = require('../../middlewares');
const { dailyWaterRequirementSchema } = require('../../models/user');
const updateWater = require('../../controllers/aquatrack/updateWater');

const router = express.Router();

router.patch(
  '/daily-water-requirement',
  authenticate,
  validateBody(dailyWaterRequirementSchema),
  updateWater
);

module.exports = router;

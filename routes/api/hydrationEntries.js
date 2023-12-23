const express = require('express');
const { authenticate, validateBody, isValidId } = require('../../middlewares');
const {
  add,
  getById,
  updateById,
  deleteById,
  getProgress,
  getMonthProgress,
} = require('../../controllers/hydrationEntries');
const { addHydrationEntrySchema } = require('../../models/hydrationEntry');
const { notEmptyBodySchema } = require('../../schemas');

const router = express.Router();

router.use(authenticate);

router.post(
  '/',
  validateBody(notEmptyBodySchema),
  validateBody(addHydrationEntrySchema),
  add
);
router.get('/today', getProgress);
router.get('/month-progress', getMonthProgress);
router.get('/:entryId', isValidId, getById);
router.put(
  '/:entryId',
  isValidId,
  validateBody(notEmptyBodySchema),
  updateById
);
router.delete('/:entryId', isValidId, deleteById);

module.exports = router;

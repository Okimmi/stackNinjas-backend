const express = require('express');
const {
  signUp,
  signIn,
  signOut,
  current,
  updateAvatar,
  updateProfile,
} = require('../../controllers/auth');
const { validateBody, authenticate, upload } = require('../../middlewares');
const { signUpSchema, signInSchema } = require('../../models/user');
const { notEmptyBodySchema } = require('../../schemas');

const router = express.Router();

router.post(
  '/signup',
  validateBody(notEmptyBodySchema),
  validateBody(signUpSchema),
  signUp
);
router.post(
  '/signin',
  validateBody(notEmptyBodySchema),
  validateBody(signInSchema),
  signIn
);
router.post('/signout', authenticate, signOut);
router.get('/current', authenticate, current);
router.put(
  '/profile',
  authenticate,
  validateBody(notEmptyBodySchema),
  updateProfile
);
router.patch('/avatars', authenticate, upload.single('avatar'), updateAvatar);

module.exports = router;

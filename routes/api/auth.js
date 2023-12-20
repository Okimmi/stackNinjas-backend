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
const {
  signUpSchema,
  signInSchema,
  updateProfileSchema,
} = require('../../models/user');

const router = express.Router();

router.post(
  '/signup',
  upload.single('avatar'),
  validateBody(signUpSchema),
  signUp
);
router.post('/signin', validateBody(signInSchema), signIn);
router.post('/signout', authenticate, signOut);
router.get('/current', authenticate, current);
router.put(
  '/profile',
  authenticate,
  validateBody(updateProfileSchema),
  updateProfile
);
router.patch('/avatars', authenticate, upload.single('avatar'), updateAvatar);

module.exports = router;

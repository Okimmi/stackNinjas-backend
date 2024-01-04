const express = require('express');
const {
  signUp,
  signIn,
  signOut,
  current,
  updateAvatar,
  updateProfile,
  restorePassword,
  updatePassword,
} = require('../../controllers/auth');
const { validateBody, authenticate, upload } = require('../../middlewares');
const {
  signUpSchema,
  signInSchema,
  updateProfileSchema,
  updatePasswordSchema,
} = require('../../models/user');
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
router.patch(
  '/profile',
  authenticate,
  validateBody(updateProfileSchema),
  updateProfile
);
router.patch('/avatars', authenticate, upload.single('avatar'), updateAvatar);
router.post('/restore-password', restorePassword);
router.patch(
  '/restore-password/:restorePasswordToken',
  validateBody(updatePasswordSchema),
  updatePassword
);

module.exports = router;

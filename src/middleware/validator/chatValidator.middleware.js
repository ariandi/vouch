const { check } = require('express-validator');

exports.createUserSchema = [
  check('username')
      .exists()
      .withMessage('username is required')
      .isLength({ min: 3 })
      .withMessage('full_name Must be at least 3 chars long'),
  check('is_logged_in')
      .optional()
      .isNumeric()
      .withMessage('status Must be a number'),
];

exports.validateLogin = [
  check('username')
      .exists()
      .withMessage('Username is required'),
  check('room_chat_id')
      .exists()
      .withMessage('room_chat_id is required'),
];

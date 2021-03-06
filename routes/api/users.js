const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const commonPasswords = [
  'password',
  '123456789',
  'picture1',
  '12345678',
  '1234567890',
  'Million2',
  'password1',
  'qwertyuiop',
  '1q2w3e4r',
  'iloveyou',
  'ihateyou',
  'ifuckyou',
  'ifuckher'
];

// User model
const User = require('../../models/User');

// @route      POST api/users
// @desc       Register Route
// @access     Public
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password')
      .not()
      .isIn(commonPasswords)
      .withMessage('Do not use a common password')
      .isLength({ min: 8 })
      .withMessage('Password must be 8+ Characters Long')
      .matches(/\d/)
      .withMessage('Must contain atleast one number')
      .matches(/[A-Z][a-z]/)
      .withMessage('Must contain atleast a Capital Letter')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // See if user exists
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      // Get user gravatar
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      });
      user = new User({
        name,
        email,
        avatar,
        password
      });

      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      // Return jsonwebtoken
      const payload = {
        user: {
          id: user.id
        }
      };
      jwt.sign(
        payload,
        config.get('jwtToken'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server error');
    }
  }
);

module.exports = router;

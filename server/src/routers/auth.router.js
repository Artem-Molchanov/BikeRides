/* eslint-disable no-undef */
const router = require('express').Router();
const { User } = require('../../db/models');
const { refresh } = require('../configs/cookiesConfig');
const bcrypt = require('bcrypt');
const generateToken = require('../utils/generateToken');

router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!(name && email && password)) {
			return res.status(400).json({ message: 'All fields must be provided.' });
		}
    const [user, isCreated] = await User.findOrCreate({
			where: { email },
			defaults: { email, name, password: await bcrypt.hash(password, 10) },
		});

    if (!isCreated) {
      return res
        .status(400)
        .json({ message: `User with email ${email} is already exists.` });
    }

    const plainUser = user.get({ plain: true });
    delete plainUser.password;

    const { accessToken, refreshToken } = generateToken({ user: plainUser });

    res
      .cookie('refreshToken', refreshToken, refresh)
      .json({ user: plainUser, accessToken });
    res.end();
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

router.post('/signin', async (req, res) => {
  console.log(1111);
  
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      return res.status(400).json({ message: 'All fields must be provided.' });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({
        message: `User with email - ${email} is not defined.`,
      });
    }
    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword) {
      return res.status(401).json({
        message: `Incorrect password.`,
      });
    }

    const plainUser = user.get({ plain: true });
    delete plainUser.password;
    const { accessToken, refreshToken } = generateToken({ user: plainUser });
    res
      .cookie('refreshToken', refreshToken, refresh)
      .json({ user: plainUser, accessToken });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

router.get('/signout', async (req, res) => {
  try {
    res.clearCookie('refreshToken').sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

module.exports = router;

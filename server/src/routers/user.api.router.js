const router = require('express').Router();
const { User, Channel, Subscription } = require('../../db/models');
const bcrypt = require('bcrypt');


router.get('/', async (req, res) => {
	try {
		const users = await User.findAll({
			attributes: { exclude: ['password'] },
		});
		res.json(users);
	} catch (error) {
		console.error(error);
		res.sendStatus(500);
	}
});


router.get('/:id', async (req, res) => {
	try {
		const user = await User.findByPk(req.params.id, {
			attributes: { exclude: ['password'] },
		});
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}
		res.json(user);
	} catch (error) {
		console.error(error);
		res.sendStatus(500);
	}
});


router.post('/', async (req, res) => {
	try {
		const { user_name, email, password } = req.body;
		if (!(user_name && email && password)) {
			return res.status(400).json({ message: 'All fields must be provided.' });
		}
		const hashedPassword = await bcrypt.hash(password, 10);
		const user = await User.create({
			user_name,
			email,
			password: hashedPassword,
		});
		const plainUser = user.get({ plain: true });
		delete plainUser.password;
		res.status(201).json(plainUser);
	} catch (error) {
		console.error(error);
		res.sendStatus(500);
	}
});


router.put('/:id', async (req, res) => {
	try {
		const { user_name, email, password } = req.body;
		const user = await User.findByPk(req.params.id);
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}
		if (user_name) user.user_name = user_name;
		if (email) user.email = email;
		if (password) user.password = await bcrypt.hash(password, 10);
		await user.save();
		const plainUser = user.get({ plain: true });
		delete plainUser.password;
		res.json(plainUser);
	} catch (error) {
		console.error(error);
		res.sendStatus(500);
	}
});


// router.delete('/:id', async (req, res) => {
// 	try {
// 		const user = await User.findByPk(req.params.id);
// 		if (!user) {
// 			return res.status(404).json({ message: 'User not found' });
// 		}
// 		const cart = await Cart.findOne({ where: { user_id: req.params.id } });
// 		if (cart) {
// 			await CartItem.destroy({ where: { cart_id: cart.id } });
// 			await cart.destroy();
// 		}
// 		await user.destroy();
// 		res.sendStatus(204);
// 	} catch (error) {
// 		console.error(error);
// 		res.sendStatus(500);
// 	}
// });

module.exports = router;

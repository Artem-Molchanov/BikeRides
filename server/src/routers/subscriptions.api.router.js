const router = require('express').Router();
const { Channel, User, Subscription } = require('../../db/models');
const { verifyAccessToken } = require('../middleWares/verifyToken');


router.get('/', verifyAccessToken, async (req, res) => {
	try {
		const subscriptions = await Subscription.findAll({
			where: { userId: res.locals.user.id },
			include: [
				{
					model: Channel,
					as: 'channel',
				},
			],
		});

		if (!subscriptions.length) {
			return res.status(404).json({ message: 'Подписки не найдены' });
		}

		res.json({ subscriptions });
	} catch (error) {
		console.error('Ошибка при получении данных подписки:', error);
		res.status(500).json({ message: 'Ошибка сервера' });
	}
});


router.post('/', verifyAccessToken, async (req, res) => {
	const { channelId } = req.body;
	const { user } = res.locals;

	try {
		let subscription = await Subscription.findOne({
			where: { userId: user.id, channelId },
		});

		if (subscription) {
			return res.status(400).json({ message: 'Подписка уже существует' });
		}

		const channel = await Channel.findByPk(channelId);
		if (!channel) {
			return res.status(404).json({ message: 'Канал не найден' });
		}

		subscription = await Subscription.create({
			userId: user.id,
			channelId,
		});

		// Увеличиваем счетчик подписчиков
		channel.subscriberCount += 1;
		await channel.save();

		res.status(201).json(subscription);
	} catch (error) {
		console.error('Ошибка при создании подписки:', error);
		res.status(500).json({ message: 'Ошибка сервера' });
	}
});


router.delete('/:id', verifyAccessToken, async (req, res) => {
	const channelId = req.params.id;
	const { user } = res.locals;

	try {
		const subscription = await Subscription.findOne({
			where: { userId: user.id, channelId },
		});

		if (!subscription) {
			return res.status(404).json({ message: 'Подписка не найдена' });
		}

		await subscription.destroy();

		// Уменьшаем счетчик подписчиков
		const channel = await Channel.findByPk(channelId);
		if (channel) {
			channel.subscriberCount -= 1;
			await channel.save();
		}

		res.status(200).json({ message: 'Подписка удалена' });
	} catch (error) {
		console.error('Ошибка при удалении подписки:', error);
		res.status(500).json({ message: 'Ошибка сервера' });
	}
});

module.exports = router;

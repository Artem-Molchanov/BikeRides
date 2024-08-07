const router = require('express').Router();
const { Score, User, Route } = require('../../db/models');
const { verifyAccessToken } = require('../middleWares/verifyToken');

router.get('/route/:routeId', async (req, res) => {
	try {
		const { routeId } = req.params;
		const scores = await Score.findAll({
			where: { routeId },
			include: [User],
		});
		res.json(scores);
	} catch (error) {
		res.status(500).json({ error: 'Server Error' });
	}
});

router.post('/', verifyAccessToken, async (req, res) => {
	try {
		const { routeId, point } = req.body;
		const newScore = await Score.create({
			routeId,
			userId: res.locals.user.id,
			point,
		});
		res.status(201).json(newScore);
	} catch (error) {
		res.status(500).json({ error: 'Server Error' });
	}
});

router.put('/:id', verifyAccessToken, async (req, res) => {
	try {
		const { id } = req.params;
		const { point } = req.body;
		const score = await Score.findByPk(id);

		if (score.userId !== res.locals.user.id) {
			return res.status(403).json({ error: 'Forbidden' });
		}

		await score.update({ point });
		res.json(score);
	} catch (error) {
		res.status(500).json({ error: 'Server Error' });
	}
});

router.delete('/:id', verifyAccessToken, async (req, res) => {
	try {
		const { id } = req.params;
		const score = await Score.findByPk(id);

		if (score.userId !== res.locals.user.id) {
			return res.status(403).json({ error: 'Forbidden' });
		}

		await score.destroy();
		res.json({ message: 'Score deleted' });
	} catch (error) {
		res.status(500).json({ error: 'Server Error' });
	}
});

module.exports = router;

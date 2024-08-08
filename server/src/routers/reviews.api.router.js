const router = require('express').Router();
const { Review, User, Route } = require('../../db/models');
const { verifyAccessToken } = require('../middleWares/verifyToken');


router.get('/route/:routeId', async (req, res) => {
	try {
		const { routeId } = req.params;
		const reviews = await Review.findAll({
			where: { routeId },
			include: [User], 
		});
		res.json(reviews);
	} catch (error) {
		res.status(500).json({ error: 'Server Error' });
	}
});


router.post('/:id', verifyAccessToken, async (req, res) => {
	try {
		const { id } = req.params;
		const { routeId, description } = req.body;
		
		
		const newReview = await Review.create({
			routeId: id,
			userId: res.locals.user.id, 
			description,
		});
		res.status(201).json(newReview);
	} catch (error) {
		res.status(500).json({ error: 'Server Error' });
	}
});


router.put('/:id', verifyAccessToken, async (req, res) => {
	try {
		const { id } = req.params;
		const { text } = req.body;
		const review = await Review.findByPk(id);

		if (review.userId !== res.locals.user.id) {
			return res.status(403).json({ error: 'Forbidden' });
		}

		await review.update({ text });
		res.json(review);
	} catch (error) {
		res.status(500).json({ error: 'Server Error' });
	}
});


router.delete('/:id', verifyAccessToken, async (req, res) => {
	try {
		const { id } = req.params;
		const review = await Review.findByPk(id);

		if (review.userId !== res.locals.user.id) {
			return res.status(403).json({ error: 'Forbidden' });
		}

		await review.destroy();
		res.json({ message: 'Review deleted' });
	} catch (error) {
		res.status(500).json({ error: 'Server Error' });
	}
});

module.exports = router;

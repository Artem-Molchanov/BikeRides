const router = require('express').Router();
const { Review, User, Route, Score } = require('../../db/models');
const { verifyAccessToken } = require('../middleWares/verifyToken');


router.get('/', async (req, res) => {
	try {
		const allReviews = await Review.findAll();
		res.json(allReviews);
	} catch (error) {
		res.status(500).json({ error: 'Server Error' });
	}
});

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
	console.log(111);
	
	
	try {
		const { id } = req.params;
		const { routeId, description, point } = req.body;
		const newScore = await Score.create({
			routeId: id,
			userId: res.locals.user.id,
			point,
		});
		
		
		const newReview = await Review.create({
			routeId: id,
			userId: res.locals.user.id, 
			description,
		});

		const allReviews = await Review.findAll()
		res.status(201).json(allReviews);
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
		const allReviews = await Review.findAll();
		res.json(allReviews);
	} catch (error) {
		res.status(500).json({ error: 'Server Error' });
	}
});

module.exports = router;

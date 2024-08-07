const router = require('express').Router();
const { Channel } = require('../../db/models');
const { verifyAccessToken } = require('../middleWares/verifyToken');

router.get('/', async (req, res) => {
	try {
		const channels = await Channel.findAll();
		res.json(channels);
	} catch (error) {
		console.error(error);
		res.sendStatus(400);
	}
});




module.exports = router;

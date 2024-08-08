const router = require('express').Router();
const { Route, User } = require('../../db/models');
const { verifyAccessToken } = require('../middleWares/verifyToken');

router.get('/', async (req, res) => {
	try {
		const routes = await Route.findAll({
			include: [User], 
		});
		res.json(routes);
	} catch (error) {
		res.status(500).json({ error: 'Server Error' });
	}
});


router.post('/', verifyAccessToken, async (req, res) => {
	try {
		const { name, info, coordinates, routeLength, locality } = req.body;
		const newRoute = await Route.create({
			name,
			info,
			coordinates,
			routeLength,
			locality,
			userId: res.locals.user.id, 
		});
		res.status(201).json(newRoute);
	} catch (error) {
		res.status(500).json({ error: 'Server Error' });
	}
});


router.put('/:id', verifyAccessToken, async (req, res) => {
	try {
		const { id } = req.params;
		const { name, info, coordinates, routeLength, locality } = req.body;
		const route = await Route.findByPk(id);

		if (route.userId !== res.locals.user.id) {
			return res.status(403).json({ error: 'Forbidden' });
		}

		await route.update({ name, info, coordinates, routeLength, locality });
		res.json(route);
	} catch (error) {
		res.status(500).json({ error: 'Server Error' });
	}
});


router.delete('/:id', verifyAccessToken, async (req, res) => {
	
	try {
		const { id } = req.params;
		const route = await Route.findByPk(id);
console.log(id);

		if (route.userId !== res.locals.user.id) {
			return res.status(403).json({ error: 'Forbidden' });
		}

		await route.destroy();
		res.json({ message: 'Route deleted' });
	} catch (error) {
		res.status(500).json({ error: 'Server Error' });
	}
});



router.get('/:id/coordinates', async (req, res) => {
	try {
		const { id } = req.params;
		const route = await Route.findByPk(id, {
			attributes: ['coordinates'],
		});

		if (!route) {
			return res.status(404).json({ error: 'Маршрут не найден' });
		}

		res.json(route.coordinates);
	} catch (error) {
		res.status(500).json({ error: 'Server Error' });
	}
});

module.exports = router;

/* eslint-disable no-undef */
const router = require("express").Router();
const { User, Route } = require("../../db/models");
const { verifyAccessToken } = require("../middleWares/verifyToken");

router.get("/", async (req, res) => {
  
  try {
    const routes = await Route.findAll();
    res.json(routes);
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
});

router.get("/allUsers", async (req, res) => {
  
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
});

router.post("/", verifyAccessToken, async (req, res) => {
  const { name, info, routeLength, locality, coordinates } = req.body;
  const { user } = res.locals;

  try {
    if (name && info && routeLength && locality) {
      console.log(11111, user.id);
      
      const track = await Route.create({
        name,
        info,
        coordinates,
        routeLength: +routeLength,
        locality,
        userId: user.id,
      });
      const allRoutes = await Route.findAll()
      res.json(allRoutes);
    } else {
      res.status(400).json({ message: "Не все поля заполнены данными." });
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
});

// router.get("/account",  verifyAccessToken, async (req, res) => {
//   const { user } = res.locals;
  
//   try {
//     const subscription = await Subscription.findAll({
//       where:{
//         user_id: user.id,
//       }
      
//     });
//     res.json(subscription);
//   } catch (error) {
//     console.error(error);
//     res.sendStatus(400);
//   }
// });

module.exports = router;

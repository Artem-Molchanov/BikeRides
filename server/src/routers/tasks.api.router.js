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


//TODO - ручка на получение одной записи по параметру 
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const unSanitaizedTask = await Channel.findByPk(id);
    const task = unSanitaizedTask.get({ plain: true });
    res.json();
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
});

router.post('/', verifyAccessToken, async (req, res) => {
  const { title, text } = req.body;
  const { user } = res.locals;
  try {
    if (title && text) {
      const task = await Task.create({ title, text, user_id: user.id });
      res.json(task);
    } else {
      res.status(400).json({ message: 'Not all fields filled with data' });
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
});



//TODO - ручка на редактирование одной записи по параметру 
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;
    const updatedTask = await Channel.update({ text }, { where: { id } });
    console.log(updatedTask);
    if (updatedTask[0] !== 0) {
      res.status(200).json({ message: 'Task successfully updated' });
    } else {
      res.status(400).json({ message: `No task with id: ${id}` });
    }
    res.end();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.delete('/:id', verifyAccessToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = res.locals;
    const task = await Task.findByPk(id);
    if (task.user_id === user.id) {
      task.destroy();
      res.sendStatus(200);
    } else {
      res.status(400).json({ message: 'Haven`t rights to delete this entry' });
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

module.exports = router;

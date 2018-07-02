const express = require('express');
const router = express.Router();
const Poll = require('../models/poll.model');
const passport = require('passport');

router.get('/', async (req, res) => {
  try {
    const polls = await Poll.find({});
    return res.json(polls);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

router.get('/user', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const polls = await Poll.find({ 'user': req.user.id });
    return res.json(polls);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);
    return res.json(poll);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

router.delete('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    await Poll.deleteOne({ '_id': req.params.id, 'user': req.user.id });
    res.sendStatus(204);
  }
  catch (error) {
    res.status(500).json({ error: error });
  }
});

router.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    let poll = new Poll({
      title: req.body.title,
      options: req.body.options,
      user: req.user._id,
      endDate: req.body.endDate
    });
    poll = await poll.save();
    res.json(poll);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

// voting route
router.post('/:id/vote/:optionId', async (req, res) => {

  const ip = req.header('x-forwarded-for') || req.connection.remoteAddress;

  try {
    const poll = await Poll.findById(req.params.id);
    if (poll.voteIPs.indexOf(ip) > -1) {
      res.status(400).json({ error: 'already voted' });
    } else if (poll.endDate.getTime() < new Date().getTime()) {
      res.status(400).json({ error: 'voting is over!' });

    } else {
      poll.voteIPs.push(ip);
      const optionId = req.params.optionId;
      let options = poll.options;
      options[optionId].score += 1;
      try {
        await poll.save();
        return res.json(poll);
      }
      catch (err) {
        return res.status(500).json({ error: err });
      }
    }
  } catch (error) {
    console.log(err)
    res.status(500).json({ error: err });
  }
});

// add option route
router.post('/:id/options', async (req, res) => {

  try {
    let poll = await Poll.findById(req.params.id);
    poll.options.push({
      option: req.body.option,
      score: 0,
    });

    try {
      poll = await poll.save();
      return res.json(poll);
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// delete option route
router.delete('/:id/options/:optionId', async (req, res) => {

  try {
    let poll = await Poll.findById(req.params.id);
    const optionId = req.params.optionId;
    let options = poll.options;
    poll.options = options.filter((option) => {
      return option._id != optionId;
    });
    try {
      await poll.save()
      return res.sendStatus(204);
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

module.exports = router;
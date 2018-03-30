const express = require('express');
const router = express.Router();
const Poll = require('../models/poll.model');

router.get('/', function (req, res) {
  Poll.find({}, (error, polls) => {
    if (error) {
      return res
        .status(500)
        .json({ error: error });
    }
    return res.json(polls);
  });
});

router.get('/:id', function (req, res) {
  Poll.findById(req.params.id, (error, poll) => {
    if (error) {
      return res
        .status(500)
        .json({ error: error });
    }
    return res.json(poll);

  });
});

router.delete('/:id', function (req, res) {
  Poll.deleteOne({'_id' : req.params.id}, (error) => {
    if (error) {
      res
        .status(500)
        .json({ error: error });
    }
    res.sendStatus(204);
  });
});

// define the about route
router.post('/', function (req, res) {

  let poll = new Poll({
    title: req.body.title,
    options: req.body.options,
    user: req.body.user,
    endDate: req.body.endDate
  });
  poll.save((err) => {
    if (err) {
      res.status(500).json({ error: err });
    }
    res.json(poll);

  })
});

// voting route
router.post('/:id/vote/:optionId', function (req, res) {

  Poll.findById(req.params.id, (err, poll) => {
    if (err) {
      res.status(500).json({ error: err });
    }

    const optionId = req.params.optionId;
    let options = poll.options;
    options[optionId].score += 1;

    poll.save((err) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      return res.json(poll);
    });
  });
});


// add option route
router.post('/:id/options', function (req, res) {

  Poll.findById(req.params.id, (err, poll) => {
    if (err) {
      res.status(500).json({ error: err });
    }

    let options = poll.options;
    options.push(
      {
        option: req.body.option,
        score: 0,
      });

    poll.save((err) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      return res.json(poll);
    });
  });
});

// delete option route
router.delete('/:id/options/:optionId', function (req, res) {

  Poll.findById(req.params.id, (err, poll) => {
    if (err) {
      res.status(500).json({ error: err });
    }

    const optionId = req.params.optionId;
    let options = poll.options;
    poll.options = options.filter((option) => {
      return option._id != optionId;
    });

    poll.save((err) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      return res.sendStatus(204);
    });
  });
});


module.exports = router;
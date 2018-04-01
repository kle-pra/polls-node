const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register', (req, res) => {

  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    req.status(500).json({ success: false, msg: 'Missing credentials!' });
  }

  const user = new User({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 8)
  });

  user.save((error) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ success: false, msg: 'Not valid. Try different username.' });
    }
    return res.json({ success: true, msg: 'You are registered with username: ' + req.body.username });
  })
});

module.exports = router;

router.post('/login', (req, res) => {

  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    req.status(500).json({ success: false, msg: 'Missing credentials!' });
  }
  User.findOne({ username: username }, (error, user) => {

    if (error) {
      res.status(500).json({ success: false, msg: error });

    } else if (user == null) {
      res.status(500).json({ success: false, msg: 'Wrong username/passwords' });
    }
    // check password  and return succes json with token if ok
    else if (bcrypt.compareSync(req.body.password, user.password)) {
      const token = jwt.sign({ data: user }, 's3cr3t', {
        expiresIn: 604800 // 1 week
      });
      res.json({
        success: true,
        token: 'JWT ' + token,
        user: {
          id: user._id,
          name: user.name,
          username: user.username,
          email: user.email
        }
      })
    } else {
      res.status(401).json({ success: false, msg: 'Wrong email/password.' });
    }
  });
});

module.exports = router;
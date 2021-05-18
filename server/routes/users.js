const express = require('express');
const User = require('../models/User');

const router = express.Router();

router.get('/:email', async (req, res) => {
  const user = await User.findOne({ email: req.params.email });

  // findOne will return the found user object or null
  if (user) {
    res.send(user);
  } else {
    res.status(404).send('User not found');
  }
});

router.post('/', async (req, res) => {
  // create will try to create a new user, but can throw an error if there is already an user with the same email (unique param in the schema)
  try {
    const user = await User.create({ email: req.body.email });
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;

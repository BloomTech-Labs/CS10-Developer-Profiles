const express = require('express');
const stripe = require('../stripe/stripe');

const router = express.Router();

router.get('/', (req, res) => res.send({ Message: 'Stripe endpoint', timestamp: new Date().toISOString() }));

module.exports = router;

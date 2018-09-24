const express = require('express');
const stripe = require('../stripe/stripe');
const { postStripeCharge } = require('../stripe/utils');

const router = express.Router();

router.get('/', (req, res) => res.send({ Message: 'Stripe endpoint', timestamp: new Date().toISOString() }));

/**
 * Endpoint in charge to process Frontend payment throught the Stripe API
 */
router.post('/', (req, res) => stripe.charges.create(req.body, postStripeCharge(res)));

module.exports = router;

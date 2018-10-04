const express = require('express');
const stripe = require('../stripe/stripe');
const { postStripeCharge } = require('../stripe/utils');
const { userHasToken } = require('../../api/middleware/authentication');
const { sendRes } = require('../../api/utils/apiResponses');

/**
 * Stripe Payment endpoint
 *
 * The endpoint in charge to process Frontend payment through the Stripe API
 */
const router = express.Router();

router
  .post('/', (req, res) => {
    stripe.charges.create(req.body, postStripeCharge(res));
  })
  .get('/', userHasToken, (req, res) => {
    sendRes(res, '200', {
      Message: 'Stripe endpoint',
      timestamp: new Date().toISOString(),
    });
  });

module.exports = router;

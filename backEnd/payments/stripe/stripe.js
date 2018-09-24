require('dotenv').config();
const configureStripe = require('stripe');

const { STRIPE_TEST, STRIPE_PRODUCTION } = process.env;

const STRIPE_SECRET_KEY = process.env.NODE_ENV === 'production' ? STRIPE_PRODUCTION : STRIPE_TEST;

const stripe = configureStripe(STRIPE_SECRET_KEY);

module.exports = stripe;

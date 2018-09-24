require('dotenv').config();
const configureStripe = require('stripe');

const { STRIPE_BACKEND_SECRET_KEY_TEST, STRIPE_BACKEND_SECRET_KEY_PRODUCTION } = process.env;

const STRIPE_SECRET_KEY = {
  production: STRIPE_BACKEND_SECRET_KEY_PRODUCTION,
  development: STRIPE_BACKEND_SECRET_KEY_TEST,
}[process.env.NODE_ENV];

const stripe = configureStripe(STRIPE_SECRET_KEY);

module.exports = stripe;

import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const {
  REACT_APP_STRIPE_CURRENCY,
  REACT_APP_STRIPE_PUBLIC_KEY_TEST,
  REACT_APP_STRIPE_PUBLIC_KEY_PRODUCTION,
} = process.env;

const PAYMENT_SERVER_URL = '/payments/stripe/';
const STRIPE_PUBLISHABLE =
  process.env.NODE_ENV === 'production' ? REACT_APP_STRIPE_PUBLIC_KEY_PRODUCTION : REACT_APP_STRIPE_PUBLIC_KEY_TEST;

/**
 * Convert a float number to an Integer.
 *
 * @description Stripe API requires the amount/price to process to be an Integer number.
 * @param {number} amount - Monetary quantity to process.
 * @return {number} An integer representing the total quantity to process.
 * @example
 * fromRawAmountToCent( 19,99 ) will return '1999'
 */
const fromRawAmountToCent = amount => Math.floor(amount * 100);

/**
 * Action to perfome in transaction success.
 *
 * @param {object} data - The axios response object.
 */
const successPayment = data => {
  alert('Payment Successful');
};

/**
 * Action to perfome in transaction error.
 *
 * @param {object} data - The axios response object.
 */
const errorPayment = data => {
  alert('Payment Error');
};

/**
 * Process payment in Stripe API.
 *
 * @function onToken
 * @param {!number} amount - Payment's total amount to process.
 * @param {string} description - Product description.
 * @return {funtion(string):void} - Callback
 */
/**
 * Callback which process the payment through Stripe API
 *
 * @callback anonymous function
 * @param {object} token - Token generated after processesing the credit card details in Stripe API.
 */
const onToken = (amount, description) => token =>
  axios
    .post(
      PAYMENT_SERVER_URL,
      {
        description,
        source: token.id,
        currency: REACT_APP_STRIPE_CURRENCY,
        amount: fromRawAmountToCent(amount),
      },
      {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      }
    )
    .then(successPayment)
    .catch(errorPayment);

/**
 * React Component constructore.
 *
 * @prop {string} name - Product name.
 * @prop {string} description - Product description.
 * @prop {!number} amount - Product price.
 * @return {object}
 */
const Checkout = ({ name, description, amount }) => (
  <StripeCheckout
    name={name}
    description={description}
    amount={fromRawAmountToCent(amount)}
    token={onToken(amount, description)}
    currency={REACT_APP_STRIPE_CURRENCY}
    stripeKey={STRIPE_PUBLISHABLE}
  />
);

export default Checkout;

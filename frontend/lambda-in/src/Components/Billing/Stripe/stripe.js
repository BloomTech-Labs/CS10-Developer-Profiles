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

const fromRawAmountToCent = amount => Math.floor(amount * 100);

const successPayment = data => {
  alert('Payment Successful');
};

const errorPayment = data => {
  alert('Payment Error');
};

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

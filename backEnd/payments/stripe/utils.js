module.exports = {
  postStripeCharge(res) {
    return (stripeErr, stripeRes) => {
      if (stripeErr) {
        console.log({ STRIPE: { Error: stripeErr } });
        res.status(500).send({ Error: stripeErr });
      } else {
        console.log('STRIPE: Payment procesed');
        res.status(200).send({ Success: stripeRes });
      }
    };
  },
};

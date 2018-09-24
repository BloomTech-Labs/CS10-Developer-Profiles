module.exports = {
  postStripeCharge(res) {
    return (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).send({ Error: stripeErr });
      } else {
        res.status(200).send({ Success: stripeRes });
      }
    };
  },
};

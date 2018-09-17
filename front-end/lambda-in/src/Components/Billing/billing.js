import React from 'react';
import Checkout from './Stripe/stripe';

class Billing extends React.Component {
    render() {
        return (
            <div>
                <Checkout />
            </div>
        )
    }
}

export default Billing;
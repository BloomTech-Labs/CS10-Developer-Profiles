import React from 'react';
import Checkout from './Stripe/stripe';
import NavBar from '../../Components/Navbar/navbar';
import RadioButtonsGroup from './Radio Buttons/radio-buttons'

class Billing extends React.Component {
    render() {
        return (
            <div>
                <NavBar />
                <RadioButtonsGroup />
                <Checkout />
            </div>
        )
    }
}

export default Billing;
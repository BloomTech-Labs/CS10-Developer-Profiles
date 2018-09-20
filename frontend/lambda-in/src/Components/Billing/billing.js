import React from 'react';
import Checkout from './Stripe/stripe';
import NavBar from '../../Components/Navbar/navbar';
//import RadioButtonsGroup from './Radio Buttons/radio-buttons'
import './billing.css';

class Billing extends React.Component {
    render() {
        return (
            <div>
                <NavBar />
                <div className='checkout'>
                    <div className='text'>
                        <p>1 month - $9.99</p>
                        <p>3 months - $19.99</p>
                        <p>6 months - $29.99</p>
                    </div>
                    <div className='buttons'>
                        <Checkout className='option'
                        name={'Subscription Fee'}
                        description={'1 month'}
                        amount={9.99}
                        />
                        <Checkout className='option'
                        name={'Subscription Fee'}
                        description={'3 months'}
                        amount={19.99}
                        />
                        <Checkout className='option'
                        name={'Subscription Fee'}
                        description={'6 months'}
                        amount={29.99}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default Billing;
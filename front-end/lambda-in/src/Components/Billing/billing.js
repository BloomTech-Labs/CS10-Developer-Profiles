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
                        <p className='option'>1 month - $9.99</p>
                        <p className='option'>3 months - $19.99</p>
                        <p className='option'>6 months - $29.99</p>
                    </div>
                    <div className='buttons'>
                        <Checkout className='sub'
                        name={'Subscription Fee'}
                        description={'1 month'}
                        amount={9.99}
                        />
                        <Checkout className='sub'
                        name={'Subscription Fee'}
                        description={'3 months'}
                        amount={19.99}
                        />
                        <Checkout className='sub'
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
import React from 'react';
import Checkout from './Stripe/stripe';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
//import RadioButtonsGroup from './Radio Buttons/radio-buttons'
import './billing.css';

import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init();

class Billing extends React.Component {
    render() {
        return (
            <div>
                <h1 className='title'>Join our guild of talented developers and reputable employers!</h1>
                <div className='container'>
                <Card data-aos='flip-up' className='checkout'>
                <CardContent>
                    <Typography variant="headline" component="h1">
                        Employer 1 month Sub
                    </Typography>
                    <Typography>
                        $3.99
                    </Typography>
                    <Checkout 
                        name={'Employer 1 month Subscription'}
                        description={'Employer 1 month fee'}
                        amount={3.99}
                        />
                </CardContent>
                </Card>
                <Card data-aos='flip-down' className='checkout'>
                <CardContent>
                    <Typography variant="headline" component="h1">
                        Employer 6 month Sub
                    </Typography>
                    <Typography>
                        $9.99 - Save $2.32/month
                    </Typography>
                    <Checkout 
                        name={'Employer 6 month Subscription'}
                        description={'Employer 6 month fee'}
                        amount={9.99}
                        />
                </CardContent>
                </Card>
                <Card data-aos='flip-up' className='checkout'>
                <CardContent>
                    <Typography variant="headline" component="h1">
                        Employer 1 Year Sub
                    </Typography>
                    <Typography>
                        $15.99 - Save $2.62/month
                    </Typography>
                    <Checkout 
                        name={'Employer 1 year subscription'}
                        description={'Employer 1 year fee'}
                        amount={15.99}
                        />
                </CardContent>
                </Card>
                {/*<div className='checkout'>
                    <div className='text'>
                        <p>1 month - $9.99</p>
                        <p>3 months - $19.99</p>
                        <p>6 months - $29.99</p>
                    </div>
                    <div className='buttons'>
                        <Checkout 
                        name={'Subscription Fee'}
                        description={'1 month'}
                        amount={9.99}
                        />
                        <Checkout 
                        name={'Subscription Fee'}
                        description={'3 months'}
                        amount={19.99}
                        />
                        <Checkout 
                        name={'Subscription Fee'}
                        description={'6 months'}
                        amount={29.99}
                        />
                    </div>
        </div>*/}
            </div>
        </div>
        )
    }
}

export default Billing;
import React from 'react';
import Checkout from './Stripe/stripe';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import billingImage from '../../static/images/billingImage.png';
//import RadioButtonsGroup from './Radio Buttons/radio-buttons'
import './billing.css';

import AOS from 'aos';
import 'aos/dist/aos.css';

const backgroundImage = {
    backgroundImage: `url(${billingImage})`,
  };

AOS.init();

class Billing extends React.Component {
    render() {
        return (
            <div>
                <div className='billingimage' style={backgroundImage}></div>
                <div className='checkoutcontainer'>
                    <span className='checkout1'>
                        <Card data-aos='flip-up'>
                            <CardContent align='center'>
                                 <Typography variant="headline" component="h1">
                                    Employer 1 month Sub
                                </Typography>
                                <Typography>
                                    $3.99
                                </Typography>
                                <Checkout align='center'
                                name={'Employer 1 month Subscription'}
                                description={'Employer 1 month fee'}
                                amount={3.99}
                                />
                            </CardContent>
                        </Card>
                    </span>
                    <span className='checkout2'>    
                        <Card data-aos='flip-down' className='checkout'>
                            <CardContent align='center'>
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
                    </span>
                    <span className='checkout3'>
                        <Card data-aos='flip-up' className='checkout'>
                            <CardContent align='center'>
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
                    </span>
                </div>
            </div>
        )
    }
}

export default Billing;
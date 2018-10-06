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
                <div className='billingimage' style={backgroundImage}>
                    <div className='question'>
                        <h1 className='questionheader'>Why should I subscribe and what does it pay for?</h1>
                        <br/>
                        <p>
                            Our developers are the cream of the crop and their time is valuable just like yours. Your subscription allows you to contact the developers within our database and further explore potential collaboration and or employment.
                        </p>
                    </div>
                </div>
                <div className='checkoutcontainer'>
                    <span className='checkout1'>
                        <Card data-aos='flip-up'>
                            <CardContent align='center'>
                                 <Typography variant="headline" component="h1">
                                    1 month Subscription
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
                                    6 month Subscription
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
                                    1 Year Subsciption
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
import React from 'react';
import Checkout from './Stripe/stripe';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
//import RadioButtonsGroup from './Radio Buttons/radio-buttons'
import './billing.css';

class Billing extends React.Component {
    render() {
        return (
            <div>
                <Card className='checkout'>
                <CardContent>
                    <Typography variant="headline" component="h1">
                        Developer Sign-Up Fee
                    </Typography>
                    <Typography>
                        $4.99 One time fee
                    </Typography>
                    <Checkout 
                        name={'Developer Sign-up Fee'}
                        description={'Developer Sign-up Fee'}
                        amount={4.99}
                        />
                </CardContent>
                </Card>
                <Card className='checkout'>
                <CardContent>
                    <Typography variant="headline" component="h1">
                        Employer 1 month Subscription
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
                <Card className='checkout'>
                <CardContent>
                    <Typography variant="headline" component="h1">
                        Employer 6 month Subscription
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
                <Card className='checkout'>
                <CardContent>
                    <Typography variant="headline" component="h1">
                        Employer 1 Year Subscription
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
        )
    }
}

export default Billing;
import React, { Component } from 'react'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

export default class DevProfileCard extends Component {
  render() {
    return (
      <div>
        <Card >
            <CardContent>
                <Typography  color="textSecondary">
                    Word of the Day
                </Typography>
                <Typography variant="headline" component="h2">
                    be
                </Typography>
                <Typography  color="textSecondary">
                adjective
                </Typography>
                <Typography component="p">
                well meaning and kindly.
                <br />
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
      </div>
    )
  }
}

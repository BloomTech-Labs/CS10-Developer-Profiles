import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AOS from 'aos';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import 'aos/dist/aos.css';

AOS.init();

const styles = {
  forgotPasswordContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    padding: '10px 0',
    width: '100vw',
  },
  forgotPasswordForm: {
    display: 'flex',
    flexDirection: 'column',
    margin: '20px',
    padding: '5px',
    width: '30vw',
  },
  paper: {
    alignSelf: 'center',
  },
  submitButton: {
    width: '100%',
  },
  submitInput: {
    display: 'none',
  },
};

class SendPasswordToEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handNewUser = this.handNewUser.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  /**
   * @todo Fix UX for alerts
   */
  handNewUser(event) {
    event.preventDefault();

    const { email } = this.state;

    /**
     * VALIDATE password input.
     * @description Validate that `password` and `confirmPassword` fields match.
     */
    axios
      .post('/api/saveresethash/', {
        email,
      })
      .then((response) => {
        if (response.data) {
          // eslint-disable-next-line no-alert
          alert(response.data.success);
        } else {
          // eslint-disable-next-line no-alert
          alert("sorry, we cant't find your email in our database");
        }
        this.setState({
          email: '',
        });
      })
      .catch(() => {
        // eslint-disable-next-line no-alert
        alert(' oh oh you broke our site!');
      });
  }

  render() {
    const { classes } = this.props;
    const { email } = this.state;

    return (
      <div data-aos="zoom-in-down" className={classes.forgotPasswordContainer}>
        <Paper className={classes.paper}>
          <form className={classes.forgotPasswordForm} onSubmit={this.handNewUser}>
            <div>
              <Typography variant="display1" gutterBottom align="center">
                Meet Dev
              </Typography>
              <Typography variant="headline" gutterBottom align="center">
                Reset Password
              </Typography>
            </div>
            <TextField
              id="email"
              placeholder="We will send a Password Reset Link Here!"
              label="Email"
              value={email}
              margin="normal"
              onChange={this.handleChange}
            />
            <br />
            <label htmlFor="input-submit-button">
              <input id="input-submit-button" className={classes.submitInput} type="submit" />
              <Button
                className={classes.submitButton}
                variant="contained"
                color="primary"
                onClick={this.handNewUser}
              >
                Submit
              </Button>
            </label>
          </form>
        </Paper>
      </div>
    );
  }
}

SendPasswordToEmail.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(SendPasswordToEmail);

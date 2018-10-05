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

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      confirmPassword: '',
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

    const { password, confirmPassword } = this.state;
    const { match } = this.props;

    if (password !== confirmPassword) {
      // eslint-disable-next-line no-alert
      alert("your passwords don't match. please try again.");
    }
    axios
      .post(`/api/saveresethash/reset/${match.params.id}/`, {
        password,
      })
      .then((response) => {
        if (response.data) {
          // eslint-disable-next-line no-alert
          alert(response.data.success);
        } else {
          // eslint-disable-next-line no-alert
          alert("sorry! we weren't able to change your password!");
        }
        this.setState({
          password: '',
          confirmPassword: '',
        });
      })
      .catch(() => {
        // eslint-disable-next-line no-alert
        alert(' oh oh you broke our site!');
      });
  }

  render() {
    const { classes } = this.props;
    const { password, confirmPassword } = this.state;

    return (
      <div data-aos="zoom-in-down" className={classes.forgotPasswordContainer}>
        <Paper className={classes.paper} onChange={this.handleChange}>
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
              id="password"
              type="password"
              placeholder="Your new password goes here!"
              label="Password"
              value={password}
              margin="normal"
            />
            <TextField
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password!"
              label="Confirm Password"
              value={confirmPassword}
              margin="normal"
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

ForgotPassword.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  match: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(ForgotPassword);

import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Icon from '@material-ui/core/Icon';
import axios from 'axios';
import './OpenPositionAdd.css';
import ProjectName from '../utilityComponents/EmpEditUtils/ProjectName';
import Description from '../utilityComponents/EmpEditUtils/Description';
import JobTitle from '../utilityComponents/EmpEditUtils/JobTitle';
import TechStack from '../utilityComponents/EmpEditUtils/TechStack';
import Skills from '../utilityComponents/EmpEditUtils/Skills';
import MinSalary from '../utilityComponents/EmpEditUtils/MinSalary';
import MaxSalary from '../utilityComponents/EmpEditUtils/MaxSalary';

export default class OpenPositionAdd extends Component {
  /**
   * Sync APP's global state with input field.
   */
  handleChange = event => {
    this.props.setGS({ userInfo: { ...this.props.getGS('userInfo'), [event.target.id]: event.target.value } });
  };

  update = e => {
    const userInfo = this.props.getGS('userInfo');
    const _id = userInfo._id;

    if (_id) {
      /**
       * Set in GS 'updateState': 'updateState' = 'updating'
       */
      this.props.setGS({ updateState: 'updating' });

      /**
       * axios.put: Make an HTTP PUT request
       *
       * @description update the 'employers' model.
       * @param {string} endpoint - API endppoint
       * @param {objetc} userInfo - Data to be updated
       * @param {object} httpHeaders - Add Authorization header.
       * @return {promise}
       * @example axios.put( endpoint, userInfo, httpHeaders )
       */
      axios
        // axios 1 argument is URL and 2 argument is data 3 argument is options
        .post(
          `/api/employers/${_id}`,
          {
            ...userInfo, // UPDATE current userInfo's state. TODO: pass only updated fields.
          },
          {
            headers: {
              Authorization: localStorage.getItem('token'),
            },
          }
        )
        .then(response => {
          console.log('UPDATE USER', { status: response.status });
          /**
           * Set in GS 'updateState': 'updateState' = 'updated'
           */
          this.props.setGS({ updateState: 'updated' });
        })
        .catch(error => {
          console.log(error);
          /**
           * Set in GS 'updateState': 'updateState' = 'error'
           */
          this.props.setGS({ updateState: 'error' });
        });
    } else {
      console.log('updating without ID');
      /**
       * Set in GS 'updateState': 'updateState' = 'error'
       */
      this.props.setGS({ updateState: 'error' });
      alert('An error occurred updating your information, please resubmit the form'); // TODO: improve UX
    }
  };
  render() {
    /**
     * Get a reference to APP's global state.
     */
    const userInfo = this.props.getGS('userInfo');

    return (
      <div className="EditContainer">
        <Paper className="paperContainer" elevation={1}>
          <Typography variant="display1" gutterBottom align="center">
            Add Open Position
          </Typography>
          <br />
          <form onChange={this.handleChange}>
            <div className="inputRow">
              {/* PROJECT NAME */}
              <ProjectName userInfo={userInfo} />

              {/* DESCRIPTION */}
              <Description userInfo={userInfo} />

              {/* Job Title */}
              <JobTitle setGS={this.props.setGS} getGS={this.props.getGS} userInfo={userInfo} />

              {/* Tech Stack */}
              <TechStack userInfo={userInfo} />

              {/* Skills */}
              <Skills userInfo={userInfo} />

              {/* Minimum Salary */}
              <MinSalary userInfo={userInfo} />

              {/* Max Salary */}
              <MaxSalary userInfo={userInfo} />

              <div>
                <Button variant="outlined" color="primary" align="center" onClick={this.update}>
                  {' '}
                  Add Position{' '}
                </Button>
              </div>
            </div>
          </form>
        </Paper>
      </div>
    );
  }
}

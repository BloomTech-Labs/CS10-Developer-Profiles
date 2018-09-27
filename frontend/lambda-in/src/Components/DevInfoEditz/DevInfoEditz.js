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
import './DevInfoEditz.css';
import DropDown from '../utilityComponents/DropDown';

export default class DevInfoEdit extends Component {
  handleChange = event => {
    console.log({ onChange: event.target.id });
    /**
     * Wire APP's global state with input field.
     */
    this.props.setGS({ userInfo: { ...this.props.getGS('userInfo'), [event.target.id]: event.target.value } });
  };

  update = () => {
    const userInfo = this.props.getGS('userInfo');
    const _id = userInfo._id;

    if (_id) {
      console.log(_id);
      console.log(localStorage.getItem('token'));

      /**
       * Set in GS 'updateState': 'updateState' = 'updating'
       */
      this.props.setGS({ updateState: 'updating' });

      /**
       * axios.put: Make an HTTP PUT request
       *
       * @description update the 'seekers' model.
       * @param {string} endpoint - API endppoint
       * @param {objetc} userInfo - Data to be updated
       * @param {object} httpHeaders - HTTP request Authorization header.
       * @return {promise}
       * @example axios.put( endpoint, userInfo, httpHeaders )
       */
      axios
        // axios 1 argument is URL and 2 argument is data 3 argument is options
        .put(
          `/api/seekers/${_id}`,
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
          console.log(response.data);
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
            Lambda Network
          </Typography>
          <br />
          <form onChange={this.handleChange}>
            <div className="inputRow">
              {/* User basic info: name, desired title, current location */}
              <div className="smallInputContainer">
                <div className="expansionPanel">
                  <div className="inputField">
                    <TextField
                      id="firstName"
                      label="First Name"
                      fullWidth
                      value={userInfo.firstName}
                      margin="normal"
                      variant="outlined"
                    />
                  </div>

                  <div className="inputField">
                    <TextField
                      id="outlined-name"
                      label="Last Name"
                      fullWidth
                      value={userInfo.lastName}
                      margin="normal"
                      variant="outlined"
                    />
                  </div>

                  <div className="inputField">
                    <TextField
                      id="desiredTitle"
                      label="Desired Title"
                      fullWidth
                      value={userInfo.desiredTitle}
                      margin="normal"
                      variant="outlined"
                    />
                  </div>

                  <div className="inputField">
                    <TextField
                      id="currentLocation"
                      label="Current Location"
                      fullWidth
                      value={userInfo.currentLocation}
                      margin="normal"
                      variant="outlined"
                    />
                  </div>
                </div>
                <div className="imageContainer">
                  <img className="displayPic" src={`https://robohash.org/1${userInfo.firstName}`} alt="Italian " />
                </div>
              </div>

              {/* Your Social links */}
              <div className="panelMargin">
                <ExpansionPanel>
                  <ExpansionPanelSummary expandIcon={<Icon>add_circle</Icon>}>
                    <Typography>Your Social links</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <div className="expansionPanel">
                      <div className="inputField">
                        <TextField
                          id="github"
                          label="github"
                          fullWidth
                          value={userInfo.github}
                          margin="normal"
                          variant="outlined"
                        />
                      </div>

                      <div className="inputField">
                        <TextField
                          id="linkedin"
                          label="Linkedin"
                          fullWidth
                          value={userInfo.linkedin}
                          margin="normal"
                          variant="outlined"
                        />
                      </div>

                      <div className="inputField">
                        <TextField
                          id="portfolio"
                          label="Portfolio Website"
                          fullWidth
                          value={userInfo.portfolio}
                          margin="normal"
                          variant="outlined"
                        />
                      </div>
                    </div>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </div>

              {/* BIO - TOP SKILLS */}

              <div className="panelMargin">
                <ExpansionPanel>
                  <ExpansionPanelSummary expandIcon={<Icon>add_circle</Icon>}>
                    <Typography>tell us something about yourself!</Typography> // *
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <div className="expansionPanel">
                      <div className="inputFieldLargeMultiline">
                        <TextField
                          id="summary"
                          label="Your Bio"
                          fullWidth
                          multiline
                          rowsMax="4"
                          value={userInfo.summary}
                          margin="normal"
                          variant="outlined"
                        />
                      </div>
                      <div className="inputFieldLargeMultiline">
                        <TextField
                          id="topSkills"
                          label="Top skills"
                          fullWidth
                          multiline
                          rowsMax="4"
                          value={userInfo.topskill}
                          margin="normal"
                          variant="outlined"
                        />
                      </div>
                    </div>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </div>

              {/* PROJECTS */}
              <div className="panelMargin">
                <ExpansionPanel>
                  <ExpansionPanelSummary expandIcon={<Icon>add_circle</Icon>}>
                    <Typography>Add your best project!</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <div className="expansionPanel">
                      <div className="inputFieldLargeMultiline">
                        <TextField
                          id="projectTitle"
                          label="Project Title"
                          fullWidth
                          multiline
                          rowsMax="4"
                          value={userInfo.projectTitle}
                          margin="normal"
                          variant="outlined"
                        />
                      </div>

                      <div className="inputFieldLargeMultiline">
                        <TextField
                          id="projectLink"
                          label="Project Link"
                          fullWidth
                          multiline
                          rowsMax="4"
                          value={userInfo.projectLink}
                          margin="normal"
                          variant="outlined"
                        />
                      </div>

                      <div className="inputFieldLargeMultiline">
                        <TextField
                          id="projectRepo"
                          label="Project Repo"
                          fullWidth
                          multiline
                          rowsMax="4"
                          value={userInfo.projectRepo}
                          margin="normal"
                          variant="outlined"
                        />
                      </div>
                    </div>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </div>

              {/* EDUCATION */}
              <div className="panelMargin">
                <ExpansionPanel>
                  <ExpansionPanelSummary expandIcon={<Icon>add_circle</Icon>}>
                    <Typography>Add your Education back ground</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <div className="expansionPanel">
                      <div className="inputFieldLargeMultiline">
                        <TextField
                          id="projectTitle"
                          label="Project Title"
                          fullWidth
                          multiline
                          rowsMax="4"
                          value={userInfo.projectTitle}
                          margin="normal"
                          variant="outlined"
                        />
                      </div>

                      <div className="inputFieldLargeMultiline">
                        <TextField
                          id="projectLink"
                          label="Project Link"
                          fullWidth
                          multiline
                          rowsMax="4"
                          value={userInfo.projectLink}
                          margin="normal"
                          variant="outlined"
                        />
                      </div>

                      <div className="inputFieldLargeMultiline">
                        <TextField
                          id="projectRepo"
                          label="Project Repo"
                          fullWidth
                          multiline
                          rowsMax="4"
                          value={userInfo.projectRepo}
                          margin="normal"
                          variant="outlined"
                        />
                      </div>
                    </div>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </div>

              <div>
                <Button variant="outlined" color="primary" align="center" onClick={this.update}>
                  {' '}
                  Save{' '}
                </Button>
              </div>
            </div>
          </form>
        </Paper>
      </div>
    );
  }
}

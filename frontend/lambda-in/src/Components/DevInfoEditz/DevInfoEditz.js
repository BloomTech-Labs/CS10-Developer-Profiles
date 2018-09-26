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

export default class DevInfoEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'abc@xyz.com',
      firstName: 'daat',
      lastName: 'man',
      desiredTitle: 'BOSS',
      currentLocation: 'mars',
      github: 'github.com/kkkk',
      linkedin: 'linkedin.com/batman',
      portfolio: 'batman.com',
      acclaimBadge: 'lambda Batch',
      placesInterested: ' earh etc',
      password: '12345678Aa$',
      confirmPassword: '',
      isSignedIn: false,
      summary: 'wubba lubba dub dub',
      topskill: 'Baller',
      projects: 'Dev profiles',
      experience: 'mars inc.',
      education: 'Lambda School',
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  // axios 1 argument is URL and 2 argument is data 3 argument is options
  update = () => {
    const _id = localStorage.getItem('_id');
    if (_id) {
      console.log(_id);
      console.log(localStorage.getItem('token'));
      axios
        .put(
          `/api/seekers/${_id}`,
          {
            linkedin: this.state.linkedin,
          },
          {
            headers: {
              Authorization: localStorage.getItem('token'),
            },
          }
        )
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      console.log('updating without ID');
    }
  };
  render() {
    return (
      <div className="EditContainer">
        <Paper className="paperContainer" elevation={1}>
          <Typography variant="display1" gutterBottom align="center">
            Lambda Network
          </Typography>
          <br />
          <form>
            <div className="inputRow">
              <div className="smallInputContainer">
                <div>
                  <ExpansionPanel >
                    <ExpansionPanelSummary expandIcon={<Icon >add_circle</Icon>}>
                      <Typography>Your Personal Info</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <div className="expansionPanel">
                          <div className="inputField">
                            <TextField
                              id="firstName"
                              label="First Name"
                              fullWidth
                              value={this.state.firstName}
                              onChange={this.handleChange('firstName')}
                              margin="normal"
                              variant="outlined"
                            />
                          </div>

                          <div className="inputField">
                          <TextField
                            id="outlined-name"
                            label="Last Name"
                            fullWidth
                            value={this.state.lastName}
                            onChange={this.handleChange('lastName')}
                            margin="normal"
                            variant="outlined"
                          />
                        </div>

                        <div className="inputField">
                          <TextField
                            id="desiredTitle"
                            label="Desired Title"
                            fullWidth
                            value={this.state.desiredTitle}
                            onChange={this.handleChange('desiredTitle')}
                            margin="normal"
                            variant="outlined"
                          />
                        </div>

                        <div className="inputField">
                          <TextField
                            id="currentLocation"
                            label="Current Location"
                            fullWidth
                            value={this.state.currentLocation}
                            onChange={this.handleChange('currentLocation')}
                            margin="normal"
                            variant="outlined"
                          />
                        </div>
                      </div>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                </div>
                {/* <div className="imageContainer">
                  <img className="displayPic" src={`https://robohash.org/1${this.state.firstName}`} alt="Italian " />
                </div> */}
              </div>

              <div className="smallInputContainer">
                  <ExpansionPanel >
                    <ExpansionPanelSummary expandIcon={<Icon >add_circle</Icon>}>
                      <Typography>Your Social links</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <div className="expansionPanel">
                        <div className="inputField">
                          <TextField
                            id="github"
                            label="github"
                            fullWidth
                            value={this.state.github}
                            onChange={this.handleChange('github')}
                            margin="normal"
                            variant="outlined"
                          />
                        </div>

                        <div className="inputField">
                          <TextField
                            id="linkedin"
                            label="Linkedin"
                            fullWidth
                            value={this.state.linkedin}
                            onChange={this.handleChange('linkedin')}
                            margin="normal"
                            variant="outlined"
                          />
                        </div>

                        <div className="inputField">
                          <TextField
                            id="portfolio"
                            label="Portfolio Website"
                            fullWidth
                            value={this.state.portfolio}
                            onChange={this.handleChange('portfolio')}
                            margin="normal"
                            variant="outlined"
                          />
                        </div>
                      </div>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                </div>
              

              <div className="inputFieldLargeMultiline">
                <TextField
                  id="summary"
                  label="Your Bio"
                  fullWidth
                  multiline
                  rowsMax="4"
                  value={this.state.summary}
                  onChange={this.handleChange('summary')}
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
                  value={this.state.topskill}
                  onChange={this.handleChange('topskill')}
                  margin="normal"
                  variant="outlined"
                />
              </div>

              <div className="inputFieldLargeMultiline">
                <TextField
                  id="project"
                  label="Projects"
                  fullWidth
                  multiline
                  rowsMax="4"
                  value={this.state.projects}
                  onChange={this.handleChange('projects')}
                  margin="normal"
                  variant="outlined"
                />
              </div>

              <div className="inputFieldLargeMultiline">
                <TextField
                  id="experience"
                  label="Experience"
                  fullWidth
                  multiline
                  rowsMax="4"
                  value={this.state.experience}
                  onChange={this.handleChange('experience')}
                  margin="normal"
                  variant="outlined"
                />
              </div>

              <div className="inputFieldLargeMultiline">
                <TextField
                  id="education"
                  label="Education"
                  fullWidth
                  multiline
                  rowsMax="4"
                  value={this.state.education}
                  onChange={this.handleChange('education')}
                  margin="normal"
                  variant="outlined"
                />
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

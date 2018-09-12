import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

// temporary css
import './DevProfile.css';



class DevProfile extends Component {
    // constructor(props) {
    //     super(props);
    // }

    state = {
        firstName: 'Jean Luc',
        lastName: 'Picard',
        currentLocation: 'USS Stargazer',
        summary:'Space, the final frontier. These are the voyages of starship Stargazer.',
        desiredTitle: 'Captain',
        github: 'github.com/JeanLucPicard',
        linkedin: 'linkedin.com/JeanLucPicard',
        portfolio: 'JeanLucPicard.com',
        acclaimBadge: 'Lambda Badge',
        projects: 'Battle of Maxia',
        experience: 'Captain of USS Stargazer',
        education: 'Star Fleet Academy',
        placesInterested: 'USS Enterprise',
    }

    render() {
        return (
            <div>
            <Paper>
              <div class="navBar">
                <div class="leftNavBar">
                  <Button>find Devlopers</Button>
                  <Button>Browse</Button>
                  <Button>profile</Button>
                </div> 
                <div class="rightNavBar">
                  <Button>Billing</Button>
                  <Button>Setting</Button>
                </div> 
              </div>
            </Paper>

                <div className="container">
                    <div className="topCard">
                        <div className="topCardLeft">
                            <div className="nameCard">
                                <div className="photo">
                                    <img
                                        src=""
                                        width="150"
                                        height="150"
                                        title="Profile Photo"
                                        alt="Photo"/>
                                </div>
                                <div className="basicInfo">
                                    <div className="name">
                                        <h1>{this.state.firstName} {this.state.lastName}</h1>
                                    </div>
                                    <h3 className="currentLocation">{this.state.currentLocation}</h3>
                                    <p className="summary">{this.state.summary}</p>
                                </div>
                            </div>
                            <div className="desiredTitle">
                                <div classname="title1">
                                    <h2>Desired Title:</h2>
                                </div>
                                <div className="title2">
                                    <h3>{this.state.desiredTitle}</h3>
                                </div>
                            </div>
                            {/* insert tag cloud here */}
                            <div className="tagCloud"/>
                        </div>
                        <div className="topCardRight"> 
                            <a href={this.state.acclaimBadge}>
                                <img
                                    src=""
                                    width="50"
                                    height="50"
                                    title="Acclaimed Badge"
                                    alt="Badge"/>
                                </a>
                            <a href={this.state.github}>
                                <img
                                    src=""
                                    width="50"
                                    height="50"
                                    title="Github"
                                    alt="Github Repo"/>
                            </a>
                            <a href={this.state.linkedin}>
                                <img
                                    src=""
                                    width="50"
                                    height="50"
                                    title="Linkedin"
                                    alt="Linkedin"/>
                            </a>
                            <a href={this.state.portfolio}>
                                <img
                                    src=""
                                    width="50"
                                    height="50"
                                    title="Portfolio"
                                    alt="Portfolio"/>
                            </a>
                        </div>
                    </div>
                    <div className="profileBody">
                        <div className="projects">
                            <h2>Projects</h2>
                            <p>{this.state.projects}</p>
                        </div>
                        <div className="experience">
                            <h2>Experience</h2>
                            <p>{this.state.experience}</p>
                        </div>
                        <div className="education">
                            <h2>Education</h2>
                            <p>{this.state.education}</p>
                        </div>
                        <div className="placesInterested">
                            <h2>Locations Interested</h2>
                            <p>{this.state.placesInterested}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DevProfile;
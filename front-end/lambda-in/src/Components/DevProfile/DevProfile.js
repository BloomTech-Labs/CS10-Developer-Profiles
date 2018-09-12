import React, { Component } from 'react';
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
        experiences: 'Captain of USS Stargazer',
        education: 'Star Fleet Academy',
        placesInterested: 'USS Enterprise, Qo\'nos',
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="top-card">
                        <div className="top-card-left">
                            <div className="photo">
                                <img
                                    src=""
                                    width="150"
                                    height="150"
                                    title="Profile Photo"
                                    alt="Photo"/>
                            </div>
                            <div classname="nameCard">
                                <h1 className="name">
                                    {this.state.firstName} {this.state.lastName}
                                </h1>
                                <h2 className="location">{this.state.currentLocation}</h2>
                                <p className="description">{this.state.summary}</p>
                            </div>
                            <hr/>
                            <h1>Desired Title</h1>
                            <hr/>
                            <h2>{this.state.desiredTitle}</h2>
                            {/* insert tag cloud here */}
                            <div className="tag-cloud"/>
                        </div>
                        <div className="top-card-right"> 
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
                    <div classname="profile-body">
                        <h1>Projects</h1>
                        <p>{this.state.projects}</p>
                        <hr/>
                        <h1>Experience</h1>
                        <p>{this.state.experiences}</p>
                        <hr/>
                        <h1>Education</h1>
                        <p>{this.state.education}</p>
                        <hr/>
                        <h1>Locations Interested</h1>
                        <p>{this.state.placesInterested}</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default DevProfile;
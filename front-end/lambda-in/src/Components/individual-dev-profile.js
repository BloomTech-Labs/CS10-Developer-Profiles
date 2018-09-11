import React, { Component } from 'react';
// temporary css
import './temp-devProp.css';

class individual-dev-profile extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="top-card">
                        <div className="top-card-left">
                            <div className="photo">
                                <img src={this.props.seeker.profilePicture} width="150" height="150" title="Profile Photo" alt="Photo"/>
                            </div>
                            <div classname="nameCard">
                                <h1 className="name">{this.props.seeker.firstName} {this.props.seeker.lastName}</h1>
                                <h2 className="location">{this.props.seeker.location}</h2>
                                <p className="description">{this.props.seeker.summary}</p>
                            </div>
                            <hr/>
                            <h1>Desired Title</h1>
                            <hr/>
                            <h2>{this.props.desiredTitle}</h2>
                            {/* insert tag cloud here */}
                            <div className="tag-cloud"/>
                        </div>
                        <div className="top-card-right"> 
                            <a href={this.props.acclaimBadge}><img src="" width="50" height="50" title="Acclaimed Badge" alt="Badge"/></a>
                            <a href={this.props.github}><img src="" width="50" height="50" title="Github" alt="Github Repo"/></a>
                            <a href={this.props.linkedin}><img src="" width="50" height="50" title="Linkedin" alt="Linkedin"/></a>
                            <a href={this.props.portfolio}><img src="" width="50" height="50" title="Portfolio" alt="Portfolio"/></a>
                        </div>
                    </div>
                    <div classname="profile-body">

                </div>
            </div>
        );
    }
}

export default individual-dev-profile;
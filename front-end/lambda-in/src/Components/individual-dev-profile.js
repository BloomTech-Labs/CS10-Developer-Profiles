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
                        <img src="{this.props.seeker.profilePicture}" />
                        <h1 className="name">{this.props.seeker.firstName} {this.props.seeker.lastName}</h1>
                        <h2 className="location">{this.props.seeker.descriptopn}</h2>
                        <hr/>
                        

                    </div>
                </div>
            </div>
        );
    }
}

export default individual-dev-profile;
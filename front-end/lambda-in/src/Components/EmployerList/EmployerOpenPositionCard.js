import React, { Component } from 'react'
// import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
// import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

import './EmployerProfileCard.css'



class EmployerOpenPositionCard extends React.Component {
    state = {
        companyName: "Star Fleet",
        companyEmail: "starfleetcommand@starfleet.ufp",
    
        hiringManagerFirstName: "Alynna",
        hiringManagerLastName: "Nechayev",
        hiringManagerEmail: "nechayev@starfleet.ufp",
        password: "nechayev-7-alpha",
        confirmPassword: "nechayev-7-alpha",
    
        projectName: "Enterprise-D",
        description: "We are watching for the captain of the Federation Flagship.",
        jobTitle: "Captain",
        techStack: "full stack",
        skills: ["Diplomacy", "Leadership", "Tactical Strategy"],
        minSalrary: 1000000,
        maxSalary: 2000000
      };


    render() {
        return (
            <div>
                <Paper class='container'></Paper>
                
            </div>
       );
    }
}
export default EmployerOpenPositionCard;
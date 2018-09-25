import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import "./DevProfile.css";

class DevProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "Jean Luc",
      lastName: "Picard",
      currentLocation: "USS Stargazer",
      summary:
        "Space, the final frontier. These are the voyages of starship Stargazer. It's continuing mission. To seek out new worlds and new civilizations.",
      desiredTitle: "Captain",
      acclaimBadge: "Lambda Badge",
      socialNetwork: "facebook.com",
      github: "github.com/JeanLucPicard",
      linkedin: "linkedin.com/JeanLucPicard",
      portfolio: "JeanLucPicard.com",
      projects: "Battle of Maxia",
      experience: "Captain of USS Stargazer",
      education: "Star Fleet Academy",
      placesInterested: "USS Enterprise",

      topSkills: [
        "Leardership",
        "Tactical Strategies",

        "Diplomacy"
      ],
      additionalSkills: [
        "Close Combat",
        "Knife Combat",
        "Phaser",
        "Shakespear"
      ],

      skills: [
        "Archaeology",
        "Literature",
        "tlhIngan Hol",
        "Mythology",
        "Navigation",
        "Engineering"]
    };
  }

  // componentDidMount() {
  //     fetch(this.state)
  //     skillCloudHighlighter(state) {

  //     }
  // }

  render() {
    const TS = this.state.topSkills;
    const AS = this.state.additionalSkills;
    const SS = this.state.skills;
    const allSkills = TS.concat(AS, SS);
    const skillList = allSkills.map((skill) => (
      <li>{skill}{` `}</li>
    ));

    return (
      <div>
        <div className="container">
        <Paper>
          <div className="topCard">
            <div className="topCardLeft">
              <div className="nameCard">
                <div className="photo">
                  <img
                    className="pic"
                    src={require("./img/picard.jpg")}
                    title="Profile Photo"
                    alt="Photo"
                  />
                </div>
                <div className="basicInfo">
                  <div className="name">
                    <Typography variant="headline" component="h3">
                      {this.state.firstName} {this.state.lastName}
                    </Typography>
                  </div>
                  <div className="currentLocation">
                    <Typography variant="headline" component="h3">
                      {this.state.currentLocation}
                    </Typography>
                  </div>
                  <div className="summary">
                    <Typography>{this.state.summary}</Typography>
                  </div>
                  <div className="desiredTitle">
                  Desired Title: {this.state.desiredTitle}
                </div>
                <div className="tagCloud"><ul>{skillList}</ul></div>
                </div>
              </div>
              <div className="nameCardDown">

              </div>
            </div>

            <div className="topCardRight">
              <a href={this.state.acclaimBadge}>
                <img
                  src={require("./img/lambdaColor.png")}
                  width="50"
                  height="50"
                  title="Acclaimed Badge"
                  alt="Badge"
                />
              </a>
              <a href={this.state.socialNetwork}>
                <img
                  src={require("./img/sns.png")}
                  width="50"
                  height="50"
                  title="SNS"
                  alt="SNS"
                />
              </a>
              <a href={this.state.github}>
                <img
                  src={require("./img/GitHub.png")}
                  width="50"
                  height="50"
                  title="Github"
                  alt="Github Repo"
                />
              </a>
              <a href={this.state.linkedin}>
                <img
                  src={require("./img/linkedin.jpg")}
                  width="50"
                  height="50"
                  title="Linkedin"
                  alt="Linkedin"
                />
              </a>
              <a href={this.state.portfolio}>
                <img
                  src={require("./img/portfolio.png")}
                  width="50"
                  height="50"
                  title="Portfolio"
                  alt="Portfolio"
                />
              </a>
            </div>
          </div>

          <div className="downCard">
            <div className="projects">
              <div>Projects: </div>
              {this.state.projects}
            </div>
            <div className="experience">
              <div>Experience: </div>
              {this.state.experience}
            </div>
            <div className="education">
              <div>Education: </div>
              {this.state.education}
            </div>
            <div className="placesInterested">
              <div>Locations Interested: </div>
              {this.state.placesInterested}
            </div>
          </div>
        </Paper>
        </div>
      </div>
    );
  }
}

export default DevProfile;

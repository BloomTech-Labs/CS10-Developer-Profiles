import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import AOS from 'aos';
import './DevProfile.css';
import 'aos/dist/aos.css';
import githubImage from './img/GitHub.png';
import lambdaColorImage from './img/lambdaColor.png';
import linkedInImage from './img/linkedin.jpg';
import picardImage from './img/picard.jpg';
import portfolioImage from './img/portfolio.png';
import snsImage from './img/sns.png';
import axios from 'axios';

AOS.init();

class DevProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: 'Jean Luc',
      lastName: 'Picard',
      currentLocation: 'USS Stargazer',
      summary:
        "Space, the final frontier. These are the voyages of starship Stargazer. It's continuing mission. To seek out new worlds and new civilizations.",
      desiredTitle: 'Captain',
      acclaimBadge: 'Lambda Badge',
      socialNetwork: 'facebook.com',
      github: 'github.com/JeanLucPicard',
      linkedin: 'linkedin.com/JeanLucPicard',
      portfolio: 'JeanLucPicard.com',
      projects: 'Battle of Maxia',
      experience: 'Captain of USS Stargazer',
      education: 'Star Fleet Academy',
      placesInterested: 'USS Enterprise',

      topSkills: ['Leardership', 'Tactical Strategies', 'Diplomacy'],
      additionalSkills: ['Close Combat', 'Knife Combat', 'Phaser', 'Shakespear'],

      skills: [
        'Archaeology',
        'Literature',
        'tlhIngan Hol',
        'Mythology',
        'Navigation',
        'Engineering',
      ],
    };
  }

  handleAuth = () => {
    if (localStorage.getItem("token") !== null) {
      this.setState({
        isSignedIn: true
      });
    } else {
      this.setState({
        isSignedIn: false
      });
    }
  };

  handleGetAll = () => {
    if (this.state.isSignedIn) {
      axios
        .get(
          `/api/employers/`,

          {
            headers: {
              Authorization: localStorage.getItem("token")
            }
          }
        )
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  componentDidMount(){
    this.handleAuth();
    this.handleGetAll();
}

  render() {
    const {
      topSkills,
      additionalSkills,
      skills,
      firstName,
      lastName,
      currentLocation,
      desiredTitle,
      summary,
      acclaimBadge,
      socialNetwork,
      github,
      linkedin,
      portfolio,
      projects,
      education,
      experience,
      placesInterested,
    } = this.state;
    const allSkills = topSkills.concat(additionalSkills, skills);
    const skillList = allSkills.map(skill => (
      <li>
        {skill}
        {' '}
      </li>
    ));

    return (
      <div>
        <div data-aos="fade-up" className="container">
          <Paper>
            <div className="topCard">
              <div className="topCardLeft">
                <div className="nameCard">
                  <div className="photo">
                    <img
                      className="pic"
                      src={picardImage}
                      title="Profile Photo"
                      alt="Profile Avatar"
                    />
                  </div>
                  <div className="basicInfo">
                    <div className="name">
                      <Typography variant="headline" component="h3">
                        {firstName}
                        {' '}
                        {lastName}
                      </Typography>
                    </div>
                    <div className="currentLocation">
                      <Typography variant="headline" component="h3">
                        {currentLocation}
                      </Typography>
                    </div>
                    <div className="summary">
                      <Typography>{summary}</Typography>
                    </div>
                    <div className="desiredTitle">
                      Desired Title:
                      {desiredTitle}
                    </div>
                    <div className="tagCloud">
                      <ul>{skillList}</ul>
                    </div>
                  </div>
                  <div className="nameCardDown" />
                </div>
                {/* <div className="topCardRight">
                  <a href={acclaimBadge}>
                    <img
                      src={lambdaColorImage}
                      width="50"
                      height="50"
                      title="Acclaimed Badge"
                      alt="Badge"
                    />
                  </a>
                  <a href={socialNetwork}>
                    <img
                      src={snsImage}
                      width="50"
                      height="50"
                      title="SNS"
                      alt="SNS"
                    />
                  </a>
                  <a href={github}>
                    <img
                      src={githubImage}
                      width="50"
                      height="50"
                      title="Github"
                      alt="Github Repo"
                    />
                  </a>
                  <a href={linkedin}>
                    <img
                      src={linkedInImage}
                      width="50"
                      height="50"
                      title="Linkedin"
                      alt="Linkedin"
                    />
                  </a>
                  <a href={portfolio}>
                    <img
                      src={portfolioImage}
                      width="50"
                      height="50"
                      title="Portfolio"
                      alt="Portfolio"
                    />
                  </a>
                </div> */}
                <div className="nameCardDown" />
              </div>
              <div className="topCardRight">
                <a href={acclaimBadge}>
                  <img
                    className="lambda-badge"
                    src={lambdaColorImage}
                    width="50"
                    height="50"
                    title="Acclaimed Badge"
                    alt="Badge"
                  />
                </a>
                <a href={socialNetwork}>
                  <img
                    className="social-network"
                    src={snsImage}
                    width="50"
                    height="50"
                    title="SNS"
                    alt="SNS"
                  />
                </a>
                <a href={github}>
                  <img
                    className="github"
                    src={githubImage}
                    width="50"
                    height="50"
                    title="Github"
                    alt="Github Repo"
                  />
                </a>
                <a href={linkedin}>
                  <img
                    className="linkedin"
                    src={linkedInImage}
                    width="50"
                    height="50"
                    title="Linkedin"
                    alt="Linkedin"
                  />
                </a>
                <a href={portfolio}>
                  <img
                    className="portfolio"
                    src={portfolioImage}
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
                {projects}
              </div>
              <div className="experience">
                <div>Experience: </div>
                {experience}
              </div>
              <div className="education">
                <div>Education: </div>
                {education}
              </div>
              <div className="placesInterested">
                <div>Locations Interested: </div>
                {placesInterested}
              </div>
            </div>
          </Paper>
        </div>
      </div>
    );
  }
}

export default DevProfile;

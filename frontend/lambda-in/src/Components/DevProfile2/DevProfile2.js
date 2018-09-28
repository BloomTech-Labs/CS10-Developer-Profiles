import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import MapList from '../MapList/MapList';
import './DevProfile2.css';
import lambdaColorImg from './img/lambdaColor.png';
import GitHubImg from './img/GitHub.png';
import linkedinImg from './img/linkedin.jpg';
import portfolioImg from './img/portfolio.png';

export default ({ getGS, setGS }) => {
  const userInfo = getGS('userInfo');

  const TS = userInfo.topSkills;
  const AS = userInfo.additionalSkills;
  const SS = userInfo.skills;
  const allSkills = TS.concat(AS, SS);
  const skillList = allSkills.map(skill => (
    <li>
      {skill}
      {` `}
    </li>
  ));

  let handleOpen = () => {
    setGS({ DevProfileModal: true });
  };

  let handleClose = () => {
    setGS({ DevProfileModal: false });
  };

  return (
    <div className="profileContainer">
      <Paper className="profilePaper">
        <div className="profileTopCard">
          <div className="profileImage">
            <img className="profileImage" src="https://robohash.org/tony" alt="Italian " />
          </div>
          <div className="profileBio">
            <div className="basicInfo">
              <div className="name">
                <Typography variant="headline" component="h3">
                  {userInfo.firstName}
                  {userInfo.lastName}
                </Typography>
              </div>
              <div className="currentLocation">
                <Typography variant="headline" component="h3">
                  {userInfo.currentLocation}
                </Typography>
              </div>
              <div className="summary">
                <Typography>{userInfo.summary}</Typography>
              </div>
              <div className="desiredTitle">
                Desired Title:
                {userInfo.desiredTitle}
              </div>
              <div className="tagCloud">
                <MapList array={allSkills} />
              </div>
            </div>
          </div>
          <div className="profileLinks">
            <a href={userInfo.acclaimBadge}>
              <img src={lambdaColorImg} className="profileLinksIcon" title="Acclaimed Badge" alt="Badge" />
            </a>
            <a href={userInfo.github}>
              <img src={GitHubImg} className="profileLinksIcon" title="Github" alt="Github Repo" />
            </a>
            <a href={userInfo.linkedin}>
              <img src={linkedinImg} className="profileLinksIcon" title="Linkedin" alt="Linkedin" />
            </a>
            <a href={userInfo.portfolio}>
              <img src={portfolioImg} className="profileLinksIcon" title="Portfolio" alt="Portfolio" />
            </a>
          </div>
        </div>
        <div className="profileBottomCard">
          <Paper>
            <div className="profileProjects">
              <div>Projects: </div>
            </div>
            <div className="profileProjects">
              <div>Education: </div>
            </div>
            <div className="profileProjects">
              <div>Experience: </div>
            </div>
            <div className="profileProjects">
              <div>Locations Interested: </div>
            </div>
            <div className="profileButtons">
              <Link to="/dev-info-edit">
                <Button variant="outlined" color="primary">
                  {' '}
                  edit
                </Button>
              </Link>
              <Link to="/dev-profile2">
                <Button variant="outlined" color="secondary">
                  {' '}
                  Delete
                </Button>
              </Link>
            </div>
          </Paper>
        </div>
      </Paper>
    </div>
  );
};

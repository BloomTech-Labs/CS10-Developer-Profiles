/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import './DevProfile2.css';
import lambdaColorImg from './img/lambdaColor.png';
import GitHubImg from './img/GitHub.png';
import linkedinImg from './img/linkedin.jpg';
import portfolioImg from './img/portfolio.png';
import ArraySectionDisplay from '../utilityComponents/ArraySection/ArraySectionDisplay';
import MapChips from '../utilityComponents/MapArrays/MapChips';

const DevProfile2 = ({ getGS }) => {
  const userInfo = getGS('userInfo');

  const schemas = {
    projects: {
      title: 'Title',
      description: 'Description',
      img: 'Image',
      link: 'Link',
      repo: 'Repository',
      // tech: ['Stack'], // TODO
    },
    experience: {
      title: 'Title',
      company: 'Company',
      // location: 'Location', // TODO: validate geolocation data
      headline: 'Head line',
      description: 'Description',
      startYear: 'Start year yy/mm/dd',
      endYear: 'End year yy/mm/dd',
    },
    education: {
      school: 'School',
      degree: 'Degree',
      fieldOfStudy: 'Field of study',
      startYear: 'Star year yy/mm/dd',
      endYear: 'End year yy/mm/dd',
      description: 'Description',
    },
  };

  return (
    <div className="profileContainer">
      <Paper className="profilePaper">
        <div className="profileTopCard">
          <div className="profileImage">
            <img
              className="profileImage"
              src={`https://robohash.org/1${userInfo.firstName}`}
              alt="Italian "
            />
          </div>
          <div className="profileBio">
            <div className="basicInfo">
              <div className="name">
                <Typography variant="headline" component="h3">
                  {userInfo.firstName} {userInfo.lastName}
                </Typography>
              </div>
              <div className="currentLocation">
                <Typography variant="headline" component="h3">
                  {userInfo.currentLocation}
                </Typography>
              </div>
              <div className="summary">
                <Typography variant="subheading" gutterBottom>
                  {' '}
                  Bio - {userInfo.summary}
                </Typography>
              </div>
              <div className="desiredTitle">
                <Typography variant="subheading" gutterBottom>
                  Desired Title - {userInfo.desiredTitle}
                </Typography>
              </div>
              <div className="tagCloud">
                <MapChips array={userInfo.topSkills} />
              </div>
            </div>
          </div>
          <div className="profileLinks">
            <a href={userInfo.acclaimBadge}>
              <img
                src={lambdaColorImg}
                className="profileLinksIcon"
                title="Acclaimed Badge"
                alt="Badge"
              />
            </a>
            <a href={userInfo.github}>
              <img
                src={GitHubImg}
                className="profileLinksIcon"
                title="Github"
                alt="Github Repo"
              />
            </a>
            <a href={userInfo.linkedin}>
              <img
                src={linkedinImg}
                className="profileLinksIcon"
                title="Linkedin"
                alt="Linkedin"
              />
            </a>
            <a href={userInfo.portfolio}>
              <img
                src={portfolioImg}
                className="profileLinksIcon"
                title="Portfolio"
                alt="Portfolio"
              />
            </a>
          </div>
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <div className="profileBottomCard">
          <ArraySectionDisplay
            header="Projects"
            userInfo={userInfo}
            field="projects"
            itemType="object"
            schema={schemas.projects}
          />
          <ArraySectionDisplay
            header="Experience"
            userInfo={userInfo}
            field="experience"
            itemType="object"
            schema={schemas.experience}
          />
          <ArraySectionDisplay
            header="Education"
            userInfo={userInfo}
            field="education"
            itemType="object"
            schema={schemas.education}
          />
          <div className="profileButtons">
            <Link to="/dev-info-edit">
              <Button variant="contained" color="primary">
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
        </div>
      </Paper>
    </div>
  );
};

DevProfile2.propTypes = {
  getGS: PropTypes.func.isRequired,
};

export default DevProfile2;

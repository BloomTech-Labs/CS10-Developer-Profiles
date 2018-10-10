/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import './DevProfile2.css';
import lambdaColorImg from './img/lambdaColor.png';
import GitHubImg from './img/GitHub.png';
import linkedinImg from './img/linkedin.jpg';
import portfolioImg from './img/portfolio.png';
import ArraySectionDisplay from '../utilityComponents/ArraySection/ArraySectionDisplay';
import MapChips from '../utilityComponents/MapArrays/MapChips';
import DevSnapshot from '../DevSnapshot/DevSnapshot';
import DevSocial from '../DevSocial/DevSocial';

const DevProfile2 = ({ getGS }) => {
  const userInfo = getGS('userInfo');
  const fullName = `${userInfo.firstName} ${userInfo.lastName}`;
  const initials = `${userInfo.firstName.slice(0, 1)}${userInfo.lastName.slice(0, 1)}`;

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
        <Card>
          <DevSnapshot
            _id={userInfo._id} // eslint-disable-line no-underscore-dangle
            fullName={fullName}
            initials={initials}
            img={userInfo.img}
            location={userInfo.currentLocation}
            summary={userInfo.summary}
            title={userInfo.desiredTitle}
            topSkills={userInfo.topSkills}
            addSkills={userInfo.additionalSkills}
            familiar={userInfo.familiarWith}
          />
          {/* <DevSocial /> */}
        </Card>
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
  classes: PropTypes.shape({}).isRequired,
  getGS: PropTypes.func.isRequired,
};

export default DevProfile2;

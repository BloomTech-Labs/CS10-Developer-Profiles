import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

const styles = {
  skill: {
    margin: '4px',
  },
  top: {
    backgroundColor: '#4A4F6B',
    color: '#FFF',
    '&:hover': {
      backgroundColor: '#7D829E',
    },
  },
  additional: {
    backgroundColor: '#FFF',
    border: '1px solid #4A4F6B',
    color: '#4A4F6B',
    '&:hover': {
      backgroundColor: '#eeeff6',
    },
  },
  familiar: {
    backgroundColor: '#FFF',
    border: '1px solid #c9c9c9',
    color: '#c9c9c9',
    '&:hover': {
      backgroundColor: '#F3F3F3',
    },
  },
};

/**
 * Skill Cloud component
 *
 * @description A component that generates a skill cloud using arrays of top skills, additional
 * skills and skills familiar with.
 * @class A React class component
 * @prop {Array} skills - An array of objects holding all skills passed in.
 */
class SkillCloud extends Component {
  /**
   * Create a Skill Cloud component
   *
   * @param {Object} props - Component properties.
   * @param {Array} props.topSkills - List of seeker's top skills to be displayed in large text.
   * @param {Array} props.addSkills - List of seeker's additional skills to be displayed in medium
   * text.
   * @param {Array} props.familiar - List of skills the seeker is familiar with to be displayed in
   * small
   * text.
   *
   * @see {@link https://reacttraining.com/react-router/web/api/Link } for the Link API.
   * @see {@link https://material-ui.com/api/typography/ } for the Typography API.
   * @see {@link https://material-ui.com/style/typography/ } for a demo of the Typography component.
   */
  constructor(props) {
    super(props);
    this.state = {
      skills: this.combineSkills().sort((a, b) => (a.skill > b.skill ? 1 : -1)),
    };
  }

  /**
   * Using the passed in props topSkills, addSkills and familiar, combine the skills into an array
   * of objects. Each object contains the skill type, a class associated with the skill type and
   * the skill. Return the single skills array.
   *
   * @return {Array} Array of objects holding top skills, additional skills and skills familiar
   * with.
   */
  combineSkills() {
    const {
      classes, topSkills, addSkills, familiar,
    } = this.props;
    const skills = [];
    let id = 1;

    topSkills.forEach((skill) => {
      skills.push({
        id,
        skill,
        type: 'topSkills',
        class: classes.top,
      });
      id += 1;
    });

    addSkills.forEach((skill) => {
      skills.push({
        id,
        skill,
        type: 'addSkills',
        class: classes.additional,
      });
      id += 1;
    });

    familiar.forEach((skill) => {
      skills.push({
        id,
        skill,
        type: 'familiar',
        class: classes.familiar,
      });
      id += 1;
    });

    return skills;
  }

  /**
   * Render method.
   * Using the skills array stored on state, map over each skill and render a link to the /meetdev,
   * filtered by the selected skill.
   *
   * @return {HTML} A div holding skill links.
   */
  render() {
    const { classes } = this.props;
    const { skills } = this.state;

    return (
      <div className="skill-cloud">
        {skills.map(skill => (
          <Chip
            key={skill.id}
            label={skill.skill}
            className={classnames(classes.skill, classes.chip, skill.class)}
            clickable
            component="a"
            href={`/meetdev?${skill.type}=${skill.skill.replace(/ /g, '+')}`}
          />
        ))}
      </div>
    );
  }
}

SkillCloud.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  topSkills: PropTypes.arrayOf(PropTypes.string),
  addSkills: PropTypes.arrayOf(PropTypes.string),
  familiar: PropTypes.arrayOf(PropTypes.string),
};

SkillCloud.defaultProps = {
  topSkills: [],
  addSkills: [],
  familiar: [],
};

export default withStyles(styles)(SkillCloud);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = {
  skill: {
    display: 'inline-block',
    padding: '0 5px',
  },
  top: {
    fontSize: '1.5em',
  },
  additional: {
    fontSize: '1em',
  },
  familiar: {
    fontSize: '.5em',
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

    topSkills.forEach(skill => skills.push({ skill, type: 'topSkills', class: classes.top }));
    addSkills.forEach(skill => skills.push({ skill, type: 'addSkills', class: classes.additional }));
    familiar.forEach(skill => skills.push({ skill, type: 'familiar', class: classes.familiar }));

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
          <Typography key={skill} className={classnames(classes.skill, skill.class)}>
            <Link to={`/meetdev?${skill.type}=${skill.skill.replace(/ /g, '+')}`}>
              {skill.skill}
            </Link>
          </Typography>
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

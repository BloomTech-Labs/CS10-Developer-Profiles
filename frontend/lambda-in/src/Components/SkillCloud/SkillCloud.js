import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = {
  skill: {
    display: 'inline-block',
    padding: '0 5px'
  },
  top: {
    fontSize: '1.5em'
  },
  additional: {
    fontSize: '1em'
  },
  familiar: {
    fontSize: '.5em'
  }
};

class SkillCloud extends Component {
  constructor(props) {
    super(props);
    this.state = {
      skills: this.combineSkills().sort((a, b) => (a.skill > b.skill ? 1 : -1))
    };
  }

  combineSkills = () => {
    const { classes } = this.props;
    const skills = [];

    this.props.topSkills.forEach(skill =>
      skills.push({ type: 'topSkills', class: classes.top, skill })
    );

    this.props.addSkills.forEach(skill =>
      skills.push({ type: 'addSkills', class: classes.additional, skill })
    );

    this.props.familiar.forEach(skill =>
      skills.push({ type: 'familiar', class: classes.familiar, skill })
    );

    return skills;
  };

  render() {
    const { classes } = this.props;
    const { skills } = this.state;

    return (
      <div className="skill-cloud">
        {skills.map((skill, index) => (
          <Typography
            key={index}
            className={classnames(classes.skill, skill.class)}
          >
            <Link
              to={`/dev-list?${skill.type}=${skill.skill.replace(/ /g, '+')}`}
            >
              {skill.skill}
            </Link>
          </Typography>
        ))}
      </div>
    );
  }
}

SkillCloud.propTypes = {
  topSkills: PropTypes.array,
  addSkills: PropTypes.array,
  familiar: PropTypes.array
};

export default withStyles(styles)(SkillCloud);

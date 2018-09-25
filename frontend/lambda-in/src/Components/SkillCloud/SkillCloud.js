import React from 'react';
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

const shuffleArray = array => {
  let index = array.length;
  let temp, randomIndex;

  while (index !== 0) {
    randomIndex = Math.floor(Math.random() * index);
    index -= 1;

    temp = array[index];
    array[index] = array[randomIndex];
    array[randomIndex] = temp;
  }

  return array;
};

const SkillCloud = props => {
  const { classes } = props;
  const skills = [];

  props.topSkills.forEach(skill =>
    skills.push({ type: 'topSkills', class: classes.top, skill })
  );

  props.addSkills.forEach(skill =>
    skills.push({ type: 'addSkills', class: classes.additional, skill })
  );

  props.familiar.forEach(skill =>
    skills.push({ type: 'familiar', class: classes.familiar, skill })
  );

  const shuffledSkills = shuffleArray(skills);

  return (
    <div className="skill-cloud">
      {shuffledSkills.map((skill, index) => (
        <Typography
          key={index}
          className={classnames(classes.skill, skill.class)}
        >
          <Link to={`/dev-list?${skill.type}=${skill.skill.replace(/ /g, '+')}`}>{skill.skill}</Link>
        </Typography>
      ))}
    </div>
  );
};

SkillCloud.propTypes = {
  topSkills: PropTypes.array,
  addSkills: PropTypes.array,
  familiar: PropTypes.array
};

export default withStyles(styles)(SkillCloud);

import React from 'react';
import PropTypes from 'prop-types';
import ArraySection from '../../utilityComponents/ArraySection/ArraySection';
import SEEKER_PROP_TYPES from '../../seekerPropTypes';

const Projects = ({ userInfo }) => {
  const field = 'projects';
  const itemType = 'object';
  const schema = {
    title: 'Title',
    description: 'Description',
    img: 'Image',
    link: 'Link',
    repo: 'Repository',
    // tech: ['Stack'], // TODO
  };

  return (
    <ArraySection
      header="Projects"
      userInfo={userInfo}
      field={field}
      itemType={itemType}
      schema={schema}
    />
  );
};

Projects.propTypes = {
  userInfo: SEEKER_PROP_TYPES.isRequired,
};

export default Projects;

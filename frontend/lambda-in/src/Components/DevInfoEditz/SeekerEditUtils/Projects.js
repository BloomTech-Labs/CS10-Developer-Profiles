import React from 'react';
import PropTypes from 'prop-types';
import ArraySection from '../../utilityComponents/ArraySection/ArraySection';

// eslint-disable-next-line react/prop-types
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

Projects.prototype = {
  userInfo: PropTypes.shape({}).isRequired,
};

export default Projects;

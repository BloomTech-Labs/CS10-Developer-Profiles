import React from 'react';
import ArraySection from '../../utilityComponents/ArraySection/ArraySection';

// eslint-disable-next-line arrow-parens
const Projects = (props) => {
  const { userInfo } = props;

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

export default Projects;

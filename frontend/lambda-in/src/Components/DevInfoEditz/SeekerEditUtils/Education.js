import React from 'react';
import PropTypes from 'prop-types';
import ArraySection from '../../utilityComponents/ArraySection/ArraySection';

const Education = ({ userInfo }) => {
  const field = 'education';
  const itemType = 'object';
  const schema = {
    school: 'School',
    degree: 'Degree',
    fieldOfStudy: 'Field of study',
    startYear: 'Star year yy/mm/dd',
    endYear: 'End year yy/mm/dd',
    description: 'Description',
  };

  return (
    <ArraySection
      header="Education"
      userInfo={userInfo}
      field={field}
      itemType={itemType}
      schema={schema}
    />
  );
};

BioSkills.propTypes = {
  userInfo: PropTypes.shape({}).isRequired,
};

export default Education;

import React from 'react';
import PropTypes from 'prop-types';
import ArraySection from '../../utilityComponents/ArraySection/ArraySection';

const Experience = ({ userInfo }) => {
  const field = 'experience';
  const itemType = 'object';
  const schema = {
    title: 'Title',
    company: 'Company',
    // location: 'Location', // TODO: validate geolocation data
    headline: 'Head line',
    description: 'Description',
    startYear: 'Start year yy/mm/dd',
    endYear: 'End year yy/mm/dd',
  };

  return (
    <ArraySection
      header="Experience"
      userInfo={userInfo}
      field={field}
      itemType={itemType}
      schema={schema}
    />
  );
};

Experience.propTypes = {
  userInfo: PropTypes.shape({}).isRequired,
};

export default Experience;

import React, { Fragment } from 'react';
import ArraySection from '../ArraySection/ArraySection';

// eslint-disable-next-line arrow-parens
const Experience = (props) => {
  const { userInfo } = props;

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

export default Experience;

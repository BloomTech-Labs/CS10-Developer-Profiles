import React from 'react';
import PropTypes from 'prop-types';
import DropDown from '../DropDown/DropDown';
import MapDropDown from '../MapArrays/MapDropDown';

const ArraySectionProfile = (props) => {
  // prettier-ignore
  const {
    header,
    userInfo,
    field,
    itemType,
    schema,
  } = props;

  const propsAndLabels = Object.entries(schema);

  return (
    <DropDown header={header}>
      <MapDropDown
        isProfile
        array={userInfo[field]}
        field={field}
        itemType={itemType}
        schema={schema}
        propsAndLabels={propsAndLabels}
      />
    </DropDown>
  );
};

ArraySectionProfile.propTypes = {
  header: PropTypes.string.isRequired,
  userInfo: PropTypes.shape({}).isRequired,
  field: PropTypes.string.isRequired,
  itemType: PropTypes.string.isRequired,
  schema: PropTypes.shape({}).isRequired,
};

export default ArraySectionProfile;

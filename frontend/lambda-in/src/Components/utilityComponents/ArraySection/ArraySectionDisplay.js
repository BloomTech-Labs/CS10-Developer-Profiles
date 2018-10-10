import PropTypes from 'prop-types';
import React from 'react';
import SEEKER_PROP_TYPES from '../../seekerPropTypes';
import DropDown from '../DropDown/DropDown';
import MapDropDownDisplay from '../MapArrays/MapDropDownDisplay';

/**
 * Renders a user-array-section in individual blocks.
 * @param {onject} props - Required props
 */
const ArraySectionDisplay = (props) => {
  // prettier-ignore
  const {
    header,
    userInfo,
    field,
    schema,
  } = props;

  const propsAndLabels = Object.entries(schema);

  return (
    <DropDown header={header}>
      <MapDropDownDisplay
        array={userInfo[field]}
        propsAndLabels={propsAndLabels}
      />
    </DropDown>
  );
};

ArraySectionDisplay.propTypes = {
  header: PropTypes.string.isRequired,
  userInfo: SEEKER_PROP_TYPES.isRequired,
  field: PropTypes.string.isRequired,
  schema: PropTypes.shape({}).isRequired,
};

export default ArraySectionDisplay;

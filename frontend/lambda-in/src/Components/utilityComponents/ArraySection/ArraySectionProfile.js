import React from 'react';
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

export default ArraySectionProfile;

import React from 'react';
import DropDown from '../DropDown/DropDown';
import MapDropDownDisplay from '../MapArrays/MapDropDownDisplay';

const ArraySectionDisplay = (props) => {
  const { header, userInfo, field, itemType, schema } = props;

  const propsAndLabels = Object.entries(schema);

  return (
    <DropDown header={header}>
      <MapDropDownDisplay
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

export default ArraySectionDisplay;

import React from 'react';

const ArraySectionDisplay = () => {
  const { header, userInfo, field, itemType, schema } = props;

  const propsAndLabels = Object.entries(schema);

  return (
    <div header={header}>
      <MapDropDown
        isProfile
        array={userInfo[field]}
        field={field}
        itemType={itemType}
        schema={schema}
        propsAndLabels={propsAndLabels}
      />
    </div>
  );
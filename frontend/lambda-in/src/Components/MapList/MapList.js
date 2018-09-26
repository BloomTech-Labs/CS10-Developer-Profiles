import React from 'react';

/**
 * Render an unordered list.
 *
 * @function
 * @param {array} array - Array of Strings.
 * @return {object} A React component
 */
const MapList = ({ array }) => {
  return (
    <ul>
      {array.map(dataUnit => (
        <li>{dataUnit}</li>
      ))}
    </ul>
  );
};

export default MapList;

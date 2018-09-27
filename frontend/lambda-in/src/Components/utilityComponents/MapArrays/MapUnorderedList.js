import React from 'react';

/**
 * Render an unordered list of Strings.
 *
 * @function
 * @param {String[]} array - Array of Strings.
 * @return {object} A React component
 */
export default ({ array }) => {
  return (
    <ul>
      {array.map(dataUnit => (
        <li>{dataUnit}</li>
      ))}
    </ul>
  );
};

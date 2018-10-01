import React from 'react';

/**
 * Render an unordered list of Strings.
 *
 * @function
 * @param {String[]} array - Array of Strings.
 * @return {object} A React component
 */
export default ({ array }) => {
  // console.log('Map unordered List Array: ', array);
  return array ? (
    <ul>
      {array.map((value, index) => (
        <li key={`${index}-${value}`}>{value}</li>
      ))}
    </ul>
  ) : (
    <div>Map Unordered List. Array = null</div>
  );
};

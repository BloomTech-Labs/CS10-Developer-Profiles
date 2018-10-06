import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import DoneIcon from '@material-ui/icons/Done';
import Chip from '@material-ui/core/Chip';

/**
 * Render a list of @material-ui's Chip components.
 *
 * @function
 * @callback removeItem
 * @prop {String[]|Number[]} props - Array of Strings.
 * @prop {object} props.classes - Object defining the classes needed.
 * @prop {object} props.classes.container - Class for the 'container' Node.
 * @prop {object} props.classes.item - Class for each 'item' Node.
 * @prop {removeItem} props.removeItem - Handler to delete and item.
 * @prop {string} props.field - The user property to handle.
 * @return {object} A React component
 */

const MapChips = (props) => {
  // prettier-ignore
  const {
    field,
    classes,
    array,
    removeItem,
  } = props;

  return (
    <Grid
      container
      spacing={16}
      className={classes.container}
      alignItems="center"
      direction="row"
      justify="center"
    >
      {array.map((value, index) => (
        <div key={`${value}${Math.random()}`}>
          <Chip
            id={`${index}$${value}`}
            icon={null}
            label={`${value}`}
            className={classes.item}
            deleteIcon={DoneIcon}
            onDelete={removeItem && removeItem(field, index)}
          />
        </div>
      ))}
    </Grid>
  );
};

MapChips.propTypes = {
  array: PropTypes.arrayOf(
    PropTypes.oneOf([PropTypes.string, PropTypes.number]),
  ).isRequired,
  classes: PropTypes.objectOf(PropTypes.object),
  removeItem: PropTypes.func,
  field: PropTypes.string,
};
MapChips.defaultProps = {
  removeItem: null,
  field: null,
};

MapChips.defaultProps = {
  classes: {},
};

export default MapChips;

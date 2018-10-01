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
 * @prop {String[]|Number[]} props.array - Array of Strings.
 * @prop {object} props.classes - Object defining the classes needed.
 * @prop {object} props.classes.container - Class for the 'container' Node.
 * @prop {object} props.classes.item - Class for each 'item' Node.
 * @prop {removeItem} props.removeItem - Handler to delete and item.
 * @return {object} A React component
 */

// prettier-ignore
const MapChips = (props) => {
  const { classes, array, removeItem } = props;

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
        // eslint-disable-next-line react/no-array-index-key
        <Chip
          key={`${value}${Math.random()}`}
          id={`${index}$${value}`}
          icon={null}
          label={value}
          className={classes.item}
          deleteIcon={DoneIcon}
          onDelete={removeItem(index)}
        />
      ))}
    </Grid>
  );
};

MapChips.propTypes = {
  classes: PropTypes.objectOf(PropTypes.object),
  array: PropTypes.arrayOf(
    // eslint-disable-next-line comma-dangle
    PropTypes.oneOf([PropTypes.string, PropTypes.number])
  ).isRequired,
  removeItem: PropTypes.func.isRequired,
};

MapChips.defaultProps = {
  classes: {},
};

export default MapChips;

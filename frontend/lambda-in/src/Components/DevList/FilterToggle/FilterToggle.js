import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Switch from '@material-ui/core/Switch';
import { ENABLE, DISABLE } from '../../constants';

const styles = {};

/**
 * Given filter data and event handlers for onClick and onChange, return a togglable filter comprised
 * of a Material UI FormGroup component containing a Material UI Button and Switch component.
 *
 * @param {Object} props - Component properties.
 * @param {Object} props.filter - Filter data.
 * @param {String} props.filter.displayName - Display name for filter toggle.
 * @param {String} props.filter.eleName - Name assigned to Switch component for event targetting.
 * @param {String} props.filter.toggleName - Name assigned to Button component for event targetting.
 * @param {Boolean} props.isChecked - True/False if Switch component is checked.
 * @param {Boolean} props.isEnabled - True/False if Filter Toggle is enabled.
 * @param {Function} props.onCheck - Switch component on change event handler.
 * @param {Function} props.onEnable - Button component on click event handler.
 * @return {Component} Material UI FormGroup component holding a toggleable filter.
 *
 * @see {@link https://material-ui.com/api/button/ } for the Button API.
 * @see {@link https://material-ui.com/api/form-control-label/ } for the FromControlLabel API.
 * @see {@link https://material-ui.com/api/form-group/ } for the FormGroup API.
 * @see {@link https://material-ui.com/api/switch/ } for the Switch API.
 * @see {@link https://material-ui.com/demos/selection-controls/#switches-with-formcontrollabel } for a
 * demo of the Switch Component.
 */
const FilterToggle = props => {
  return (
    <FormGroup row>
      <FormControlLabel
        control={
          <Switch
            name={props.filter.eleName}
            checked={props.isChecked}
            color="primary"
            onChange={props.onCheck}
          />
        }
        label={props.filter.displayName}
        disabled={!props.isEnabled}
      />
      <Button
        name={props.filter.toggleName}
        size="small"
        onClick={props.onEnable}
        data-filter-name={props.filter.eleName}
      >
        {props.isEnabled ? DISABLE : ENABLE}
      </Button>
    </FormGroup>
  );
};

FilterToggle.propTypes = {
  filter: PropTypes.shape({
    displayName: PropTypes.string.isRequired,
    eleName: PropTypes.string.isRequired,
    toggleName: PropTypes.string.isRequired
  }).isRequired,
  isChecked: PropTypes.bool.isRequired,
  isEnabled: PropTypes.bool.isRequired,
  onCheck: PropTypes.func.isRequired,
  onEnable: PropTypes.func.isRequired
};

export default withStyles(styles)(FilterToggle);

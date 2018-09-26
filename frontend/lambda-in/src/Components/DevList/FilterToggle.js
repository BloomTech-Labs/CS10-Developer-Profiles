import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Switch from '@material-ui/core/Switch';

const ENABLE = 'Enable';
const DISABLE = 'Disable';

const styles = {};

const FilterToggle = props => {
  return (
    <FormGroup row>
      <FormControlLabel
        control={
          <Switch
            name={props.filter.name}
            checked={props.checked}
            color="primary"
            onChange={props.onCheck}
          />
        }
        label={props.filter.label}
        disabled={!props.enable}
      />
      <Button
        name={props.filter.toggleName}
        size="small"
        onClick={props.onEnable}
        data-filter-name={props.filter.name}
      >
        {props.enable ? DISABLE : ENABLE}
      </Button>
    </FormGroup>
  );
};

FilterToggle.propTypes = {
  filter: PropTypes.shape({
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    toggleName: PropTypes.string.isRequired
  }).isRequired,
  checked: PropTypes.bool.isRequired,
  enable: PropTypes.bool.isRequired,
  onCheck: PropTypes.func.isRequired,
  onEnable: PropTypes.func.isRequired
};

export default withStyles(styles)(FilterToggle);

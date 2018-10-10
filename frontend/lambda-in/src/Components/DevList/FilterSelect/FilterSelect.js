import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Select from 'react-select';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import CancelIcon from '@material-ui/icons/Cancel';

const styles = {};

class FilterSelect extends Component {
  static inputComponent({ inputRef, ...props }) {
    return <div ref={inputRef} {...props} />;
  }

  static controlComponent(props) {
    const { inputComponent } = FilterSelect;
    const {
      selectProps, innerRef, children, innerProps,
    } = props;

    return (
      <TextField
        fullWidth
        InputProps={{
          inputComponent,
          inputProps: {
            className: selectProps.classes.input,
            inputRef: innerRef,
            children,
            ...innerProps,
          },
        }}
        {...selectProps.textFieldProps}
      />
    );
  }

  constructor(props) {
    super(props);
    this.state = {
      val: null,
    };
  }

  handleChange(value, name) {
    const { onChange } = this.props;
    this.setState({ [name]: value }, onChange);
  }

  render() {
    const {
      classes, placeholder, options, label,
    } = this.props;
    const { val } = this.state;

    return (
      <div className={classes.root}>
        <Select
          classes={classes}
          textFieldProps={{
            label,
            InputLabelProps: {
              shrink: true,
            },
          }}
          options={options}
          components={{ Control: FilterSelect.controlComponent }}
          value={val}
          onChange={value => this.handleChange(value, 'val')}
          placeholder={placeholder}
          isMulti
        />
      </div>
    );
  }
}

FilterSelect.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

FilterSelect.defaultProps = {
  placeholder: '',
};

export default withStyles(styles)(FilterSelect);

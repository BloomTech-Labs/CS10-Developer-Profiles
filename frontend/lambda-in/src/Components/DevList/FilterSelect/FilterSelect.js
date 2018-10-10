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

const styles = {
  filterSelect: {
    margin: '10px 0',
  },
  input: {
    display: 'flex',
    fontSize: '12px',
    fontWeight: 'lighter',
    padding: 0,
  },
  label: {
    color: '#333',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  paper: {
    position: 'absolute',
    zIndex: 2,
    left: 0,
    right: 0,
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
  },
};

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

  static menuComponent(props) {
    const { selectProps, innerProps, children } = props;

    return (
      <Paper square className={selectProps.classes.paper} {...innerProps}>
        {children}
      </Paper>
    );
  }

  static valueContainerComponent(props) {
    const { selectProps, children } = props;
    return <div className={selectProps.classes.valueContainer}>{children}</div>;
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
      <div className={classes.filterSelect}>
        <Select
          classes={classes}
          textFieldProps={{
            label,
            InputLabelProps: {
              shrink: true,
              className: classes.label,
            },
          }}
          options={options}
          components={{
            Control: FilterSelect.controlComponent,
            Menu: FilterSelect.menuComponent,
            ValueContainer: FilterSelect.valueContainerComponent,
          }}
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

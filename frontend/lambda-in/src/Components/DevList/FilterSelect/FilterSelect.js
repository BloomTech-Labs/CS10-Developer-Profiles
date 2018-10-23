import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Select from 'react-select';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import CancelIcon from '@material-ui/icons/Cancel';

const styles = {
  chip: {
    margin: '4px',
  },
  filterSelect: {
    margin: '40px 0',
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
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    padding: '6px 0',
  },
};

const inputComponent = ({ inputRef, ...props }) => <div ref={inputRef} {...props} />;

const controlComponent = (props) => {
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
};

const menuComponent = (props) => {
  const { selectProps, innerProps, children } = props;

  return (
    <Paper square className={selectProps.classes.paper} {...innerProps}>
      {children}
    </Paper>
  );
};

const multiValueComponent = (props) => {
  const {
    children, selectProps, isFocused, removeProps,
  } = props;

  return (
    <Chip
      tabIndex={-1}
      label={children}
      className={classNames(selectProps.classes.chip, {
        [selectProps.classes.chipFocused]: isFocused,
      })}
      onDelete={removeProps.onClick}
      deleteIcon={<CancelIcon {...removeProps} />}
    />
  );
};

const optionComponent = (props) => {
  const {
    children, innerRef, innerProps, isFocused, isSelected,
  } = props;

  return (
    <MenuItem
      buttonRef={innerRef}
      selected={isFocused}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400,
      }}
      {...innerProps}
    >
      {children}
    </MenuItem>
  );
};

const valueContainerComponent = (props) => {
  const { selectProps, children } = props; // eslint-disable-line react/prop-types
  return <div className={selectProps.classes.valueContainer}>{children}</div>;
};

const FilterSelect = (props) => {
  const {
    classes, filterName, label, onChange, options, placeholder, val,
  } = props;

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
          Control: controlComponent,
          Menu: menuComponent,
          MultiValue: multiValueComponent,
          Option: optionComponent,
          ValueContainer: valueContainerComponent,
        }}
        value={val}
        onChange={value => onChange(value, filterName)}
        placeholder={placeholder}
        isMulti
      />
    </div>
  );
};

FilterSelect.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  filterName: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  val: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ),
};

FilterSelect.defaultProps = {
  placeholder: '',
  val: '',
};

export default withStyles(styles)(FilterSelect);

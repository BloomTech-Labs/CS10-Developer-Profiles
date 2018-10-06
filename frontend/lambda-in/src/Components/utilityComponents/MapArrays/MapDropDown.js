import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DropDown from '../DropDown/DropDown';
import StateCapsule from '../StateCapsule/StateCapsule';

// eslint-disable-next-line object-curly-newline
const MapDropDown = ({ array, field, itemType, schema, propsAndLabels }) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  array.map((item, index) => (
    <DropDown
      header={item.title || item.degree}
      key={`${item.title || item.degree}${Math.random()}`}
    >
      <StateCapsule schema={schema} object={item}>
        {({ stateCapsule, removeItem }) => (
          <div className="dropdown-item-list blur-handler">
            <Fragment>
              <Button
                variant="outlined"
                color="primary"
                align="center"
                onClick={removeItem(field, index)}
              >
                delete
              </Button>

              {// prettier-ignore
              propsAndLabels.map(propLabel => (
                <div className="inputFieldLargeMultiline">
                  <TextField
                    id={`edit-${propLabel[0]}`}
                    label={propLabel[1]}
                    fullWidth
                    multiline
                    rowsMax="20"
                    value={stateCapsule[propLabel[0]]}
                    margin="normal"
                    variant="outlined"
                    inputProps={{
                      'data-field': field,
                      'data-itemtype': itemType,
                      'data-index': index,
                      'data-property': propLabel[0],
                      'data-value': stateCapsule[propLabel[0]],
                    }}
                  />
                </div>
              ))}
            </Fragment>
          </div>
        )}
      </StateCapsule>
    </DropDown>
  ));

MapDropDown.propTypes = {
  array: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  field: PropTypes.string.isRequired,
  itemType: PropTypes.string.isRequired,
  schema: PropTypes.shape({}).isRequired,
  propsAndLabels: PropTypes.arrayOf(PropTypes.array).isRequired,
};

export default MapDropDown;

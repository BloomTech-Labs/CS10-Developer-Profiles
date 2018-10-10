import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DropDown from '../DropDown/DropDown';
import StateCapsule from '../StateCapsule/StateCapsule';
import MapDropDown from '../MapArrays/MapDropDown';
import SEEKER_PROP_TYPES from '../../seekerPropTypes';

/**
 * Scaffolds a user-section. With create and edit blocks.
 *
 * @description Build two sections.
 * - One for creating a new array-item an add it to its corresponding user-property
 * - One for editing passed array-items.
 * @param {object} props -Required props.
 */
const ArraySection = (props) => {
  // prettier-ignore
  const {
    header,
    userInfo,
    field,
    itemType,
    schema,
  } = props;

  const propsAndLabels = Object.entries(schema);

  return (
    <DropDown header={header}>
      <DropDown className="arraysection-create" header={`Add new ${header}`}>
        <StateCapsule schema={schema} object={{}}>
          {({ stateCapsule, createItem }) => (
            <Fragment>
              <Button
                className="arraysection-button--create"
                variant="outlined"
                color="primary"
                align="center"
                onClick={createItem(field)}
              >
                Create
              </Button>
              {// prettier-ignore
              propsAndLabels.map(propLabel => (
                <div
                  // key={`${Math.random()}${Date.now()}`} UNABLE TO ADD 'KEY' - This line breaks
                  // the nested <TextField/> input onChange functionality
                  className="arraysection-field--new inputFieldLargeMultiline"
                >
                  <TextField
                    id={`new-${propLabel[0]}`}
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
                      'data-property': propLabel[0],
                      'data-value': stateCapsule[propLabel[0]],
                    }}
                  />
                </div>
              ))}
            </Fragment>
          )}
        </StateCapsule>
      </DropDown>
      <MapDropDown
        array={userInfo[field]}
        field={field}
        itemType={itemType}
        schema={schema}
        propsAndLabels={propsAndLabels}
      />
    </DropDown>
  );
};

ArraySection.propTypes = {
  header: PropTypes.string.isRequired,
  userInfo: SEEKER_PROP_TYPES.isRequired,
  field: PropTypes.string.isRequired,
  itemType: PropTypes.string.isRequired,
  schema: PropTypes.shape({}).isRequired,
};

export default ArraySection;

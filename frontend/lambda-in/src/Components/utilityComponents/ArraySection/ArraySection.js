import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DropDown from '../DropDown/DropDown';
import StateCapsule from '../StateCapsule/StateCapsule';
import MapDropDown from '../MapArrays/MapDropDown';

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
      <DropDown header={`Add new ${header}`}>
        <StateCapsule schema={schema} object={{}}>
          {({ stateCapsule, createItem }) => (
            <Fragment>
              <Button
                variant="outlined"
                color="primary"
                align="center"
                onClick={createItem(field)}
              >
                Create
              </Button>
              {propsAndLabels.map((propLabel, index) => (
                <div className="inputFieldLargeMultiline">
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
  userInfo: PropTypes.shape({}).isRequired,
  field: PropTypes.string.isRequired,
  itemType: PropTypes.string.isRequired,
  schema: PropTypes.shape({}).isRequired,
};

export default ArraySection;

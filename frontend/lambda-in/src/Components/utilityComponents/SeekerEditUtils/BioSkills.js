import React, { Fragment } from 'react';
import TextField from '@material-ui/core/TextField';
import DropDown from '../DropDown/DropDown';
import MapChips from '../MapArrays/MapChips';
import ArrayController from '../MapArrays/ArrayController';

/**
 * Render the Developer's 'summary' and 'topSkills' fields.Fragment
 *
 * @function
 * @return {object} A React component.
 */
// eslint-disable-next-line arrow-parens
const BioSkills = props => {
  // eslint-disable-next-line react/prop-types
  const { userInfo, setFS } = props;

  return (
    <Fragment>
      <DropDown header="Biio and Skills">
        <div className="inputFieldLargeMultiline">
          <TextField
            id="summary"
            index="an index"
            label="Your Bio"
            fullWidth
            multiline
            rowsMax="20"
            value={userInfo.summary}
            margin="normal"
            variant="outlined"
          />
        </div>
        {/* TODO */}
        <ArrayController
          title="Top Skills"
          field="topSkills"
          setFS={setFS}
          arr={userInfo.topSkills}
        >
          {/* eslint-disable-next-line object-curly-newline */}
          {({ handleArrayControllerState, removeItem, newItem, arr }) => (
            <Fragment>
              <div
                className="inputFieldLargeMultiline"
                onChange={handleArrayControllerState}
              >
                <TextField
                  id="newItem"
                  label="Top skills"
                  fullWidth
                  multiline
                  rowsMax="4"
                  value={newItem}
                  margin="normal"
                  variant="outlined"
                />
              </div>
              {/* <MapUnorderedList array={arr} /> */}
              <MapChips field="topSkills" array={arr} removeItem={removeItem} />
            </Fragment>
          )}
        </ArrayController>

        {/* TODO: Add summary - enable uploading a file */}
      </DropDown>
    </Fragment>
  );
};

export default BioSkills;

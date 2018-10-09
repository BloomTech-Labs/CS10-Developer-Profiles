import React, { Fragment } from 'react';
import TextField from '@material-ui/core/TextField';
import DropDown from '../../utilityComponents/DropDown/DropDown';
import MapChips from '../../utilityComponents/MapArrays/MapChips';
import ArrayController from '../../utilityComponents/MapArrays/ArrayController';
import StateCapsule from '../../utilityComponents/StateCapsule/StateCapsule';

/**
 * Render the Developer's 'summary' and 'topSkills' fields.Fragment
 *
 * @function
 * @return {object} A React component.
 */
// eslint-disable-next-line arrow-parens
const BioSkills = (props) => {
  // eslint-disable-next-line react/prop-types
  const { userInfo } = props;

  const field = 'topSkills';
  const schema = {
    summary: userInfo.summary,
    topSkills: userInfo.topSkills,
  };

  return (
    <StateCapsule schema={schema} object={schema}>
      {({ stateCapsule, removeItem }) => (
        <DropDown header="Biio and Skills">
          <div className="inputFieldLargeMultiline">
            <TextField
              id="edit-summary"
              label="Your Bio"
              fullWidth
              multiline
              rowsMax="20"
              value={stateCapsule.summary}
              margin="normal"
              variant="outlined"
            />
          </div>
          {/* TODO */}
          <ArrayController
            itemSchema="singleItem"
            title="Top Skills"
            field={field}
            arr={stateCapsule.topSkills}
          >
            {/* eslint-disable-next-line object-curly-newline */}
            {({ arr }) => (
              <Fragment>
                <div className="inputFieldLargeMultiline">
                  <TextField
                    id="edit-topSkills_edit"
                    label="Add skills - press enter"
                    fullWidth
                    multiline
                    rowsMax="4"
                    value={stateCapsule.topSkills_edit}
                    margin="normal"
                    variant="outlined"
                    inputProps={{
                      // info for the DevInfoEditz's onBlur handler.
                      'data-chips': true,
                      'data-field': field,
                      'data-itemType': 'string',
                      'data-value': stateCapsule.topSkills.join('-'),
                    }}
                  />
                </div>
                {/* <MapUnorderedList array={arr} /> */}
                <MapChips field={field} array={arr} removeItem={removeItem} />
              </Fragment>
            )}
          </ArrayController>

          {/* TODO: Add summary - enable uploading a file */}
        </DropDown>
      )}
    </StateCapsule>
  );
};

export default BioSkills;

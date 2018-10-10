import TextField from '@material-ui/core/TextField';
import React from 'react';
import SEEKER_PROP_TYPES from '../../seekerPropTypes';
import DropDown from '../../utilityComponents/DropDown/DropDown';
import MapChips from '../../utilityComponents/MapArrays/MapChips';
import StateCapsule from '../../utilityComponents/StateCapsule/StateCapsule';

/**
 * Render the Developer's 'summary' and 'topSkills' fields.
 *
 * @function
 * @return {object} A React component.
 */
const BioSkills = ({ userInfo }) => {
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
          <MapChips
            field={field}
            array={stateCapsule.topSkills}
            removeItem={removeItem}
          />
          {/* TODO: Add summary - enable uploading a file */}
        </DropDown>
      )}
    </StateCapsule>
  );
};

BioSkills.propTypes = {
  userInfo: SEEKER_PROP_TYPES.isRequired,
};

export default BioSkills;

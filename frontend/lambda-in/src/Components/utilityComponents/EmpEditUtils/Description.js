import React, { Fragment } from 'react';
import DropDown from '../DropDown/DropDown';
import TextField from '@material-ui/core/TextField';
import MapChips from '../MapArrays/MapChips';

const Description = props => {
  const { userInfo } = props;

  return (
    <Fragment>
      <DropDown header="Description of the project">
        <div className="inputFieldLargeMultiline">
          <TextField
            id="description"
            label="description"
            fullWidth
            multiline
            rowsMax="4"
            value={userInfo.description}
            margin="normal"
            variant="outlined"
          />
        </div>
        {/* <MapChips getGS={props.getGS} setGS={props.setGS} field="topSkills" array={userInfo.topSkills} /> */}

        {/* TODO: Add summary - enable uploading a file */}
      </DropDown>
    </Fragment>
  );
};

export default Description;

import React, { Fragment } from 'react';
import DropDown from '../DropDown';
import TextField from '@material-ui/core/TextField';

const BioSkills = props => {
  const { userInfo } = props;

  return (
    <Fragment>
      <DropDown header="tell us something about yourself!">
        <div className="inputFieldLargeMultiline">
          <TextField
            id="summary"
            label="Your Bio"
            fullWidth
            multiline
            rowsMax="4"
            value={userInfo.summary}
            margin="normal"
            variant="outlined"
          />
        </div>
        <div className="inputFieldLargeMultiline">
          <TextField
            id="topSkills"
            label="Top skills"
            fullWidth
            multiline
            rowsMax="4"
            value={userInfo.topskill}
            margin="normal"
            variant="outlined"
          />
        </div>
      </DropDown>
    </Fragment>
  );
};

export default BioSkills;

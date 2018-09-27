import React, { Fragment } from 'react';
import DropDown from '../DropDown/DropDown';
import TextField from '@material-ui/core/TextField';

const Experience = props => {
  const { userInfo } = props;

  return (
    <Fragment>
      <DropDown header="Experience">
        <div className="inputFieldLargeMultiline">
          <TextField
            id="projectTitle"
            label="Project Title"
            fullWidth
            multiline
            rowsMax="4"
            value={userInfo.projectTitle}
            margin="normal"
            variant="outlined"
          />
        </div>
      </DropDown>
    </Fragment>
  );
};

export default Experience;

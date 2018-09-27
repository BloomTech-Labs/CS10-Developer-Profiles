import React, { Fragment } from 'react';
import DropDown from '../DropDown/DropDown';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';

const Education = props => {
  const { userInfo } = props;

  return (
    <Fragment>
      <DropDown header="Education">
        <Paper className="paperContainer">
          <DropDown header="School 1">
            <div className="inputFieldLargeMultiline">
              <TextField
                id="education.school"
                label="School"
                fullWidth
                value={userInfo.education.school}
                margin="normal"
                variant="outlined"
              />
            </div>

            <div className="inputFieldLargeMultiline">
              <TextField
                id="projectLink"
                label="Project Link"
                fullWidth
                multiline
                rowsMax="4"
                value={userInfo.projectLink}
                margin="normal"
                variant="outlined"
              />
            </div>

            <div className="inputFieldLargeMultiline">
              <TextField
                id="projectRepo"
                label="Project Repo"
                fullWidth
                multiline
                rowsMax="4"
                value={userInfo.projectRepo}
                margin="normal"
                variant="outlined"
              />
            </div>
          </DropDown>
        </Paper>
      </DropDown>
    </Fragment>
  );
};

export default Education;

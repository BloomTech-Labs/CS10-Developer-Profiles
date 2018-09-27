import React, { Fragment } from 'react';
import DropDown from '../DropDown/DropDown';
import TextField from '@material-ui/core/TextField';

const Projects = props => {
  const { userInfo } = props;

  return (
    <Fragment>
      <DropDown header="Add your best projects">
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
    </Fragment>
  );
};

export default Projects;

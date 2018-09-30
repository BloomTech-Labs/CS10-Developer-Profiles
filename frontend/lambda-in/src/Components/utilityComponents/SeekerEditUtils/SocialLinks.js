import React, { Fragment } from 'react';
import TextField from '@material-ui/core/TextField';
import DropDown from '../DropDown/DropDown';

// eslint-disable-next-line arrow-parens
const SocialLinks = props => {
  // eslint-disable-next-line react/prop-types
  const { userInfo } = props;

  return (
    <Fragment>
      <DropDown header="Social links">
        <div className="inputField">
          <TextField id="github" label="github" fullWidth value={userInfo.github} margin="normal" variant="outlined" />
        </div>

        <div className="inputField">
          <TextField
            id="linkedin"
            label="Linkedin"
            fullWidth
            value={userInfo.linkedin}
            margin="normal"
            variant="outlined"
          />
        </div>

        <div className="inputField">
          <TextField
            id="portfolio"
            label="Portfolio Website"
            fullWidth
            value={userInfo.portfolio}
            margin="normal"
            variant="outlined"
          />
        </div>
      </DropDown>
    </Fragment>
  );
};

export default SocialLinks;

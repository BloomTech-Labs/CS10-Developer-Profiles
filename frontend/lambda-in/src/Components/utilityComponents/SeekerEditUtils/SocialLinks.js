import React, { Fragment } from 'react';
import TextField from '@material-ui/core/TextField';
import DropDown from '../DropDown/DropDown';
import StateCapsule from '../StateCapsule/StateCapsule';

// eslint-disable-next-line arrow-parens
const SocialLinks = (props) => {
  // eslint-disable-next-line react/prop-types
  const { userInfo } = props;

  const schema = {
    github: userInfo.github,
    linkedin: userInfo.linkedin,
    portfolio: userInfo.portfolio,
  };

  return (
    <StateCapsule schema={schema} object={schema}>
      {({ stateCapsule }) => (
        <DropDown header="Social links">
          <div className="inputField">
            <TextField
              id="edit-github"
              label="github"
              fullWidth
              value={stateCapsule.github}
              margin="normal"
              variant="outlined"
            />
          </div>

          <div className="inputField">
            <TextField
              id="edit-linkedin"
              label="Linkedin"
              fullWidth
              value={stateCapsule.linkedin}
              margin="normal"
              variant="outlined"
            />
          </div>

          <div className="inputField">
            <TextField
              id="edit-portfolio"
              label="Portfolio Website"
              fullWidth
              value={stateCapsule.portfolio}
              margin="normal"
              variant="outlined"
            />
          </div>
        </DropDown>
      )}
    </StateCapsule>
  );
};

export default SocialLinks;

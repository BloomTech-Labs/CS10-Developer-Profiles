import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import DropDown from '../../utilityComponents/DropDown/DropDown';
import StateCapsule from '../../utilityComponents/StateCapsule/StateCapsule';

const SocialLinks = ({ userInfo }) => {
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

SocialLinks.propTypes = {
  userInfo: PropTypes.shape({}).isRequired,
};

export default SocialLinks;

import React, { Fragment } from 'react';
import TextField from '@material-ui/core/TextField';
import StateCapsule from '../StateCapsule/StateCapsule';

// eslint-disable-next-line arrow-parens
const BasicInfo = props => {
  const { userInfo } = props;

  const schema = {
    firstName: userInfo.firstName,
    lastName: userInfo.lastName,
    desiredTitle: userInfo.desiredTitle,
    currentLocation: userInfo.currentLocation,
  };

  return (
    <Fragment>
      <StateCapsule schema={schema} object={schema}>
        {({ stateCapsule }) => (
          <div className="smallInputContainer">
            <div className="expansionPanel">
              <div className="inputField">
                <TextField
                  id="new-firstName"
                  label="First Name"
                  fullWidth
                  value={stateCapsule.firstName}
                  margin="normal"
                  variant="outlined"
                />
              </div>

              <div className="inputField">
                <TextField
                  id="new-lastName"
                  label="Last Name"
                  fullWidth
                  value={stateCapsule.lastName}
                  margin="normal"
                  variant="outlined"
                />
              </div>

              <div className="inputField">
                <TextField
                  id="new-desiredTitle"
                  label="Desired Title"
                  fullWidth
                  value={stateCapsule.desiredTitle}
                  margin="normal"
                  variant="outlined"
                />
              </div>

              {/* TODO : WIRE InputGeolocation component here */}
              <div className="inputField">
                <TextField
                  id="new-currentLocation"
                  label="Current Location"
                  fullWidth
                  value={stateCapsule.currentLocation}
                  margin="normal"
                  variant="outlined"
                />
              </div>
            </div>
            <div className="imageContainer">
              <img
                className="displayPic"
                src={`https://robohash.org/1${stateCapsule.firstName}`}
                alt="Italian "
              />
            </div>
          </div>
        )}
      </StateCapsule>
    </Fragment>
  );
};

export default BasicInfo;

import React from 'react';
import TextField from '@material-ui/core/TextField';

const BasicInfo = props => {
  const { userInfo } = props;

  return (
    <div className="smallInputContainer">
      <div className="expansionPanel">
        <div className="inputField">
          <TextField
            id="firstName"
            label="First Name"
            fullWidth
            value={userInfo.firstName}
            margin="normal"
            variant="outlined"
          />
        </div>

        <div className="inputField">
          <TextField
            id="lastName"
            label="Last Name"
            fullWidth
            value={userInfo.lastName}
            margin="normal"
            variant="outlined"
          />
        </div>

        <div className="inputField">
          <TextField
            id="desiredTitle"
            label="Desired Title"
            fullWidth
            value={userInfo.desiredTitle}
            margin="normal"
            variant="outlined"
          />
        </div>

        <div className="inputField">
          <TextField
            id="currentLocation"
            label="Current Location"
            fullWidth
            value={userInfo.currentLocation}
            margin="normal"
            variant="outlined"
          />
        </div>
      </div>
      <div className="imageContainer">
        <img className="displayPic" src={`https://robohash.org/1${userInfo.firstName}`} alt="Italian " />
      </div>
    </div>
  );
};

export default BasicInfo;

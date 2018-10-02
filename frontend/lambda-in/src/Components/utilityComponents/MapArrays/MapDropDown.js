import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DropDown from '../DropDown/DropDown';

// prettier-ignore
const MapDropDown = ({ array, classes, removeItem }) => array.map((item, index) => (
  <DropDown header={item.title} key={`${item.title}${Math.random()}`}>
    <Button
      variant="outlined"
      color="primary"
      align="center"
      onClick={removeItem(index)}
    >
      X - delete
    </Button>
    <div className={`dropdown-item-list ${classes}`}>
      <TextField
        id={`edit-${index}-title`}
        label="Email"
        value={item.title}
        margin="normal"
      />

      <TextField
        id={`edit-${index}-description`}
        label="password"
        value={item.description}
        margin="normal"
      />
      <TextField
        id={`edit-${index}-img`}
        label="Email"
        value={item.img}
        margin="normal"
      />

      <TextField
        id={`edit-${index}-link`}
        label="password"
        value={item.link}
        margin="normal"
      />

      <TextField
        id={`edit-${index}-repo`}
        label="password"
        value={item.repo}
        margin="normal"
      />
    </div>
  </DropDown>
));
export default MapDropDown;

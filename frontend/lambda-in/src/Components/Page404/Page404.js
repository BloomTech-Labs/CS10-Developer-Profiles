import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

export default () => (
  <div>
    <br />
    <h5>Órale, are you lost?</h5>
    <br />
    <p>the page you are looking for is no here...</p>
    <br />
    <Link to="/">
      <Button>Go back to home</Button>
    </Link>
  </div>
);

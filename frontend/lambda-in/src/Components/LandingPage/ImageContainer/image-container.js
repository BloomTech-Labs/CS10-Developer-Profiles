import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import landingImage from '../../../static/images/landingImage.png';
import './image-container.css';

import AOS from 'aos';
import 'aos/dist/aos.css';

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';


const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#5C6BC0',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      main: '#B79A3F',
      contrastText: '#fff',
    },
  },
});

AOS.init();

const backgroundImage = {
  backgroundImage: `url(${landingImage})`,
};


/* eslint-disable react/prefer-stateless-function */
class ImageContainer extends React.Component {
  render() {
    return (
      <div data-aos="fade-zoom-in"
      data-aos-easing="ease-in-back"
      data-aos-duration="1500"
      data-aos-offset="0" className='box'>
        <div style={backgroundImage} className='image'></div>  
        <div className='cta'>
          <h1 className='header'>Meet a Dev</h1>
          <p className='text1'>Land the Perfect Job</p>
          <p className='text2'>Find the Perfect Employee</p>
          <MuiThemeProvider theme={theme}>
            <span className='button1'>
              <Button variant='contained' color='secondary' component={Link} to='/employer-signup'>Employer Sign-Up</Button>
            </span>
            <span className='button2'>  
              <Button variant='contained' color='primary' component={Link} to='/dev-signup'>Developer Sign-Up</Button>
            </span>
          </MuiThemeProvider>
        </div>
      </div>
    );
  }
}
/* eslint-enable react/prefer-stateless-function */

export default ImageContainer;

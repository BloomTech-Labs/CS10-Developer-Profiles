import React from 'react';
import Button from '@material-ui/core/Button';
import GSAP from 'react-gsap-enhancer';
import landingImage from '../../../static/images/landingImage.png';
import './image-container.css';

import AOS from 'aos';
import 'aos/dist/aos.css';

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
      data-aos-offset="0" style={backgroundImage} className="image-container">
        <h1 className="cta-1">
          Your business is your quest,
          <br />
          We can help you find the perfect
          <span className="party"> party</span>
          !
        </h1>
        <span className="search">
          <input placeholder="What are you looking for?" />
        </span>
        <span className="search-button">
          <Button variant="contained" color="secondary">
            Get Started
          </Button>
        </span>
        <p className="create-text">
          <span className="bold">Create your resume</span>
          - Try our Fill-N-Hired!® resume form
        </p>
        <p className="employer-text">
          <span className="bold">Employers:</span>
          Check the new payment method
        </p>
      </div>
    );
  }
}
/* eslint-enable react/prefer-stateless-function */

export default ImageContainer;

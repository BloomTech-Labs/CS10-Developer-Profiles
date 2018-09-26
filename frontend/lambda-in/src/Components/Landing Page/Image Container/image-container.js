import React from 'react';
import Button from '@material-ui/core/Button';
import landingImage from '../../../static/images/landingImage.png';
import './image-container.css';
import GSAP from 'react-gsap-enhancer';

const backgroundImage = {
  backgroundImage: `url(${landingImage})`,
};

class ImageContainer extends React.Component {
  render() {
    return (
      <div style={backgroundImage} className="image-container">
        <h1 className="cta-1">
          Your business is your quest,
          <br /> We can help you find the perfect
          <span className="party"> party</span>!
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
          <span className="bold">Create your resume</span> - Try our
          Fill-N-Hired!® resume form
        </p>
        <p className="employer-text">
          <span className="bold">Employers:</span> Check the new payment method
        </p>
      </div>
    );
  }
}

export default GSAP()(ImageContainer);

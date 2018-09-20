import React from 'react';
import NavBar from '../Navbar/navbar';
import ImageContainer from './Image Container/image-container';
import Footer from './Footer/footer';

class LandingPage extends React.Component {
  render() {
    return (
      <div>
        <ImageContainer />
        <Footer />
      </div>
    );
  }
}

export default LandingPage;

import React from 'react';
import NavBar from '../Navbar/navbar';
import ImageContainer from './Image Container/image-container';
import Footer from './Footer/footer';

class LandingPage extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        <ImageContainer />
        <Footer />
      </div>
    );
  }
}

export default LandingPage;

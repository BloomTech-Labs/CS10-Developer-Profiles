import React from 'react';
import NavBar from '../../Components/Navbar/navbar';
import ImageContainer from './Image Container/image-container.js';
import Footer from './Footer/footer.js';

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

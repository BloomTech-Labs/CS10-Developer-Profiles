import React from 'react';
import NavBar from './Navbar/navbar.js';
import ImageContainer from './Image Container/image-container.js'

class LandingPage extends React.Component {
    render() {
        return (
            <div>
            <NavBar />
            <ImageContainer />
            </div>
        )
    }
};


export default LandingPage;
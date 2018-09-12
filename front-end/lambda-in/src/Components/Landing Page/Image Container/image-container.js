import React from 'react';
import './image-container.css';
import Button from '@material-ui/core/Button';

class ImageContainer extends React.Component {
    render () {
        return (
            <div className='image-container'>
                <h1 className='cta-1'>
                Your business is your quest,
                <br/> We can help you find the perfect
                <span className= 'party'> party</span>!
                </h1>
                <span className='search'><input placeholder='What are you looking for?' /></span>
                <span className='search-button'><Button variant="contained" color="secondary">Get Started</Button></span>
            </div>
            
        )
    }
}

export default ImageContainer;
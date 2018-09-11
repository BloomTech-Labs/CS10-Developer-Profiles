import React from 'react';
import './image-container.css';

class ImageContainer extends React.Component {
    render () {
        return (
            <div className='image-container'>
                <img className='image' src='https://files.slack.com/files-pri/T4JUEB3ME-FCQQ89V7B/landingimage.png'/>
                <h1>Your business is your quest, we can help you find the perfect party</h1>
                <h2>Our developers train with the best and are ready to carry your CEO to victory</h2>
            </div>
        )
    }
}

export default ImageContainer;
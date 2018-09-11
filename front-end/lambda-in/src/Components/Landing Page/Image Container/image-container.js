import React from 'react';
import './image-container.css';

class ImageContainer extends React.Component {
    render () {
        return (
            <div className='image-container'>
                <img className='image' src='https://files.slack.com/files-pri/T4JUEB3ME-FCQQ89V7B/landingimage.png'/>
                <h1>Your business is your quest, we can help you find the perfect party</h1>
            </div>
        )
    }
}

export default ImageContainer;
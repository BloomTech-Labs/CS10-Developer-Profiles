import React from 'react';
import './footer.css';

class Footer extends React.Component {
    render() {
        return (
            <div className='footer'>
                <div className='footer-left'><a href=''>Find developers</a> - <a href=''>About</a> - <a href=''>Help Center</a></div>
                <div className='footer-right'>©2018 - Cookies, Privacy and Terms</div>
            </div>
        )
    }
};

export default Footer;
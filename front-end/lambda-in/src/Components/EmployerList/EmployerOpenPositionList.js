import React, { Component } from 'react'
import NavBar from '../../Components/Navbar/navbar';
import EmployerOpenPositionCard from './EmployerOpenPositionCard';

class EmplyoerOpenPositionList extends React.Component {
    render() {
        return(
            <div>
                <NavBar />
                <EmployerOpenPositionCard />
            </div>
        );
    }
}

export default EmplyoerOpenPositionList;
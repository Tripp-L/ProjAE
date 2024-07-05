import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import './Navbar.css';

import civilizationsIcon from '../assets/images/civ-icon.png';  
import artifactsIcon from '../assets/images/artifacts-icon.png';  
import eventsIcon from '../assets/images/timeline-icon.png';  
import regionsIcon from '../assets/images/regions-icon.png';  

const Navbar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark border border-light">
      <div className="container d-flex justify-content-around">
        <Link to="/civilizations" className="nav-item">
          <img src={civilizationsIcon} alt="Civilizations" className="nav-icon" />
          <span className="nav-text">Civilizations</span>
        </Link>
        <Link to="/artifacts" className="nav-item">
          <img src={artifactsIcon} alt="Artifacts" className="nav-icon" />
          <span className="nav-text">Artifacts</span>
        </Link>
        <Link to="/events" className="nav-item">
          <img src={eventsIcon} alt="Events" className="nav-icon" />
          <span className="nav-text">Events</span>
        </Link>
        <Link to="/regions" className="nav-item">
          <img src={regionsIcon} alt="Regions" className="nav-icon" />
          <span className="nav-text">Regions</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;


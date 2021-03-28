import React from 'react';
import { Link } from 'gatsby';
import logo from '../img/assets/Logos/logo.svg';

const Logo = ({ setActiveTab }) => {
  return (
    <Link to="/" onClick={() => setActiveTab('home')}>
      <img src={logo} alt="logo" height="160px" width="160px" />
    </Link>
  );
};

export default Logo;

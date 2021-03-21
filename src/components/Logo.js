import React from 'react';
import { Link } from 'gatsby';
import logo from '../img/assets/Logos/reflektor_logo_small.png';

const Logo = () => {
  return (
    <Link to="/">
      <img src={logo} alt="logo" />
    </Link>
  );
};

export default Logo;

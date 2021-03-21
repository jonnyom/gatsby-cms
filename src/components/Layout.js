import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children, location }) => {
  return (
    <>
      <Navbar location={location} />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;

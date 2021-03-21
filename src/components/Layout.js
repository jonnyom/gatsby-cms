import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer';

const Layout = ({ children, location }) => {
  return (
    <>
      <NavBar location={location} />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;

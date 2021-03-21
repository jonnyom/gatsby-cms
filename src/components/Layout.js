import React from 'react';
import { NavBar, Footer } from '../components';

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

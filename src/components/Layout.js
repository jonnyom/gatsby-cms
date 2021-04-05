import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Helmet } from 'react-helmet';

const Layout = ({ children, location, title }) => {
  return (
    <>
      <Helmet title={title} />
      <Navbar location={location} />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;

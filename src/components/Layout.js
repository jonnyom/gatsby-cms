import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Helmet } from 'react-helmet';

const Layout = ({ children, location, title }) => {
  const aboutRef = React.useRef();

  React.useEffect(() => {
    if (aboutRef.current && location.href.includes('#')) {
      aboutRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [aboutRef.current]);

  return (
    <>
      <Helmet title={title} />
      <Navbar location={location} />
      <main>
        {React.cloneElement(children, { ...children.props, ref: aboutRef })}
      </main>
      <Footer />
    </>
  );
};

export default Layout;

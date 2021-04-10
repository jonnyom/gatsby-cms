import React from 'react';
import Logo from './Logo';
import { Link } from 'gatsby';
import { useOutsideAlerter } from '../hooks/useOutsideClick';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Pivot as Hamburger } from 'hamburger-react';

const links = [
  {
    link: '#about',
    name: 'About',
    tabName: 'about'
  },
  {
    link: 'contact',
    name: 'Contact',
    tabName: 'contact'
  },
  {
    link: 'products',
    name: 'Products',
    tabName: 'products'
  },
  { link: 'coaching-tips', name: 'Coaching Tips', tabName: 'coaching-tips' }
];

const NavList = ({ active, checkActive, setActive }) => {
  const navClass =
    'lg:p-4 py-3 px-0 block border-b-2 border-transparent text-secondary hover:border-primary';

  return (
    <>
      {links.map((link, ix) => {
        const isAnchorTag = link.link.includes('#');
        return (
          <li key={`${link}-${ix}`}>
            {isAnchorTag && active === 'home' ? (
              <a
                href={link.link}
                className={`${navClass} ${checkActive(link.tabName)}`}
                onClick={() => {
                  setActive(link.tabName);
                }}
              >
                {link.name}
              </a>
            ) : (
              <Link
                to={`/${link.link}`}
                className={`${navClass} ${checkActive(link.tabName)}`}
                onClick={() => setActive(link.tabName)}
              >
                {link.name}
              </Link>
            )}
          </li>
        );
      })}
    </>
  );
};

const MenuDiv = styled.div`
  ${({ isOpen }) => (isOpen ? 'display: block' : '')};
`;

const Navbar = ({ location }) => {
  const currentPath = location.href
    ? new URL(location.href).pathname.split('/')[1]
    : undefined;
  const currentPage = currentPath === 'tags' ? 'coaching-tips' : currentPath;
  const [isOpen, setIsOpen] = React.useState(false);
  const [active, setActive] = React.useState(currentPage || 'home');
  const [isAnimating, setIsAnimating] = React.useState(false);
  const activeTab = 'text-primary border-b-2 border-primary';
  const inactiveTab = 'text-secondary hover:text-primary';
  const wrapperRef = React.useRef(null);
  useOutsideAlerter(wrapperRef, () => setIsOpen(false));

  const checkActive = (tab) => (active === tab ? activeTab : inactiveTab);

  return (
    <motion.header
      className="lg:px-16 px-6 bg-white flex flex-wrap items-center lg:py-0 py-2"
      animate={{ height: isOpen ? 250 : 60 }}
      transition={{ duration: 0.5 }}
      onAnimationComplete={() => setIsAnimating(false)}
    >
      <div
        className={`${isAnimating ? 'hidden' : ''} flex-1 flex justify-between`}
      >
        <Logo setActiveTab={setActive} />
      </div>

      <div
        className="pointer-cursor lg:hidden block"
        onClick={() => setIsAnimating(true)}
      >
        <Hamburger toggled={isOpen} toggle={setIsOpen} direction="left" />
      </div>

      <MenuDiv
        className={`${
          isOpen ? '' : 'hidden'
        } lg:flex lg:items-center lg:w-auto w-full`}
        isOpen={isOpen}
        ref={wrapperRef}
      >
        <nav>
          <ul className="lg:flex items-center justify-between text-base text-gray-700 pt-4 lg:pt-0">
            <NavList
              checkActive={checkActive}
              active={active}
              setActive={setActive}
            />
          </ul>
        </nav>
      </MenuDiv>
    </motion.header>
  );
};

export default Navbar;

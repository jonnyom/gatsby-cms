import React from 'react';
import Logo from './Logo';
import { Link } from 'gatsby';
import { Pivot as Hamburger } from 'hamburger-react';

const links = [
  {
    link: '#about',
    name: 'About',
    tabName: 'about'
  },
  {
    link: 'individual-coaching',
    name: 'Individual Coaching',
    tabName: 'individual-coaching'
  },
  {
    link: 'corporate-wellbeing',
    name: 'Corporate Wellbeing',
    tabName: 'corporate-wellbeing'
  },
  {
    link: 'online-resources',
    name: 'Online Resources',
    tabName: 'online-resources'
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

const NavBar = ({ location }) => {
  const currentPath = location.href
    ? new URL(location.href).pathname.split('/')[1]
    : undefined;
  const currentPage = currentPath === 'tags' ? 'coaching-tips' : currentPath;
  const [active, setActive] = React.useState(currentPage || 'home');
  const activeTab = 'text-primary border-b-2 border-primary';
  const inactiveTab = 'text-secondary hover:text-primary';

  const checkActive = (tab) => (active === tab ? activeTab : inactiveTab);
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  return (
    <>
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-lightBlue-500 mb-3">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Logo setActiveTab={setActive} />
            <button
              className="text-secondary cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <Hamburger toggled={navbarOpen} direction="left" />
            </button>
          </div>
          <div
            className={
              'lg:flex flex-grow items-center' +
              (navbarOpen ? ' flex' : ' hidden')
            }
            id="example-navbar-danger"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <NavList
                checkActive={checkActive}
                active={active}
                setActive={setActive}
              />
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

const NavList = ({ active, checkActive, setActive }) => {
  const navClass =
    'text-lg px-3 py-2 flex items-center leading-snug block border-b-2 border-transparent text-secondary hover:border-primary';

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

export default NavBar;

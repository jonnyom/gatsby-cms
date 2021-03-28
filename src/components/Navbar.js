import React from 'react';
import Logo from './Logo';
import { Link } from 'gatsby';
import { Transition } from '@headlessui/react';
import { useOutsideAlerter } from '../hooks/useOutsideClick';
import logo from '../img/assets/Logos/logo.svg';

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
  { link: 'coaching-tips', name: 'Coaching Tips', tabName: 'coaching-tips' }
];

const NavList = ({ active, checkActive, setActive, isOpenMobile }) => {
  const mobileNav = 'px-3 py-1 text-base font-medium sm:px-1';
  const baseClass = 'py-2 px-6 flex';

  const navClass = isOpenMobile ? mobileNav : baseClass;
  return (
    <>
      {links.map((link) => {
        const isAnchorTag = link.link.includes('#');
        return (
          <li>
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

const Navbar = ({ location }) => {
  const currentPath = location.href
    ? new URL(location.href).pathname.split('/')[1]
    : undefined;
  const currentPage = currentPath === 'tags' ? 'coaching-tips' : currentPath;
  const [active, setActive] = React.useState(currentPage || 'home');
  const [isOpen, setIsOpen] = React.useState(false);
  const activeTab = 'text-primary border-b-2 border-primary';
  const inactiveTab = 'text-secondary hover:text-primary';
  const wrapperRef = React.useRef(null);
  useOutsideAlerter(wrapperRef, () => setIsOpen(false));

  const checkActive = (tab) => (active === tab ? activeTab : inactiveTab);

  return (
    <header className="h-24 sm:h-22 flex items-center z-30 w-full">
      <nav>
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="uppercase text-gray-800 dark:text-white font-black text-3xl">
            <Logo setActiveTab={setActive} />
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <ul className="font-sen text-gray-800 dark:text-white uppercase text-lg lg:flex items-center hidden">
                  <NavList
                    checkActive={checkActive}
                    active={active}
                    setActive={setActive}
                    isOpenMobile={isOpen}
                  />
                </ul>
                <div ref={wrapperRef} className="-mr-2 flex md:hidden">
                  {!isOpen && (
                    <button
                      onClick={() => setIsOpen(!isOpen)}
                      type="button"
                      className="lg:hidden flex flex-col ml-4"
                      aria-controls="mobile-menu"
                      aria-expanded="false"
                    >
                      <span className="w-6 h-1 bg-gray-800 dark:bg-white mb-1"></span>
                      <span className="w-6 h-1 bg-gray-800 dark:bg-white mb-1"></span>
                      <span className="w-6 h-1 bg-gray-800 dark:bg-white mb-1"></span>
                    </button>
                  )}
                </div>
                <Transition
                  show={isOpen}
                  enter="transition ease-out duration-100 transform"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="transition ease-in duration-75 transform"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  {() => (
                    <div
                      ref={wrapperRef}
                      className="md:hidden"
                      id="mobile-menu"
                    >
                      <ul className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <NavList
                          active={active}
                          checkActive={checkActive}
                          setActive={setActive}
                          isOpenMobile={isOpen}
                        />
                      </ul>
                    </div>
                  )}
                </Transition>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

import React from 'react';
import Logo from './Logo';
import { Link } from 'gatsby';

const NavBar = () => {
  const [active, setActive] = React.useState('home');
  const activeTab = 'text-primary border-b-2 border-primary';
  const inactiveTab = 'text-secondary hover:text-primary';

  const checkActive = (tab) => (active === tab ? activeTab : inactiveTab);

  return (
    <header className="h-24 sm:h-22 flex items-center z-30 w-full">
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div className="uppercase text-gray-800 dark:text-white font-black text-3xl">
          <Logo />
        </div>
        <div className="flex items-center">
          <nav className="font-sen text-gray-800 dark:text-white uppercase text-lg lg:flex items-center hidden">
            <a
              href="#home"
              className={`py-2 px-6 flex ${checkActive('home')}`}
              onClick={() => setActive('home')}
            >
              Home
            </a>
            <a
              href="#about"
              className={`py-2 px-6 flex ${checkActive('about')}`}
              onClick={() => setActive('about')}
            >
              About
            </a>
            <a
              href="#contact"
              className={`py-2 px-6 flex ${checkActive('contact')}`}
              onClick={() => setActive('contact')}
            >
              Contact
            </a>
            <Link
              to="/coaching-tips"
              className={`py-2 px-6 flex ${checkActive('coaching-tips')}`}
              onClick={() => setActive('coaching-tips')}
            >
              Coaching Tips
            </Link>
          </nav>
          <button className="lg:hidden flex flex-col ml-4">
            <span className="w-6 h-1 bg-gray-800 dark:bg-white mb-1"></span>
            <span className="w-6 h-1 bg-gray-800 dark:bg-white mb-1"></span>
            <span className="w-6 h-1 bg-gray-800 dark:bg-white mb-1"></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default NavBar;

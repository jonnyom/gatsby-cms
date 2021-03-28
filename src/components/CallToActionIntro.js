import React from 'react';
import { Link } from 'gatsby';

const CallToActionIntro = ({
  title,
  subheading,
  callToAction,
  callToActionUrl
}) => (
  <div className="container mx-auto px-6 md:px-12 relative z-10 flex items-center py-32 xl:py-40">
    <div className="w-full flex flex-col items-center relative z-10">
      <h1 className="font-extrabold text-7xl text-center sm:text-8xl text-gray-200 leading-tight mt-4">
        {title}
      </h1>
      <h2 className="font-bold text-5xl sm:text-6xl text-center text-secondary leading-tight mt-4">
        {subheading}
      </h2>
      <Link
        to={`/${callToActionUrl}` || '/contact'}
        className="block bg-secondary hover:bg-primary py-3 px-4 text-lg rounded-lg text-white font-bold uppercase mt-10"
      >
        {callToAction}
      </Link>
    </div>
  </div>
);

export default CallToActionIntro;

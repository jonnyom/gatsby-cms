import React from 'react';
import { Link } from 'gatsby';
import { MarkdownContent } from './Content';

const About = ({ header, description, callToAction, callToActionUrl }) => (
  <div className="mt-24 md:container md:mx-auto leading-normal tracking-normal">
    <div className="flex flex-wrap">
      {header && (
        <h2 className="mx-auto font-bold mb-32 break-normal text-center text-primary text-2xl md:text-5xl">
          {header}
        </h2>
      )}
      <div className="mt-54 max-w-5xl mx-auto -mt-32">
        <MarkdownContent
          content={description}
          className="text-gray-800 mt-8 mb-16 prose lg:prose-lg xl:prose-xl"
        />

        {callToAction && (
          <div className="md:mx-auto w-full md:w-1/3">
            <Link
              to={`/${callToActionUrl ? callToActionUrl : 'contact'}`}
              type="button"
              className="sm:ml-56 md:ml-10 py-2 px-4 bg-secondary hover:bg-primary text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg "
            >
              {callToAction}
            </Link>
          </div>
        )}
      </div>
    </div>
  </div>
);

export default About;

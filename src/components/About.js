import React from 'react';
import { Link } from 'gatsby';
import Content, { HTMLContent } from './Content';

const About = ({ header, description, callToAction, callToActionUrl }) => (
  <section>
    <div className="container max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 bg-white dark:bg-gray-800">
      <div className="flex flex-wrap">
        <h2 className="items-center text-3xl lg:text-4xl font-bold font-heading dark:text-white">
          {header}
        </h2>
        <HTMLContent
          content={description}
          className="mt-8 mb-16 prose lg:prose-lg xl:prose-xl"
        />

        {callToAction && (
          <div className="w-full md:w-1/3">
            <Link
              to={`/${callToActionUrl ? callToActionUrl : 'contact'}`}
              type="button"
              className="py-2 px-4 bg-secondary hover:bg-primary text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
            >
              {callToAction}
            </Link>
          </div>
        )}
      </div>
    </div>
  </section>
);

export default About;

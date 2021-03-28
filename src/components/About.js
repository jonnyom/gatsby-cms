import React from 'react';
import { Link } from 'gatsby';

const ListItem = ({ ix, header, description }) => (
  <li className="flex -mx-4">
    <div className="px-4">
      <span className="flex w-16 h-16 mx-auto items-center justify-center text-2xl font-bold font-heading rounded-full bg-blue-50 text-primary">
        {ix}
      </span>
    </div>
    <div className="px-4">
      <h3 className="my-4 text-xl font-semibold dark:text-white">{header}</h3>
      <p className="text-gray-500 dark:text-gray-300 leading-loose">
        {description}
      </p>
    </div>
  </li>
);

const About = ({
  header,
  description,
  callToAction,
  listElements,
  callToActionUrl
}) => (
  <section>
    <div className="container max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 bg-white dark:bg-gray-800">
      <div className="flex flex-wrap -mx-8">
        <div className="w-full lg:w-1/2 px-8">
          <div className="mb-12 lg:mb-0 pb-12 lg:pb-0 border-b lg:border-b-0">
            <h2 className="mb-4 text-3xl lg:text-4xl font-bold font-heading dark:text-white">
              {header}
            </h2>
            <p className="mb-8 leading-loose text-gray-500 dark:text-gray-300">
              {description}
            </p>
            {callToAction && (
              <div className="w-full md:w-1/3">
                <Link
                  to={`/${callToActionUrl}` || '/contact'}
                  type="button"
                  className="py-2 px-4  bg-secondary hover:bg-primary text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                >
                  {callToAction}
                </Link>
              </div>
            )}
          </div>
        </div>
        {listElements && (
          <div className="w-full lg:w-1/2 px-8">
            <ul className="space-y-12">
              {listElements.map((listItem, ix) => (
                <ListItem
                  ix={ix}
                  header={listItem.header}
                  description={listItem.description}
                  key={`listItem-${ix}`}
                />
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  </section>
);

export default About;

import React from 'react';
import useInterval from '../hooks/useInterval';
import Img from 'gatsby-image';
import { AnimatePresence, motion } from 'framer-motion';

export const TestimonialBig = ({ testimonial, isAnimating }) => {
  const directionOffset = -1200;

  const variants = {
    enter: {
      x: directionOffset,
      opacity: 0
    },
    center: {
      zIndex: 1,
      x: isAnimating ? directionOffset : 0,
      opacity: 1
    }
  };

  return (
    <motion.div
      position="relative"
      variants={variants}
      initial="enter"
      animate="center"
      transition={{
        x: {
          type: 'spring',
          stiffness: 800,
          damping: 100,
          duration: 0.75
        },
        opacity: { duration: 0.6 },
        duration: 1
      }}
      className="bg-white dark:bg-gray-800 w-full mx-auto p-8"
    >
      <div className="flex items-center md:items-start flex-col md:flex-row justify-center">
        <div className="block relative">
          {testimonial.testimonialImage.childImageSharp ? (
            <Img
              fluid={testimonial.testimonialImage.childImageSharp.fluid}
              className="mx-auto object-cover rounded-full h-40 w-40 "
            />
          ) : (
            <img
              src={testimonial.testimonialImage}
              className="mx-auto object-cover rounded-full h-40 w-40 "
            />
          )}
        </div>
        <div className="w-full md:w-2/3">
          <p className="text-gray-600 dark:text-white w-full md:w-2/3 m-auto text-left text-lg md:text-3xl">
            <span className="font-bold text-secondary-500">“</span>
            {testimonial.quote}
            <span className="font-bold text-secondary-500">”</span>
          </p>
          <div className="flex mt-8 items-center justify-center">
            <span className="font-semibold text-primary mr-2 text-lg">
              {testimonial.name}
            </span>
            {testimonial.company && (
              <>
                <span className="text-gray-400 text-xl font-light">/</span>
                <span className="text-gray-400 text-md ml-2">
                  {testimonial.company}
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const TestimonialSmall = ({ testimonial }) => (
  <motion.li
    layout
    className="inline-block sm:mt-6 md:mr-4 mb-6 bg-white dark:bg-gray-800 w-72 shadow-lg mx-auto rounded-xl p-4"
  >
    <p className="text-gray-600 dark:text-white">
      <span className="font-bold text-secondary-500 text-lg">“</span>
      {testimonial.quote}
      <span className="font-bold text-secondary-500 text-lg">”</span>
    </p>
    <div className="flex items-center mt-4">
      <div className="block relative">
        {testimonial.testimonialImage?.childImageSharp ? (
          <Img
            fluid={testimonial.testimonialImage.childImageSharp.fluid}
            className="mx-auto object-cover rounded-full h-10 w-10 "
          />
        ) : (
          <img
            src={testimonial.testimonialImage}
            className="mx-auto object-cover rounded-full h-10 w-10 "
          />
        )}
      </div>
      <div className="flex flex-col ml-2 justify-between">
        <span className="font-semibold text-secondary-500 text-sm">
          {testimonial.name}
        </span>
        {testimonial.company && (
          <span className="dark:text-gray-400 text-xs flex items-center">
            {testimonial.company}
          </span>
        )}
      </div>
    </div>
  </motion.li>
);

export const PivotTestimonial = ({ testimonials }) => {
  //nextIndex = (currentIndex + 1)%array.length
  const [bigTestimonial, setBigTestimonial] = React.useState(0);
  const [isAnimating, setIsAnimating] = React.useState(false);

  useInterval(() => {
    setIsAnimating(true);
    setBigTestimonial((bigTestimonial + 1) % testimonials.length);
    setIsAnimating(false);
  }, 10000);

  return (
    <AnimatePresence>
      <TestimonialBig
        testimonial={testimonials[bigTestimonial]}
        isAnimating={isAnimating}
        key={bigTestimonial}
      />
      <motion.ul
        layout
        animate={{ x: isAnimating ? 100 : 0 }}
        transition={{ ease: 'easeOut', duration: 0.75 }}
        className="flex flex-wrap container md:mx-auto md:px-64 sm:ml-2"
        key={bigTestimonial - 1}
      >
        {testimonials
          .filter((_, ix) => ix !== bigTestimonial)
          .map((testimonial, ix) => (
            <TestimonialSmall testimonial={testimonial} key={`${ix}`} />
          ))}
      </motion.ul>
    </AnimatePresence>
  );
};

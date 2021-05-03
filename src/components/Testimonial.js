import React from 'react';
import useInterval from '../hooks/useInterval';
import Img from 'gatsby-image';

export const TestimonialBig = ({ testimonial }) => (
  <div className="bg-white dark:bg-gray-800 w-full mx-auto p-8">
    <div className="flex items-center md:items-start flex-col md:flex-row justify-center">
      <a href="#" className="block relative">
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
      </a>
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
  </div>
);

export const TestimonialSmall = ({ testimonial }) => (
  <div class="bg-white dark:bg-gray-800 w-72 shadow-lg mx-auto rounded-xl p-4">
    <p class="text-gray-600 dark:text-white">
      <span class="font-bold text-secondary-500 text-lg">“</span>
      {testimonial.quote}
      <span class="font-bold text-secondary-500 text-lg">”</span>
    </p>
    <div class="flex items-center mt-4">
      <a href="#" class="block relative">
        {testimonial.testimonialImage.childImageSharp ? (
          <Img
            fluid={testimonial.testimonialImage.childImageSharp.fluid}
            class="mx-auto object-cover rounded-full h-10 w-10 "
          />
        ) : (
          <img
            src={testimonial.testimonialImage}
            class="mx-auto object-cover rounded-full h-10 w-10 "
          />
        )}
      </a>
      <div class="flex flex-col ml-2 justify-between">
        <span class="font-semibold text-secondary-500 text-sm">
          {testimonial.name}
        </span>
        {testimonial.company && (
          <span class="dark:text-gray-400 text-xs flex items-center">
            {testimonial.company}
          </span>
        )}
      </div>
    </div>
  </div>
);

export const PivotTestimonial = ({ testimonials }) => {
  //nextIndex = (currentIndex + 1)%array.length
  const [bigTestimonial, setBigTestimonial] = React.useState(0);

  useInterval(
    () => setBigTestimonial((bigTestimonial + 1) % testimonials.length),
    2000
  );

  return (
    <div>
      <TestimonialBig testimonial={testimonials[bigTestimonial]} />
      <ul>
        {testimonials
          .filter((_, ix) => ix !== bigTestimonial)
          .map((testimonial, ix) => (
            <TestimonialSmall
              testimonial={testimonial}
              key={`small-testimonial-${ix}`}
            />
          ))}
      </ul>
    </div>
  );
};

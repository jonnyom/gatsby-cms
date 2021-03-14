import React from 'react';

const CallToActionIntro = ({ title, subheading, callToAction }) => (
  <div class="items-center mx-auto px-6 md:px-12 relative flex">
    <div class="lg:w-3/5 xl:w-2/5 flex flex-col items-start relative z-10">
      <h1 class="font-bold text-5xl sm:text-6xl text-gray-400 leading-tight mt-4">
        {title}
      </h1>
      <h2 class="font-bold text-5xl sm:text-6xl text-secondary leading-tight mt-4">
        {subheading}
      </h2>
      <a
        href="#"
        class="block bg-primary hover:bg-secondary py-3 px-4 rounded-lg text-lg text-gray-100 font-bold uppercase mt-10"
      >
        {callToAction}
      </a>
    </div>
  </div>
);

export default CallToActionIntro;

import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Testimonial } from '../../components';

const TestimonialPreview = ({ entry }) => {
  const data = entry.getIn(['data']).toJS();
  if (data) {
    return (
      <Layout location={'/corporate-wellbeing'}>
        <div className="mb-10 items-center">
          <Testimonial testimonials={data.testimonials} />
        </div>
      </Layout>
    );
  } else {
    return <div>Loading...</div>;
  }
};

TestimonialPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func
  })
};

export default TestimonialPreview;

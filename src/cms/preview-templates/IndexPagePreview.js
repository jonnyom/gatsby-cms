import React from 'react';
import PropTypes from 'prop-types';
import { IndexPageTemplate } from '../../templates/index-page';
import { Layout } from '../../components';

const IndexPagePreview = ({ entry, getAsset }) => {
  const data = entry.getIn(['data']).toJS();

  if (data) {
    return (
      <Layout location={{ href: 'localhost:8000/' }}>
        <IndexPageTemplate
          image={getAsset(data.image)}
          title={data.title}
          subtitle={data.subtitle}
          callToAction={data.callToAction}
          callToActionUrl={data.callToActionUrl}
          about={data.about}
          testimonials={data.testimonials}
          coachingTypes={data.coachingTypes}
        />
      </Layout>
    );
  } else {
    return <div>Loading...</div>;
  }
};

IndexPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func
  }),
  getAsset: PropTypes.func
};

export default IndexPagePreview;

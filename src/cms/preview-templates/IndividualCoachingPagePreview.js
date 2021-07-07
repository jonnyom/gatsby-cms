import React from 'react';
import PropTypes from 'prop-types';
import { IndividualCoachingPageTemplate } from '../../templates/individual-coaching-page';
import { Layout } from '../../components';

const IndividualCoachingPagePreview = ({ entry }) => {
  const data = entry.getIn(['data']).toJS();
  if (data) {
    return (
      <Layout location={'/individual-coaching'}>
        <IndividualCoachingPageTemplate
          title={data.title}
          description={data.description}
          callToAction={data.callToAction}
        />
      </Layout>
    );
  } else {
    return <div>Loading...</div>;
  }
};

IndividualCoachingPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func
  })
};

export default IndividualCoachingPagePreview;

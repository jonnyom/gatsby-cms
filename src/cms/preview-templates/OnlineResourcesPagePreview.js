import React from 'react';
import PropTypes from 'prop-types';
import { OnlineResourcesPageTemplate } from '../../templates/online-resources-page';
import { Layout } from '../../components';

const OnlineResourcesPagePreview = ({ entry }) => {
  const data = entry.getIn(['data']).toJS();
  if (data) {
    return (
      <Layout location={'/online-resources'}>
        <OnlineResourcesPageTemplate
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

OnlineResourcesPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func
  })
};

export default OnlineResourcesPagePreview;

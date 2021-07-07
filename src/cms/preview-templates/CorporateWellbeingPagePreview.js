import React from 'react';
import PropTypes from 'prop-types';
import { CorporateWellbeingPageTemplate } from '../../templates/corporate-wellbeing-page';
import { Layout } from '../../components';

const CorporateWellbeingPagePreview = ({ entry }) => {
  const data = entry.getIn(['data']).toJS();
  if (data) {
    return (
      <Layout location={'/corporate-wellbeing'}>
        <CorporateWellbeingPageTemplate
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

CorporateWellbeingPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func
  })
};

export default CorporateWellbeingPagePreview;

import React from 'react';
import PropTypes from 'prop-types';
import { PricingPageTemplate } from '../../templates/pricing-page';
import { Layout } from '../../components';

const PricingPagePreview = ({ entry, getAsset }) => {
  const data = entry.getIn(['data']).toJS();

  if (data) {
    return (
      <Layout location={''}>
        <PricingPageTemplate
          image={getAsset(data.image)}
          title={data.title}
          description={data.description}
          pricingList={data.pricingList}
          currency={data.currency}
          callToAction={data.callToAction}
        />
      </Layout>
    );
  } else {
    return <div>Loading...</div>;
  }
};

PricingPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func
  }),
  getAsset: PropTypes.func
};

export default PricingPagePreview;

import React from 'react';
import PropTypes from 'prop-types';
import { ProductsPageTemplate } from '../../templates/products-page';
import { Layout } from '../../components';

const ProductsPagePreview = ({ entry }) => {
  const data = entry.getIn(['data']).toJS();
  if (data) {
    return (
      <Layout location={'/products'}>
        <ProductsPageTemplate
          about={data.about}
          productList={data.productList}
          testimonials={data.testimonials}
        />
      </Layout>
    );
  } else {
    return <div>Loading...</div>;
  }
};

ProductsPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func
  })
};

export default ProductsPagePreview;

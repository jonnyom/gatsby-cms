import React from 'react';
import PropTypes from 'prop-types';
import { ContactPageTemplate } from '../../templates/contact-page';
import { Layout } from '../../components';

const ContactPagePreview = ({ entry, getAsset }) => {
  const data = entry.getIn(['data']).toJS();

  if (data) {
    return (
      <Layout location={''}>
        <ContactPageTemplate
          image={getAsset(data.image)}
          title={data.title}
          widgetUrl={data.widgetUrl}
          description={data.description}
          previewMode={true}
        />
      </Layout>
    );
  } else {
    return <div>Loading...</div>;
  }
};

ContactPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func
  }),
  getAsset: PropTypes.func
};

export default ContactPagePreview;

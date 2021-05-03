import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { Layout, CalendlyWidget, About } from '../components';

export const ContactPageTemplate = ({
  title,
  description,
  widgetUrl,
  previewMode = false
}) => (
  <div className="container  mx-auto flex flex-col justify-between relative py-10">
    <div className="grid grid-cols-1 md:grid-cols-2">
      <About header={title} description={description} />
      <CalendlyWidget widgetUrl={widgetUrl} previewMode={previewMode} />
    </div>
  </div>
);

ContactPageTemplate.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  widgetUrl: PropTypes.string
};

const ContactPage = ({ data, location }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout
      location={location}
      title={`Contact me | ${data.site.siteMetadata.title}`}
    >
      <ContactPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        description={frontmatter.description}
        widgetUrl={frontmatter.widgetUrl}
      />
    </Layout>
  );
};

ContactPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object
    }),
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({ title: PropTypes.string })
    })
  })
};

export default ContactPage;

export const pageQuery = graphql`
  query ContactPageTemplate {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(frontmatter: { templateKey: { eq: "contact-page" } }) {
      frontmatter {
        title
        description
        widgetUrl
      }
    }
  }
`;

import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { Layout, About } from '../components';

export const CorporateWellbeingPageTemplate = ({
  title,
  description,
  callToAction
}) => {
  return (
    <div className="container mx-auto flex flex-col justify-between relative py-8">
      <div className="mb-10 items-center">
        <About
          header={title}
          description={description}
          callToAction={callToAction}
        />
      </div>
    </div>
  );
};

CorporateWellbeingPageTemplate.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  callToAction: PropTypes.string
};

const CorporateWellbeingPage = ({ data, location }) => {
  const { frontmatter } = data.markdownRemark;
  const { title, description, callToAction } = frontmatter;

  return (
    <Layout
      location={location}
      title={`Corporate Wellbeing | ${data.site.siteMetadata.title}`}
    >
      <CorporateWellbeingPageTemplate
        title={title}
        description={description}
        callToAction={callToAction}
      />
    </Layout>
  );
};

CorporateWellbeingPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object
    }),
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({ title: PropTypes.string })
    })
  })
};

export default CorporateWellbeingPage;

export const pageQuery = graphql`
  query CorporateWellbeingPageTemplate {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(
      frontmatter: { templateKey: { eq: "corporate-wellbeing-page" } }
    ) {
      frontmatter {
        title
        description
        callToAction
      }
    }
  }
`;

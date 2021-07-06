import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { Layout, About } from '../components';

export const OnlineResourcesPageTemplate = ({
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

OnlineResourcesPageTemplate.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  callToAction: PropTypes.string
};

const OnlineResourcesPage = ({ data, location }) => {
  const { frontmatter } = data.markdownRemark;
  const { title, description, callToAction } = frontmatter;

  return (
    <Layout
      location={location}
      title={`Online Resources | ${data.site.siteMetadata.title}`}
    >
      <OnlineResourcesPageTemplate
        title={title}
        description={description}
        callToAction={callToAction}
      />
    </Layout>
  );
};

OnlineResourcesPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object
    }),
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({ title: PropTypes.string })
    })
  })
};

export default OnlineResourcesPage;

export const pageQuery = graphql`
  query OnlineResourcesPageTemplate {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(
      frontmatter: { templateKey: { eq: "online-resources-page" } }
    ) {
      frontmatter {
        title
        description
        callToAction
      }
    }
  }
`;

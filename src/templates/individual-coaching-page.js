import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { Layout, About } from '../components';

export const IndividualCoachingPageTemplate = ({
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

IndividualCoachingPageTemplate.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  callToAction: PropTypes.string
};

const IndividualCoachingPage = ({ data, location }) => {
  const { frontmatter } = data.markdownRemark;
  const { title, description, callToAction } = frontmatter;

  return (
    <Layout
      location={location}
      title={`Individual Coaching | ${data.site.siteMetadata.title}`}
    >
      <IndividualCoachingPageTemplate
        title={title}
        description={description}
        callToAction={callToAction}
      />
    </Layout>
  );
};

IndividualCoachingPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object
    }),
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({ title: PropTypes.string })
    })
  })
};

export default IndividualCoachingPage;

export const pageQuery = graphql`
  query IndividualCoachingPageTemplate {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(
      frontmatter: { templateKey: { eq: "individual-coaching-page" } }
    ) {
      frontmatter {
        title
        description
        callToAction
      }
    }
  }
`;

import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import { CallToActionIntro, Layout, About } from '../components';
import ScrollableAnchor from 'react-scrollable-anchor';

export const IndexPageTemplate = ({
  image,
  title,
  subheading,
  callToAction,
  callToActionUrl,
  about
}) => (
  <>
    <div className="dark:bg-gray-800 bg-white relative overflow-hidden h-screen">
      {image.childImageSharp ? (
        <Img
          fluid={image.childImageSharp.fluid}
          className="bg-opacity-25 absolute h-full w-full object-cover"
        />
      ) : (
        <img
          src={image}
          className="bg-opacity-25 absolute h-full w-full object-cover"
        />
      )}
      <div className="inset-0 bg-black opacity-30 absolute"></div>

      <div className="container mx-auto px-6 flex flex-col justify-between relative py-8">
        <CallToActionIntro
          title={title}
          subheading={subheading}
          callToAction={callToAction}
          callToActionUrl={callToActionUrl}
        />
      </div>
    </div>
    <ScrollableAnchor id={'about'}>
      <div>
        <About
          header={about.title}
          description={about.description}
          callToAction={about.callToAction}
          listElements={about.breakdownList}
          callToActionUrl={callToActionUrl}
        />
      </div>
    </ScrollableAnchor>
  </>
);

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  callToAction: PropTypes.string,
  description: PropTypes.string,
  intro: PropTypes.shape({
    blurbs: PropTypes.array
  }),
  callToActionUrl: PropTypes.string,
  about: PropTypes.shape({
    description: PropTypes.string,
    title: PropTypes.string,
    callToAction: PropTypes.string,
    breakdownList: PropTypes.array
  })
};

const IndexPage = ({ data, location }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout location={location}>
      <IndexPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        heading={frontmatter.heading}
        subheading={frontmatter.subheading}
        callToAction={frontmatter.callToAction}
        callToActionUrl={frontmatter.callToActionUrl}
        description={frontmatter.description}
        intro={frontmatter.intro}
        about={frontmatter.about}
      />
    </Layout>
  );
};

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object
    })
  })
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        heading
        subheading
        callToAction
        callToActionUrl
        description
        about {
          title
          description
          callToAction
          breakdownList {
            description
            heading
          }
        }
      }
    }
  }
`;

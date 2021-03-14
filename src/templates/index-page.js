import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import { CallToActionIntro, Footer, NavBar } from '../components';

export const IndexPageTemplate = ({
  image,
  title,
  subheading,
  callToAction
}) => (
  <div className="dark:bg-gray-800 bg-white relative overflow-hidden h-screen">
    {image.childImageSharp ? (
      <Img
        fluid={image.childImageSharp.fluid}
        className="absolute h-full w-full object-cover"
      />
    ) : (
      <img src={image} className="absolute h-full w-full object-cover" />
    )}

    <div className="container mx-auto px-6 flex flex-col justify-between relative py-8">
      <NavBar />
      <CallToActionIntro
        title={title}
        subheading={subheading}
        callToAction={callToAction}
      />
    </div>
  </div>
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
  })
};

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <>
      <IndexPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        heading={frontmatter.heading}
        subheading={frontmatter.subheading}
        callToAction={frontmatter.callToAction}
        description={frontmatter.description}
        intro={frontmatter.intro}
      />
      <Footer />
    </>
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
        description
      }
    }
  }
`;

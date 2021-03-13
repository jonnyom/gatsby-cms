import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';
import Img from 'gatsby-image';
import Footer from '../components/Footer';
import { NavBar } from '../components/NavBar';
import StyledBackgroundSection from '../components/BackgroundImg';

export const IndexPageTemplate = ({
  image,
  title,
  heading,
  subheading,
  callToAction,
  description,
  intro
}) => (
  <main className="dark:bg-gray-800 bg-white relative overflow-hidden h-screen">
    <Img
      fluid={image.childImageSharp.fluid}
      className="absolute h-full w-full object-cover"
    />
    <div className="container mx-auto px-6 flex flex-col justify-between items-center relative py-8">
      <div className="flex flex-col">
        <h1 className="font-light w-full uppercase text-center text-4xl sm:text-5xl dark:text-white text-gray-800">
          {title}
        </h1>
        <h2 className="font-light max-w-2xl mx-auto w-full text-xl dark:text-white text-gray-500 text-center py-8">
          {subheading}
        </h2>
        <div className="flex items-center justify-center mt-4">
          <a
            href="#contact-me"
            className="uppercase py-2 px-4 bg-gray-800 border-2 border-transparent text-white text-md mr-4 hover:bg-gray-900"
          >
            {callToAction}
          </a>
        </div>
      </div>
    </div>
  </main>
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
      <NavBar />
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

import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { Layout, About, Testimonial } from '../components';

export const IndividualCoachingPageTemplate = ({
  title,
  description,
  callToAction,
  testimonials
}) => {
  return (
    <div className="container mx-auto flex flex-col justify-between relative py-8">
      <h1 className="font-bold break-normal text-center text-primary text-2xl md:text-5xl">
        {title}
      </h1>
      <div className="mt-24 mb-10 items-center">
        <About
          description={description}
          callToAction={callToAction}
        />
      </div>
      {testimonials && (
        <div className="mb-10 items-center">
          <Testimonial testimonials={testimonials} />
        </div>
      )}
    </div>
  );
};

IndividualCoachingPageTemplate.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  callToAction: PropTypes.string,
  testimonials: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      quote: PropTypes.string,
      testimonialImage: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string
      ]),
      company: PropTypes.string
    })
  )
};

const IndividualCoachingPage = ({ data, location }) => {
  const { frontmatter } = data.markdownRemark;
  const { title, description, callToAction, testimonials } = frontmatter;
  const individualCoachingTestimonials =
    testimonials || data.testimonialMarkdown.frontmatter.testimonials;

  return (
    <Layout
      location={location}
      title={`Individual Coaching | ${data.site.siteMetadata.title}`}
    >
      <IndividualCoachingPageTemplate
        title={title}
        description={description}
        callToAction={callToAction}
        testimonials={individualCoachingTestimonials}
      />
    </Layout>
  );
};

IndividualCoachingPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object
    }),
    testimonialMarkdown: PropTypes.shape({ frontmatter: PropTypes.object }),
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
        testimonials {
          name
          company
          quote
          testimonialImage {
            childImageSharp {
              fluid(maxWidth: 2048, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
    testimonialMarkdown: markdownRemark(
      frontmatter: { templateKey: { eq: "testimonials" } }
    ) {
      frontmatter {
        testimonials {
          name
          company
          quote
          testimonialImage {
            childImageSharp {
              fluid(maxWidth: 2048, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`;

import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { Layout, About, Testimonial } from '../components';

export const CorporateWellbeingPageTemplate = ({
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
        <About description={description} callToAction={callToAction} />
      </div>
      {testimonials && (
        <div className="mb-10 items-center">
          <Testimonial testimonials={testimonials} />
        </div>
      )}
    </div>
  );
};

CorporateWellbeingPageTemplate.propTypes = {
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

const CorporateWellbeingPage = ({ data, location }) => {
  const { frontmatter } = data.markdownRemark;
  const { title, description, callToAction, testimonials } = frontmatter;
  const corporateWellbeingTestimonials =
    testimonials || data.testimonialMarkdown.frontmatter.testimonials;

  return (
    <Layout
      location={location}
      title={`Corporate Wellbeing | ${data.site.siteMetadata.title}`}
    >
      <CorporateWellbeingPageTemplate
        title={title}
        description={description}
        callToAction={callToAction}
        testimonials={corporateWellbeingTestimonials}
      />
    </Layout>
  );
};

CorporateWellbeingPage.propTypes = {
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

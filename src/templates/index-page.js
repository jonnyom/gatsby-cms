import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import {
  CallToActionIntro,
  Layout,
  About,
  TypesOfCoaching,
  Testimonial
} from '../components';

export const IndexPageTemplate = React.forwardRef(
  (
    {
      image,
      title,
      subtitle,
      callToAction,
      callToActionUrl,
      about,
      testimonials,
      coachingTypes
    },
    ref
  ) => {
    return (
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
              subheading={subtitle}
              callToAction={callToAction}
              callToActionUrl={callToActionUrl}
            />
          </div>
        </div>
        {coachingTypes && (
          <div className="container mx-auto px-6">
            <TypesOfCoaching coachingTypes={coachingTypes} />
          </div>
        )}

        <div className="mt-12">
          <h1 className="font-bold break-normal text-center text-primary text-2xl md:text-5xl">
            {about.title}
          </h1>
          <div className="mt-24" ref={ref}>
            <About
              description={about.description}
              callToAction={about.callToAction}
              callToActionUrl={callToActionUrl}
            />
          </div>
        </div>

        {testimonials.length > 0 && (
          <div className="mt-10 items-center">
            <Testimonial testimonials={testimonials} />
          </div>
        )}
      </>
    );
  }
);

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  subtitle: PropTypes.string,
  callToAction: PropTypes.string,
  callToActionUrl: PropTypes.string,
  about: PropTypes.shape({
    description: PropTypes.string,
    title: PropTypes.string
  }),
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
  ),
  coachingTypes: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
      coachingUrl: PropTypes.string,
      linkToPage: PropTypes.boolean
    })
  )
};

const IndexPage = ({ data, location }) => {
  const { frontmatter } = data.markdownRemark;
  const indexPageTestimonials =
    frontmatter.testimonials ||
    data.testimonialMarkdown.frontmatter.testimonials;
  return (
    <Layout location={location} title={data.site.siteMetadata.title}>
      <IndexPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        subtitle={frontmatter.subtitle}
        callToAction={frontmatter.callToAction}
        callToActionUrl={frontmatter.callToActionUrl}
        about={frontmatter.about}
        testimonials={indexPageTestimonials}
        coachingTypes={frontmatter.coachingTypes}
      />
    </Layout>
  );
};

IndexPage.propTypes = {
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

export default IndexPage;

export const pageQuery = graphql`
  query IndexPageTemplate {
    site {
      siteMetadata {
        title
      }
    }
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
        subTitle
        callToAction
        callToActionUrl
        about {
          title
          description
          callToAction
        }
        coachingTypes {
          coachingUrl
          linkToPage
          title
          description
        }
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

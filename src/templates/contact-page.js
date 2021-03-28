import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import { Layout, CalendlyWidget, About } from '../components';

export const ContactPageTemplate = ({
  image,
  title,
  description,
  widgetUrl,
  previewMode = false
}) => (
  <div className="container mx-auto flex flex-col justify-between relative py-8">
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div>
        <About header={title} description={description} />
        {image && (
          <div>
            {image.childImageSharp ? (
              <Img fluid={image.childImageSharp.fluid} />
            ) : (
              <img src={image} />
            )}
          </div>
        )}
      </div>
      <div>
        <CalendlyWidget widgetUrl={widgetUrl} previewMode={previewMode} />
      </div>
    </div>
  </div>
);

ContactPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  description: PropTypes.string,
  widgetUrl: PropTypes.string
};

const ContactPage = ({ data, location }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout location={location}>
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
    })
  })
};

export default ContactPage;

export const pageQuery = graphql`
  query ContactPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "contact-page" } }) {
      frontmatter {
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        title
        description
        widgetUrl
      }
    }
  }
`;

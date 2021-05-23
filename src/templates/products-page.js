import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { motion } from 'framer-motion';
import { Layout, About, Testimonial } from '../components';

const ProductListItem = ({ description }) => (
  <li className="mb-3 flex items-center">
    <svg
      className="mr-2"
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 1792 1792"
    >
      <path d="M1152 896q0 106-75 181t-181 75-181-75-75-181 75-181 181-75 181 75 75 181zm-256-544q-148 0-273 73t-198 198-73 273 73 273 198 198 273 73 273-73 198-198 73-273-73-273-198-198-273-73zm768 544q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"></path>
    </svg>
    {description}
  </li>
);

const ProductWidget = ({ heading, description, includedList }) => (
  <motion.li
    className="l:inline-block ml-10 mr-10 mb-6 shadow-lg rounded-2xl md:w-auto l:w-128 bg-white dark:bg-gray-800 p-4"
    whileHover={{
      scale: 1.02,
      transition: { duration: 1 }
    }}
    transition={{ duration: 0.25 }}
  >
    <p className="text-black dark:text-white text-3xl font-bold">{heading}</p>
    <p className="text-gray-500 dark:text-gray-300 text-sm mb-4">
      {description}
    </p>
    {includedList && (
      <ul className="text-sm text-black dark:text-white w-full mt-6 mb-6">
        {includedList.map((included, ix) => (
          <ProductListItem
            description={included.description}
            key={`product-list-${ix}`}
          />
        ))}
      </ul>
    )}
  </motion.li>
);

export const ProductsPageTemplate = ({ about, productList, testimonials }) => {
  return (
    <div className="container mx-auto flex flex-col justify-between relative py-8">
      <div className="grid grid-cols-1">
        {about && (
          <div className="mb-10 items-center">
            <About
              header={about.title}
              description={about.description}
              callToAction={about.callToAction}
            />
          </div>
        )}

        {testimonials && (
          <div className="mb-10 items-center">
            <Testimonial testimonials={testimonials} />
          </div>
        )}

        <ul className="flex flex-wrap items-center">
          {productList.map((product, ix) => (
            <ProductWidget
              heading={product.heading}
              description={product.description}
              price={product.price}
              period={product.period}
              currency={product.currency}
              includedList={product.includedList}
              key={`${product.heading}-${ix}`}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

ProductsPageTemplate.propTypes = {
  about: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    callToAction: PropTypes.string
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
  productList: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
      callToAction: PropTypes.string,
      includedList: PropTypes.arrayOf(
        PropTypes.shape({
          description: PropTypes.string
        })
      )
    })
  )
};

const ProductsPage = ({ data, location }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout
      location={location}
      title={`Products | ${data.site.siteMetadata.title}`}
    >
      <ProductsPageTemplate
        about={frontmatter.about}
        productList={frontmatter.productList}
        testimonials={frontmatter.testimonials}
      />
    </Layout>
  );
};

ProductsPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object
    }),
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({ title: PropTypes.string })
    })
  })
};

export default ProductsPage;

export const pageQuery = graphql`
  query ProductsPageTemplate {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(frontmatter: { templateKey: { eq: "products-page" } }) {
      frontmatter {
        about {
          title
          description
          callToAction
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
        productList {
          description
          name
          includedList {
            description
          }
        }
      }
    }
  }
`;

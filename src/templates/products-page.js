import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { motion } from 'framer-motion';
import { Layout, About } from '../components';
import PivotTestimonial from '../components/Testimonial';

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

const ProductWidget = ({
  heading,
  description,
  price,
  period,
  currency,
  includedList
}) => (
  <motion.li
    className="inline-block mr-10 mb-6 shadow-lg rounded-2xl w-64 bg-white dark:bg-gray-800 p-4"
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
    <p className="text-black dark:text-white  text-3xl font-bold">
      {currency ? currency : '€'}
      {price}
    </p>
    <p className="text-gray-500 dark:text-gray-300 text-sm mb-4">
      {period ? period : 'Per session'}
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

export const ProductsPageTemplate = ({
  title,
  description,
  productList,
  callToAction,
  testimonials
}) => (
  <div className="container mx-auto flex flex-col justify-between relative py-8">
    <div className="grid grid-cols-1">
      <div>
        <About
          header={title}
          description={description}
          callToAction={callToAction}
        />
      </div>

      <ul className="flex items-center">
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
      <PivotTestimonial testimonials={testimonials} />
    </div>
  </div>
);

ProductsPageTemplate.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  testimonials: PropTypes.shape({
    name: PropTypes.string,
    quote: PropTypes.string,
    testimonialImage: PropTypes.oneOf([PropTypes.string, PropTypes.object]),
    company: PropTypes.string
  }),
  productList: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    period: PropTypes.string,
    currency: PropTypes.string,
    callToAction: PropTypes.string,
    includedList: PropTypes.shape({
      description: PropTypes.string
    })
  })
};

const ProductsPage = ({ data, location }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout
      location={location}
      title={`Products | ${data.site.siteMetadata.title}`}
    >
      <ProductsPageTemplate
        title={frontmatter.title}
        description={frontmatter.description}
        productList={frontmatter.productList}
        callToAction={frontmatter.callToAction}
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
        productList {
          description
          name
          price
          currency
          period
          includedList {
            description
          }
        }
      }
    }
  }
`;

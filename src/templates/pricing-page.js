import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import { Layout, About } from '../components';

const ProductListItem = ({ description }) => (
  <li class="mb-3 flex items-center">
    <svg
      class="mr-2"
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
  <li class="shadow-lg rounded-2xl w-64 bg-white dark:bg-gray-800 p-4">
    <p class="text-black dark:text-white text-3xl font-bold">{heading}</p>
    <p class="text-gray-500 dark:text-gray-300 text-sm mb-4">{description}</p>
    <p class="text-black dark:text-white  text-3xl font-bold">
      {currency ? currency : '€'}
      {price}
    </p>
    {period && (
      <p class="text-gray-500 dark:text-gray-300 text-sm mb-4">{period}</p>
    )}
    {includedList && (
      <ul class="text-sm text-black dark:text-white w-full mt-6 mb-6">
        {includedList.map((included, ix) => (
          <ProductListItem
            description={included.description}
            key={`product-list-${ix}`}
          />
        ))}
      </ul>
    )}
  </li>
);

export const PricingPageTemplate = ({
  image,
  title,
  description,
  productList,
  callToAction
}) => (
  <div className="container mx-auto flex flex-col justify-between relative py-8">
    <div className="grid grid-cols-1">
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
        <Link
          to="/contact"
          type="button"
          class="w-56 m-auto px-3 py-3 text-sm shadow border border-black rounded-lg text-black bg-white hover:bg-black hover:text-white dark:hover-text-gray-900 dark:hover:bg-gray-100 "
        >
          {callToAction}
        </Link>
      </div>
      <ul>
        {productList.map((product, ix) => (
          <ProductWidget
            heading={product.heading}
            description={product.description}
            price={product.price}
            period={product.period}
            currency={product.currency}
            includedList={product.includedlist}
            key={`${product.heading}-${ix}`}
          />
        ))}
      </ul>
    </div>
  </div>
);

PricingPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  description: PropTypes.string,
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

const PricingPage = ({ data, location }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout
      location={location}
      title={`Products | ${data.site.siteMetadata.title}`}
    >
      <PricingPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        description={frontmatter.description}
        pricingList={frontmatter.pricingList}
        currency={frontmatter.currency}
        callToAction={frontmatter.callToAction}
      />
    </Layout>
  );
};

PricingPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object
    }),
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({ title: PropTypes.string })
    })
  })
};

export default PricingPage;

export const pageQuery = graphql`
  query PricingPageTemplate {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(frontmatter: { templateKey: { eq: "pricing-page" } }) {
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
        callToAction
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

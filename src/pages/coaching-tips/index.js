import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { BlogPreview, Layout } from '../../components';

const BlogRoll = ({ data }) => {
  const { edges: posts } = data.allMarkdownRemark;

  return (
    <div className="md:container md:mx-auto leading-normal tracking-normal">
      <div className="header flex items-end justify-between mb-12"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12">
        {posts && posts.map(({ node: post }) => <BlogPreview post={post} />)}
      </div>
    </div>
  );
};

const BlogIndexPage = ({ data, location }) => (
  <Layout location={location} title={data.site.siteMetadata.title}>
    <BlogRoll data={data} />
  </Layout>
);

BlogRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array
    }),
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({ title: PropTypes.string })
    })
  })
};

export default BlogIndexPage;

export const pageQuery = graphql`
  query BlogRollQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
    ) {
      edges {
        node {
          excerpt(pruneLength: 200)
          id
          fields {
            slug
          }
          frontmatter {
            title
            templateKey
            date(formatString: "MMMM DD, YYYY")
            featuredpost
            featuredimage {
              childImageSharp {
                fluid(maxWidth: 120, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            tags
          }
        }
      }
    }
  }
`;

import React from 'react';
import { Helmet } from 'react-helmet';
import { Link, graphql } from 'gatsby';
import { Layout, BlogPreview } from '../components';

const TagRoute = ({ location, data, pageContext }) => {
  const { edges: posts } = data.allMarkdownRemark;

  const tag = pageContext.tag;

  return (
    <Layout location={location}>
      <div className="container content">
        <div className="flex justify-center">
          <div className="column is-10 is-offset-1 mb-20">
            <p className="text-secondary mb-10 capitalize font-bold text-2xl">
              {tag}
            </p>
            <div className="mb-20 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12">
              {posts &&
                posts.map(({ node: post }, index) => (
                  <BlogPreview post={post} key={`blog-${index}`} />
                ))}
            </div>
            <div>
              <Link
                className="text-primary hover:text-secondary inline-block"
                to="/tags/"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Browse all tags
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TagRoute;

export const tagPageQuery = graphql`
  query TagPage($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          excerpt(pruneLength: 400)
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
          }
        }
      }
    }
  }
`;

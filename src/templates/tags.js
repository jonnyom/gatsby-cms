import React from 'react';
import { Helmet } from 'react-helmet';
import { Link, graphql } from 'gatsby';
import { Layout, BlogPreview } from '../components';

const TagRoute = ({ location, data, pageContext }) => {
  const { edges: posts } = data.allMarkdownRemark;

  const tag = pageContext.tag;
  const title = data.site.siteMetadata.title;
  const totalCount = data.allMarkdownRemark.totalCount;

  return (
    <Layout location={location}>
      <Helmet title={`${tag} | ${title}`} />
      <div className="container content">
        <div className="flex justify-center">
          <div
            className="column is-10 is-offset-1"
            style={{ marginBottom: '6rem' }}
          >
            <span className="px-2 py-1  text-base rounded text-white hover:bg-secondary bg-primary font-medium">
              {tag}
            </span>
            <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12">
              {posts &&
                posts.map(({ node: post }) => <BlogPreview post={post} />)}
            </div>
            <div>
              <Link to="/tags/">Browse all tags</Link>
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

import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql, StaticQuery } from 'gatsby';
import PreviewCompatibleImage from './PreviewCompatibleImage';

const BlogPreview = ({ post }) => {
  return (
    <div class="overflow-hidden shadow-lg rounded-lg h-90 w-60 md:w-80 cursor-pointer m-auto">
      <a href="#" class="w-full block h-full">
        {post.frontmatter.featuredimage ? (
          // <div className="max-h-40 w-full object-cover">
          <PreviewCompatibleImage
            imageInfo={{
              image: post.frontmatter.featuredimage,
              alt: `featured image thumbnail for post ${post.frontmatter.title}`
            }}
          />
        ) : // </div>
        null}
        <div class="bg-white dark:bg-gray-800 w-full p-4">
          <Link
            className="title has-text-primary is-size-4"
            to={post.fields.slug}
          >
            {post.frontmatter.title}
          </Link>
          <span> &bull; </span>
          <span className="subtitle is-size-5 is-block">
            {post.frontmatter.date}
          </span>
          <p>
            {post.excerpt}
            <br />
            <br />
            <Link className="button" to={post.fields.slug}>
              Keep Reading →
            </Link>
          </p>
        </div>
      </a>
    </div>
  );
};

const BlogRoll = ({ data }) => {
  const { edges: posts } = data.allMarkdownRemark;

  return (
    <div class="w-full bg-white p-12">
      <div class="header flex items-end justify-between mb-12">
        <div class="title">
          <p class="text-4xl font-bold text-gray-800 mb-4">Lastest articles</p>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12">
        {posts && posts.map(({ node: post }) => <BlogPreview post={post} />)}
      </div>
    </div>
  );
};

BlogRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array
    })
  })
};

export default () => (
  <StaticQuery
    query={graphql`
      query BlogRollQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
        ) {
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
    `}
    render={(data, count) => <BlogRoll data={data} count={count} />}
  />
);

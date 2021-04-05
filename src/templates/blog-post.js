import React from 'react';
import PropTypes from 'prop-types';
import { graphql, Link } from 'gatsby';
import Content, { HTMLContent } from '../components/Content';
import { Layout } from '../components';
import { kebabCase } from 'lodash';
import Img from 'gatsby-image';

export const BlogPostTemplate = ({
  content,
  contentComponent,
  description,
  tags,
  title,
  date,
  image
}) => {
  const PostContent = contentComponent || Content;
  const featuredImgFluid = image && image.childImageSharp.fluid;

  return (
    <div className="md:container md:mx-auto leading-normal tracking-normal ">
      <div className="mb-10 text-center mx-0 sm:mx-6 pt-16 md:pt-32">
        {date && (
          <p className="text-sm md:text-base text-secondary font-bold">
            {date}
          </p>
        )}
        <h1 className="font-bold break-normal text-center text-primary text-2xl md:text-5xl">
          {title}
        </h1>
      </div>

      <div className="max-w-5xl mx-auto -mt-32">
        <div className="mx-0 sm:mx-6">
          <div className="bg-white w-full p-8 md:p-24 text-xl md:text-2xl text-gray-800 leading-normal">
            <br />
            <br />
            <p className="text-2xl md:text-3xl mb-5">{description}</p>
            {featuredImgFluid && (
              <Img
                fluid={featuredImgFluid}
                className="container w-full max-w-6xl mx-auto bg-white bg-cover mt-8 rounded"
              />
            )}
            <PostContent
              content={content}
              className="mt-8 mb-16 prose lg:prose-lg xl:prose-xl"
            />
            {tags && tags.length ? (
              <div style={{ marginTop: `4rem` }}>
                <h4>Tags</h4>
                {tags.map((tag, index) => (
                  <>
                    {tag.length > 0 && (
                      <div
                        className="flex flex-row justify-starts items-center mt-4"
                        key={index}
                      >
                        <div className="px-2 py-1 text-base rounded text-white hover:bg-secondary bg-primary font-medium">
                          <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                        </div>
                      </div>
                    )}
                  </>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
  date: PropTypes.string,
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
};

const BlogPost = ({ data, location }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout
      location={location}
      title={`${post.frontmatter.title} | ${data.site.siteMetadata.title}`}
    >
      <BlogPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        image={post.frontmatter.featuredimage}
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
        date={post.frontmatter.date}
      />
    </Layout>
  );
};

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string
      })
    })
  })
};

export default BlogPost;

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        featuredimage {
          childImageSharp {
            fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        tags
      }
    }
  }
`;

import React from 'react';
import PreviewCompatibleImage from './PreviewCompatibleImage';
import { Link } from 'gatsby';
import { kebabCase } from 'lodash';

const BlogPreview = ({ post }) => {
  return (
    <div className="overflow-hidden shadow-lg rounded-lg h-90 w-80 md:w-80 cursor-pointer m-auto">
      <Link to={post.fields.slug} className="w-full block h-full">
        {post.frontmatter.featuredimage ? (
          <PreviewCompatibleImage
            imageInfo={{
              image: post.frontmatter.featuredimage,
              alt: `featured image thumbnail for post ${post.frontmatter.title}`
            }}
          />
        ) : null}
        <div className="bg-white dark:bg-gray-800 w-full p-4">
          <Link
            className="title has-text-primary is-size-4"
            to={post.fields.slug}
          >
            <span className="text-gray-800 dark:text-white text-xl font-medium mb-2">
              {post.frontmatter.title}
            </span>
          </Link>
          <p className="text-gray-400 dark:text-gray-300 font-light text-md">
            {post.excerpt}
            <br />
            <br />
          </p>
          <span className="subtitle is-size-5 is-block">
            {post.frontmatter.date}
          </span>
          <div className="flex flex-wrap justify-starts items-center mt-4">
            {post.frontmatter.tags &&
              post.frontmatter.tags.map((tag, index) => (
                <div
                  className="text-xs mr-2 py-1.5 px-4 text-gray-600 bg-blue-100 rounded-2xl mt-4"
                  key={index}
                >
                  <Link to={`/tags/${kebabCase(tag)}/`}>#{tag}</Link>
                </div>
              ))}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BlogPreview;

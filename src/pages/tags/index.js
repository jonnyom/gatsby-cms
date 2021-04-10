import React from 'react';
import { kebabCase } from 'lodash';
import { Link, graphql } from 'gatsby';
import { Layout } from '../../components';

const TagItem = ({ tag }) => (
  <li className="max-w-max flex flex-row">
    <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
      <div className="select-none cursor-pointer flex items-center p-4">
        <div className="flex-grow w-screen">
          <div className="capitalize font-medium dark:text-white">
            {tag.fieldValue}
          </div>
          <div className="text-gray-600 dark:text-gray-200 text-sm">
            {tag.totalCount} {tag.totalCount > 1 ? 'posts' : 'post'}
          </div>
        </div>
      </div>
    </Link>
  </li>
);

const TagsPage = ({
  data: {
    allMarkdownRemark: { group },
    site: {
      siteMetadata: { title }
    }
  },
  location
}) => (
  <Layout location={location} title={`Tags | ${title}`}>
    <div class="container flex flex-col mx-auto w-full items-center justify-center bg-white dark:bg-gray-800 rounded-lg">
      <div className="px-4 py-5 sm:px-6 w-full">
        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
          Tags
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-200">
          Here you can find all our posts, grouped by tag. Click on a tag that
          interests you and it will bring you to every relevant post.
        </p>
      </div>
      <div className="container mx-auto w-full justify-center bg-white dark:bg-gray-800 rounded-lg">
        <ul className="flex flex-col divide divide-y">
          {group.map((tag) => (
            <>
              {tag.fieldValue.length > 0 && (
                <TagItem tag={tag} key={tag.fieldValue} />
              )}
            </>
          ))}
        </ul>
      </div>
    </div>
  </Layout>
);

export default TagsPage;

export const tagPageQuery = graphql`
  query TagsQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 1000
      sort: { fields: frontmatter___title, order: DESC }
    ) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;

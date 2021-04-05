import React from 'react';
import { kebabCase } from 'lodash';
import { Link, graphql } from 'gatsby';
import { Layout } from '../../components';

const TagItem = ({ tag }) => (
  <li class="border-gray-400 flex flex-row mb-2">
    <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
      <div class="shadow border select-none cursor-pointer bg-white dark:bg-gray-800 rounded-md flex flex-1 items-center p-4">
        <div class="flex-1 pl-1 md:mr-16">
          <div class="font-medium dark:text-white">{tag.fieldValue}</div>
        </div>
        <div class="text-gray-600 dark:text-gray-200 text-xs">
          {tag.totalCount}
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
    <div class="container flex flex-col mx-auto ">
      <ul class="flex flex-col">
        {group.map((tag) => (
          <>
            {tag.fieldValue.length > 0 && (
              <TagItem tag={tag} key={tag.fieldValue} />
            )}
          </>
        ))}
      </ul>
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

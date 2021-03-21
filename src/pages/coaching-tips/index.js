import React from 'react';
import { BlogRoll, Layout } from '../../components';

const BlogIndexPage = ({ location }) => (
  <Layout location={location}>
    <BlogRoll />
  </Layout>
);

export default BlogIndexPage;

import React from 'react';
import { BlogRoll, NavBar } from '../../components';

const BlogIndexPage = () => (
  <>
    <NavBar />
    <section className="section">
      <div className="container">
        <div className="content">
          <BlogRoll />
        </div>
      </div>
    </section>
  </>
);

export default BlogIndexPage;

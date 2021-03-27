import './static/styles/global.css';
import 'intersection-observer';
import React from 'react';

export const wrapRootElement = ({ element }) => (
  <div className="root overflow-hidden">{element}</div>
);

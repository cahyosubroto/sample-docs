import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/sample-docs/markdown-page',
    component: ComponentCreator('/sample-docs/markdown-page', 'e10'),
    exact: true
  },
  {
    path: '/sample-docs/my-markdown-page',
    component: ComponentCreator('/sample-docs/my-markdown-page', 'c33'),
    exact: true
  },
  {
    path: '/sample-docs/my-react-page',
    component: ComponentCreator('/sample-docs/my-react-page', '113'),
    exact: true
  },
  {
    path: '/sample-docs/',
    component: ComponentCreator('/sample-docs/', 'b2f'),
    routes: [
      {
        path: '/sample-docs/',
        component: ComponentCreator('/sample-docs/', 'c5b'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/sample-docs/chainbuilding',
        component: ComponentCreator('/sample-docs/chainbuilding', '80c'),
        exact: true,
        sidebar: "tutorialSidebar"
      }
    ]
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];

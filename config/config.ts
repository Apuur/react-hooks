import { menus } from './hooks';

const packages = require('../packages/hooks/package.json');

export default {
  exportStatic: {}, // 将所有路由输出为 HTML 目录结构，以免刷新页面时 404
  nodeModulesTransform: {
    type: 'none',
    exclude: [],
  },

  history: { type: 'hash' },
  publicPath: '/react-hooks/',
  extraBabelPlugins: [
    [
      'babel-plugin-import',
      {
        libraryName: '@alifd/next',
        style: false,
      },
      'fusion',
    ],
  ],
  mode: 'site',
  title: "xyc's",
  favicon: '/react-hooks/avatar.png',
  logo: '/react-hooks/logo.png',
  dynamicImport: {}, //文档构建后的 bundle 太大了，导致网站访问速度很慢，如何实现按需加载
  manifest: {},
  hash: true,
  alias: {
    encodeHooks: process.cwd() + '/packages/hooks/src/index.ts',
  },
  resolve: {
    includes: ['docs', 'packages/hooks/src'],
  },
  links: [
    {
      rel: 'stylesheet',
      href: 'https://unpkg.com/@alifd/theme-design-pro@0.6.2/dist/next-noreset.min.css',
    },
    { rel: 'stylesheet', href: '/style.css' },
  ],
  navs: [
    { title: '指南', path: '/guide' },
    { title: 'Hooks', path: '/hooks' },
    { title: 'GitHub', path: 'https://github.com/Apuur/react-hooks/tree/gh-pages' },
  ],
  menus: {
    '/': [
      {
        title: '首页',
        path: 'index',
      },
    ],
    '/guide': [
      {
        title: '介绍',
        path: '/guide',
      },
    ],
    '/hooks': menus,
  },
};

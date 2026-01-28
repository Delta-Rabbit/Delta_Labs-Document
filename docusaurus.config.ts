import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Delta Labs Documentation',
  tagline: 'Official coding standards and design system documentation',
  favicon: 'img/favicon.png',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  // Update this after Vercel deployment with your actual Vercel URL
  url: 'https://delta-labs-docs.vercel.app',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For Vercel, use '/' (root)
  baseUrl: '/',

  // GitHub pages deployment config (if using GitHub Pages)
  organizationName: 'Delta-Rabbit', // Your GitHub org/user name
  projectName: 'Delta_Labs-Document', // Your GitHub repo name

  onBrokenLinks: 'warn',

  plugins: [
    [
      require.resolve('@cmfcmf/docusaurus-search-local'),
      {
        indexDocs: true,
        indexBlog: true,
        indexPages: false,
        language: 'en',
        maxSearchResults: 10,
      },
    ],
  ],

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Edit links point to your GitHub repo
          editUrl:
            'https://github.com/Delta-Rabbit/Delta_Labs-Document/tree/main/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Edit links point to your GitHub repo
          editUrl:
            'https://github.com/Delta-Rabbit/Delta_Labs-Document/tree/main/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Delta Labs',
      logo: {
        alt: 'Delta Labs Logo',
        src: 'img/logo.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Documentation',
        },
      ],
    },

    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;

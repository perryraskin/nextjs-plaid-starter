const withCSS = require('@zeit/next-css');
const optimizedImages = require('next-optimized-images');
const withPlugins = require('next-compose-plugins');
const { parsed: localEnv } = require('dotenv').config();
const webpack = require('webpack');
const sitemap = require('nextjs-sitemap-generator'); 

const path = require("path");
const glob = require("glob");
const fs = require('fs');

const globby = require('globby');

const nextConfiguration = {
  env: {
    // Put any public environment variables here
  },
  webpack: (config, { isServer }) => {
    config.plugins.push(new webpack.EnvironmentPlugin(localEnv));
    require('./scripts/generate-sitemap');
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    })

    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.node = {
        fs: 'empty'
      }
    }

    return config;
  },
  // https://nextjs.org/learn/excel/static-html-export
  exportPathMap: async function() {
    // ***** Static Pages *****
    let paths = {
      '/': { page: '/'}
    };

    const appDirectory = fs.realpathSync(process.cwd());
    const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
    // SOURCE is where are stored all pages files
    // By default it tracks all files in the pages folder that end in .tsx
    const SOURCE = process.env.SOURCE || path.join(resolveApp("pages"), "/**/*.tsx");
    // Get list of static pages paths
    let diskPages = glob.sync(SOURCE, {'ignore' : [
      '**/index.tsx', // Ignore the index file
      '**/[*', '**/_*' // Ignore any page names that start with '[' (dynamic pages) or '_' (such as _app.tsx)
    ]});

    for (let page of diskPages) {
      page = page.replace(`${resolveApp("pages")}/`, "/");
      page = page.replace(/.tsx$/, "");

      paths[page] = { page: page};
    }

    // ***** Dynamic Pages *****
    // posts array
    const posts = await globby(['posts/*.md']);
    posts.map((post) => {
      const slug = post.replace('posts/', '').replace('.md', '');
      paths[`/blog/${slug}`] = { page: '/blog/[slug]', query: { handle: slug }}
    });

    return paths;
  }
};

const optImgConfiguration = {
  optimizeImagesInDev: false
};

module.exports = withPlugins([
  [withCSS, nextConfiguration],
  [optimizedImages, optImgConfiguration],
]);

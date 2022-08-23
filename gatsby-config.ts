import fs from 'fs';
import type { GatsbyConfig } from 'gatsby';
import path from 'path';

type RootDirConfig = {
  [key: string]: string;
};

const rootDirsConfig: RootDirConfig = {};
const srcDirs = fs.readdirSync(path.resolve(__dirname, 'src'));
srcDirs.forEach((srcDir) => {
  rootDirsConfig[srcDir] = path.resolve(__dirname, 'src', srcDir);
});

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Flynn & Amie's Wedding`,
    siteUrl: `https://flynn-n-amie.netlify.app`,
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    'gatsby-plugin-postcss',
    {
      resolve: 'gatsby-plugin-root-import',
      options: rootDirsConfig,
    },
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-plugin-google-gtag',
      options: {
        trackingIds: ['G-YP2VXLWL37'],
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/images/wedding_rings.png',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
  ],
};

export default config;

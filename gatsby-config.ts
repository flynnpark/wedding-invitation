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
    title: `wedding-invitation`,
    siteUrl: `https://www.yourdomain.tld`,
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
  ],
};

export default config;

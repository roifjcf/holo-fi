/** @type {import('next').NextConfig} */

const nextConfig = {

  // webpack: (config) => {
  //   config.resolve = {
  //     fallback: {
  //       "fs": false,
  //       "path": false,
  //       "os": false,
  //     }
  //   }
  //   return config
  // },

  // basePath: '/holo-fi', // for page deployment

  output: "export",
  basePath: "/holo-fi", 
  assetPrefix: "/holo-fi/",
};

export default nextConfig;

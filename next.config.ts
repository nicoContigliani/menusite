// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
//   reactStrictMode: true,
//   transpilePackages: ['antd', '@ant-design', 'rc-util', 'lodash-es'],
//   images: {
//     remotePatterns: [
//       {
//         protocol: "http",
//         hostname: "**",
//       },
//       {
//         protocol: "https",
//         hostname: "**",
//       },
//     ],
//   },
// };

// export default nextConfig;


import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ['antd', '@ant-design', 'rc-util', 'lodash-es', 'rc-pagination', 'rc-picker'], // Added rc-picker
  experimental: {
    optimizePackageImports: ['antd', '@ant-design/icons'],
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "**",
      },
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  webpack(config, { isServer }) {
    if (!isServer) {
      config.resolve.extensions.push('.js', '.ts', '.tsx');  // Allow .js files in client-side code
    }
    return config;
  },
};

export default nextConfig;

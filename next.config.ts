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
  reactStrictMode: false,
  transpilePackages: ['antd', '@ant-design', 'rc-util', 'lodash-es', 'rc-pagination', 'rc-picker'],
  experimental: {
    optimizePackageImports: ['antd', '@ant-design/icons'],
    // Remove optimizeCss: true,
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
  output: 'standalone',
};

export default nextConfig;
module.exports = {
  devIndicators: {
    autoPrerender: false,
  },
  images: {
    domains: ["s3-sa-east-1.amazonaws.com", "ik.imagekit.io"],
  },
  experimental: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};

import type {NextConfig} from 'next';

const isGitHubPages = process.env.GITHUB_PAGES === 'true';
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] || '';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
    // For GitHub Pages, we need to handle images differently
    unoptimized: isGitHubPages,
  },
  // Configure output based on deployment target
  output: isGitHubPages ? 'export' : (process.env.NODE_ENV === 'production' ? 'standalone' : undefined),
  
  // GitHub Pages specific configuration
  ...(isGitHubPages && {
    basePath: `/${repoName}`,
    assetPrefix: `/${repoName}/`,
    trailingSlash: true,
  }),
};

export default nextConfig;

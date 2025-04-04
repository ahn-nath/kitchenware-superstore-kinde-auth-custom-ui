import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['res.cloudinary.com'],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src * 'unsafe-inline' 'unsafe-eval';",
          },
        ],
      },
    ];
  },
  env: {
    KINDE_SITE_URL:
      process.env.KINDE_SITE_URL ??
      `https://kwss-kitchenwarehouse.frontend.site/`,
    KINDE_POST_LOGOUT_REDIRECT_URL:
      process.env.KINDE_POST_LOGOUT_REDIRECT_URL ??
      `https://kwss-kitchenwarehouse.frontend.site/`,
    KINDE_POST_LOGIN_REDIRECT_URL:
      process.env.KINDE_POST_LOGIN_REDIRECT_URL ??
      `https://kwss-kitchenwarehouse.frontend.site/`,
  },
};

export default nextConfig;

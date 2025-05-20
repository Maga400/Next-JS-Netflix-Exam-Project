import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

// next-intl eklentisini başlat
const withNextIntl = createNextIntlPlugin();

// Temel Next.js ayarları
const nextConfig: NextConfig = {
  images: {
    domains: ['image.tmdb.org'],
  },
};

export default withNextIntl(nextConfig);
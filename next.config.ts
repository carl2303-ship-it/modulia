import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    const finitionSlugs = [
      "decor-exterior",
      "lames-terrasse",
      "murs-interieurs",
      "murs-decoratifs",
      "parquet",
      "sdb-couleurs",
    ];
    return [
      {
        source: "/modelos/espaco",
        destination: "/modelos/espacao",
        permanent: true,
      },
      {
        source: "/equilibro",
        destination: "/personnaliser?model=equilibro",
        permanent: true,
      },
      ...finitionSlugs.map((slug) => ({
        source: `/options/${slug}`,
        destination: `/personnalisation/${slug}`,
        permanent: true,
      })),
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;

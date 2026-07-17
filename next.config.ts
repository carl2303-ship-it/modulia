import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

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

export default withNextIntl(nextConfig);

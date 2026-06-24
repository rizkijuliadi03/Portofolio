import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async headers() {
    return [
      {
        source: "/rizki-juliadi-cv.pdf",
        headers: [
          {
            key: "Content-Disposition",
            value: "attachment; filename=\"rizki-juliadi-cv.pdf\"",
          },
          {
            key: "Content-Type",
            value: "application/pdf",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async headers() {
    return [
      {
        source: "/RIZKI-JULIADI-CV-2026-New-New.pdf",
        headers: [
          {
            key: "Content-Disposition",
            value: "attachment; filename=\"RIZKI-JULIADI-CV-2026-New-New.pdf\"",
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

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        // The combined "Aerospace CFD & FSI" case study was split into the
        // wind-turbine and NACA 0012 studies. That URL is the one already
        // indexed and linked, so it points at the larger of the two rather
        // than at a 404. The aerofoil page is linked from it.
        source: "/projects/aerospace-cfd-fsi",
        destination: "/projects/wind-turbine-aero-structural",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

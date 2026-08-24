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
      {
        // The NACA 0012 Fluent study and the C++ solver were separate
        // projects and are now one page. The solver is the substance of it,
        // so the old aerofoil URL points there rather than at a 404, and the
        // Fluent material is a section on the page it lands on.
        source: "/projects/naca0012-aerofoil",
        destination: "/projects/naca-cfd-solver",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

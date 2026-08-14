/**
 * Capability groups shown on the homepage. Every entry is evidenced by the
 * public repositories — see docs/content-sources.md before adding to it.
 */
export const capabilities = [
  {
    title: "Simulation & Analysis",
    items: [
      "ANSYS Fluent, CFX & Mechanical",
      "RANS turbulence modelling (k–ε, SST k–ω)",
      "Rotating reference frames & periodic domains",
      "One-way fluid–structure interaction",
      "Abaqus 3D ply-by-ply finite elements",
      "Verification & validation: Richardson / GCI, y⁺ audits, hand-calculation cross-checks",
    ],
  },
  {
    title: "Structures & Composites",
    items: [
      "Classical laminate theory & ABD matrices",
      "Hashin failure criteria, O'Brien energy release rates",
      "Free-edge interlaminar stress analysis",
      "Thin-ply laminate manufacture (layup, bagging, autoclave)",
      "Tensile testing with video-gauge strain measurement",
      "SEM fractography",
    ],
  },
  {
    title: "Programming & Computational Methods",
    items: [
      "Python (NumPy, SciPy, Matplotlib, pytest)",
      "MATLAB analysis pipelines",
      "Automated test suites asserting physical properties",
      "Reproducible, provenance-tracked analysis",
      "C++ with SYCL/DPC++ & FPGA optimisation (in progress)",
    ],
  },
  {
    title: "Design & Experimentation",
    items: [
      "Autodesk Inventor — full-vehicle assembly (535 files)",
      "XFoil aerofoil analysis",
      "FDM additive manufacture for flight parts",
      "Wind-tunnel testing with a six-component balance",
      "Ultimate load testing & failure investigation",
      "Requirements traceability & concept downselection",
    ],
  },
] as const;

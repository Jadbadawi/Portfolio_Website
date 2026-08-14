import type { Project } from "./types";

const img = (file: string) => `/images/aerospace-cfd-fsi/${file}`;

export const aerospaceCfdFsi: Project = {
  slug: "aerospace-cfd-fsi",
  title: "Aerospace CFD & Fluid–Structure Interaction",
  shortTitle: "Aerospace CFD & FSI",
  tagline:
    "Carrying a CFD result from hand calculation to validated solution — then coupling it into a structural analysis.",
  summary:
    "Validated NACA 0012 aerodynamics and a one-way coupled wind-turbine fluid–structure interaction study in ANSYS Fluent and Mechanical, with formal verification and validation throughout.",
  category: "CFD · Multiphysics",
  period: "Summer 2026",
  featured: true,
  order: 1,

  hero: {
    src: img("naca-velocity-contours.png"),
    alt: "Velocity magnitude contours around a NACA 0012 aerofoil at 10 degrees incidence, showing leading-edge stagnation, suction-surface acceleration and the trailing wake",
    caption:
      "Velocity magnitude around the NACA 0012 at 10° incidence — stagnation at the leading edge, acceleration to nearly twice free-stream over the suction surface, wake deficit aft of the trailing edge.",
    width: 1136,
    height: 922,
  },
  card: {
    src: img("card.png"),
    alt: "CFD velocity contours around a NACA 0012 aerofoil",
    width: 880,
    height: 495,
  },
  ogImage: img("og.png"),

  disciplines: [
    "External aerodynamics",
    "RANS turbulence modelling",
    "Fluid–structure interaction",
    "Structural FEA",
    "Verification & validation",
  ],
  tools: [
    "ANSYS Fluent",
    "ANSYS CFX",
    "ANSYS Mechanical",
    "SpaceClaim",
    "Python",
  ],

  githubUrl: "https://github.com/Jadbadawi/aerospace-cfd-fsi",

  stats: [
    {
      value: "1.4 %",
      label: "Lift vs experiment",
      detail: "CL ≈ 1.06 against NASA measurements of 1.07–1.08",
    },
    {
      value: "0.116 %",
      label: "Root reaction vs hand calc",
      detail: "1,578.1 kN from ANSYS against 1,576.3 kN analytically",
    },
    {
      value: "0.405 m",
      label: "Blade tip deflection",
      detail: "0.92 % of the 44.2 m rotor radius",
    },
    {
      value: "10⁻⁷",
      label: "Mass imbalance",
      detail: "Normalised against the incoming flow",
    },
  ],

  sections: [
    {
      id: "overview",
      title: "Two linked studies",
      kicker: "Overview",
      blocks: [
        {
          kind: "text",
          body: [
            "This project is built around a simple claim: a CFD result only means something if you can show why it should be believed. It consists of two linked studies in ANSYS 2026 R1, developed alongside CornellX's ENGR2000X simulation course on edX.",
            "The first is a two-dimensional steady RANS solution over a NACA 0012 aerofoil at 10° incidence and a chord Reynolds number of 6×10⁶ — deliberately a case with high-quality NASA experimental data, so the full verification and validation argument can be carried to the end. The second is the centrepiece: a three-bladed horizontal-axis wind turbine solved as a one-way coupled fluid–structure interaction, where a rotating-frame CFD solution provides the pressure field that loads an orthotropic composite shell model of the blade.",
            "The aerofoil case builds the underlying competencies — turbulence modelling, near-wall meshing, formal V&V — that then carry into the multiphysics study.",
          ],
        },
        {
          kind: "flow",
          steps: [
            { title: "Pre-analysis", detail: "Hand calculations: Reynolds number, dynamic pressure, thin-aerofoil lift, y⁺ sizing" },
            { title: "Mesh design", detail: "Boundary-layer inflation sized from the wall treatment the closure model requires" },
            { title: "RANS solution", detail: "Finite-volume method, k–ε / SST k–ω closures" },
            { title: "Verification", detail: "Mass conservation, iterative convergence, y⁺ audit, grid-convergence plan" },
            { title: "Validation", detail: "Surface pressure against NASA experimental data" },
            { title: "FSI coupling", detail: "CFD pressure field mapped onto a structural shell model" },
          ],
        },
      ],
    },
    {
      id: "naca0012",
      title: "NACA 0012 — external aerodynamics and validation",
      kicker: "Study 1",
      blocks: [
        {
          kind: "text",
          body: [
            "The write-up carries the full chain of reasoning behind the solution: Reynolds decomposition and why the closure problem arises, the Boussinesq eddy-viscosity hypothesis and why turbulent viscosity is not a fluid property, both k–ε transport equations with their five calibrated constants and known weaknesses, finite-volume discretisation down to the assembled algebraic system, and near-wall theory — viscous sublayer, buffer layer, log law — driving first-cell sizing.",
            "Before any solver was opened, a thin-aerofoil hand calculation put lift at CL = 1.097. The converged RANS solution gives CL ≈ 1.06 against experimental values of 1.07–1.08 — about **1.4 % low**.",
          ],
        },
        {
          kind: "figurePair",
          figures: [
            {
              src: img("naca-pressure-contours.png"),
              alt: "Static pressure contours around the NACA 0012 aerofoil showing the leading-edge suction peak and trailing-edge pressure recovery",
              caption:
                "Pressure field — the suction peak and trailing-edge recovery. Pressure barely varies across the thin boundary layer, which is exactly why lift is so much easier to predict than drag.",
              width: 1136,
              height: 922,
            },
            {
              src: img("naca-tke.png"),
              alt: "Turbulent kinetic energy contours isolating the boundary layer as a thin sheet that thickens aft and sheds into the wake",
              caption:
                "Turbulent kinetic energy — the most diagnostically useful plot: if the near-wall mesh were too coarse, this layer would smear across cells instead of appearing as a sharp sheet.",
              width: 1136,
              height: 922,
            },
          ],
        },
        {
          kind: "text",
          body: [
            "Validation compares the predicted surface pressure distribution against the NASA NACA 0012 resources — Gregory & O'Reilly for surface pressure, Ladson for force coefficients — at matched Reynolds number and incidence. The computed Cp distribution overlaps the experimental data closely across the full chord: suction peak, pressure recovery and stagnation region.",
            "Matching the full Cp distribution is a deliberately stronger claim than matching lift alone. An integrated coefficient can agree through error cancellation; a point-by-point match across the chord cannot happen by accident. And because the Cp distribution *is* the aerodynamic loading, it is also the quantity the structural side of an FSI analysis actually consumes.",
          ],
        },
        {
          kind: "note",
          tone: "insight",
          body:
            "Verification and validation answer different questions. Verification asks whether the equations were solved correctly; validation asks whether those equations describe the real flow. A converged solution of the wrong equations is still wrong.",
        },
      ],
    },
    {
      id: "verification",
      title: "The verification argument",
      kicker: "V&V",
      blocks: [
        {
          kind: "text",
          body: [
            "Numerical verification runs alongside the physical validation, as a separate argument with separate evidence:",
          ],
        },
        {
          kind: "list",
          items: [
            "**Mass conservation** — normalised imbalance of order 10⁻⁷ of the incoming flow.",
            "**Iterative convergence** — residuals driven to ≈10⁻⁶ with flat force monitors, not residuals alone.",
            "**Near-wall audit** — the computed y⁺ distribution checked against the range the chosen wall treatment actually requires, rather than assumed.",
            "**Domain and grid independence** — set out as a controlled six-case verification matrix, one variable changed at a time, each case with a stated acceptance criterion, using Richardson extrapolation and the grid convergence index.",
          ],
        },
        {
          kind: "text",
          body: [
            "The repository also includes a dependency-free Python tool, `preanalysis.py`, that recomputes the entire pre-analysis from raw case inputs — Reynolds number, dynamic pressure, inlet decomposition, thin-aerofoil lift, y⁺-based first-cell sizing, Richardson extrapolation with GCI, and normalised mass imbalance — so every number quoted in the project can be checked rather than taken on trust. It generalises to arbitrary cases: sizing a wall-resolved mesh at a different incidence is one command-line flag.",
          ],
        },
      ],
    },
    {
      id: "turbine-fsi",
      title: "Wind turbine — one-way fluid–structure interaction",
      kicker: "Study 2",
      blocks: [
        {
          kind: "text",
          body: [
            "The main study couples two physics domains: the output of a rotating-frame CFD solution becomes the load input to a static structural analysis. That is how real aeroelastic sizing work is organised — and it introduces a class of error, load transfer between non-matching meshes, that no single-physics analysis has.",
            "The rotor is solved in a rotating reference frame, so a steady solution captures rotation without a transient sliding interface, and rotational periodicity lets one blade in a 120° sector stand for all three — cutting cost by a factor of three at the price of excluding tower shadow, wind shear and yaw.",
          ],
        },
        {
          kind: "figure",
          figure: {
            src: img("turbine-mesh.png"),
            alt: "Computational mesh of the 120-degree periodic wind turbine sector, refined toward the blade surfaces",
            caption:
              "The 120° periodic sector mesh, refined toward the blade surfaces to resolve the boundary layer, with sphere-of-influence refinement through the rotor and wake.",
            width: 2000,
            height: 1042,
          },
        },
        {
          kind: "text",
          body: [
            "The first check is kinematic: blade velocity in the stationary frame reaches 98.05 m/s at the tip of the 44.2 m rotor, against 98.12 m/s from ΩR by hand — 0.07 % agreement that verifies the rotation rate, axis, units and root offset in a single number.",
            "A section cut through the blade shows the aerofoil doing what the NACA 0012 study says it should — which is the point of having done that study first: a stagnation point at +199 Pa on the pressure side and a suction peak of −395 Pa. That pressure difference produces both the useful torque and the flapwise bending load the structure has to survive.",
          ],
        },
        {
          kind: "figurePair",
          figures: [
            {
              src: img("turbine-section-pressure.png"),
              alt: "Pressure contours on a section through the turbine blade, stagnation point at +199 Pa and suction peak at −395 Pa",
              caption: "Sectional pressure contours — stagnation +199 Pa, suction peak −395 Pa.",
              width: 1174,
              height: 922,
            },
            {
              src: img("turbine-rotor-vectors.png"),
              alt: "Blade velocity vectors in the stationary frame showing the linear increase of velocity with radius up to 98 m/s at the tip",
              caption: "Blade velocity in the stationary frame — tip speed 98 m/s, linear Ωr distribution along the span.",
              width: 1174,
              height: 922,
            },
          ],
        },
        {
          kind: "text",
          body: [
            "The blade is modelled as a homogenised orthotropic composite shell — outer skin plus internal spar, both tapering along the span, with longitudinal stiffness 15× the transverse. The CFD pressure field plus centrifugal inertia, with the root on a remote displacement, gives a maximum tip deflection of **0.405 m**: classic cantilever behaviour, near-zero at the root and growing non-linearly toward the tip.",
          ],
        },
        {
          kind: "figure",
          figure: {
            src: img("turbine-fea-deformation.png"),
            alt: "Total deformation contour of the turbine blade from the structural analysis, increasing from root to a 0.405 m maximum at the tip",
            caption:
              "Total deformation under the mapped CFD pressure field plus centrifugal loading — 0.405 m at the tip, 0.92 % of rotor radius.",
            width: 1042,
            height: 471,
            plate: true,
          },
        },
        {
          kind: "text",
          body: [
            "The strongest check in the project is the root radial reaction. For a rigidly rotating mass distribution, the total radial force reduces exactly to mΩ²r_cm regardless of how the mass is distributed. With a 22,473 kg blade and centre of mass at 14.232 m, that gives 1,576.3 kN by hand against 1,578.1 kN from ANSYS — **0.116 %**. One number simultaneously verifies the mass, density, centre of mass, angular velocity, centrifugal load implementation and reaction extraction.",
            "Tip deflection matters twice over: it is a design-driving constraint on real turbines — the blade must not strike the tower — and it decides whether one-way coupling was legitimate in the first place. At 0.92 % of rotor radius, the assumption looks defensible at this operating point.",
          ],
        },
      ],
    },
    {
      id: "limitations",
      title: "Limitations, stated plainly",
      kicker: "Engineering judgement",
      blocks: [
        {
          kind: "text",
          body: [
            "The repository reports what the model cannot say with the same prominence as what it can:",
          ],
        },
        {
          kind: "list",
          items: [
            "**The power coefficient is not converged.** Cp ≈ 0.141 sits well below the 0.30–0.45 a real machine of this class achieves, and the refinement evidence shows it still moving at 7.7 million cells. It is a coarse-mesh number, not a performance prediction — and it is reported as such.",
            "**No experimental data exists** for either half of the turbine study, so it is numerically verified and physically assessed but cannot be called validated.",
            "**One-way coupling only** — the load is that of the undeformed blade, and the change in local twist, which actually sets angle of attack, was not extracted.",
            "**Periodic sector**: no tower shadow, wind shear, yaw misalignment or transient gusts.",
            "**Static structural only** — no modal or fatigue analysis, and fatigue is what drives blade life in service.",
            "**Von Mises against UTS is the wrong failure measure** for an orthotropic composite; the ≈16 factor of safety is a scalar screen, not a strength assessment.",
            "Run on the ANSYS Student licence, which caps mesh size and limits boundary-layer resolution.",
          ],
        },
        {
          kind: "note",
          tone: "insight",
          body:
            "Reporting an unconverged Cp as unconverged — rather than as a result — is the point. The value of a simulation portfolio is not the contour plots; it is the evidence that the author knows which numbers to trust.",
        },
      ],
    },
  ],
};

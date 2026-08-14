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
    src: img("turbine-mesh.png"),
    alt: "Computational mesh of the 120-degree periodic wind turbine sector, refined toward the blade surfaces",
    caption:
      "The 120° periodic sector mesh for the wind-turbine study, refined toward the blade surfaces to resolve the boundary layer, with sphere-of-influence refinement through the rotor and wake.",
    width: 2000,
    height: 1042,
  },
  card: {
    src: img("card.png"),
    alt: "CFD pressure contours around a NACA 0012 aerofoil",
    width: 900,
    height: 506,
  },
  cardHover: {
    src: img("turbine-fea-deformation.png"),
    alt: "",
    width: 1042,
    height: 471,
    fit: "contain",
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
          ],
        },
        {
          kind: "figure",
          figure: {
            src: img("reasoning-chain.png"),
            alt: "Diagram of the CFD reasoning chain: physical problem, mathematical model, geometry and mesh, numerical solution, post-processing, verification and validation, with feedback loops back to mesh and closure",
            caption:
              "The chain of reasoning the project follows. The dashed returns matter as much as the forward path: verification failures send you back to the mesh, validation failures back to the physics model.",
            width: 1638,
            height: 472,
            plate: true,
          },
        },
        {
          kind: "text",
          body: [
            "Note the ordering of the last two steps. Verification comes before validation, and it is not optional: comparing an unverified solution against experiment tells you nothing useful. If it disagrees you cannot tell whether the physics model is wrong or the mesh is too coarse; if it agrees you cannot tell whether it agreed for the right reason.",
          ],
        },
      ],
    },
    {
      id: "problem",
      title: "The physical problem and its domain",
      kicker: "Setup",
      blocks: [
        {
          kind: "figureAside",
          side: "left",
          figure: {
            src: img("domain-and-bcs.png"),
            alt: "Diagram of the computational domain: an elliptical far-field boundary around the aerofoil, labelled with a velocity inlet, a pressure outlet, and no-slip upper and lower wall boundaries",
            caption:
              "The fluid domain — velocity inlet, pressure outlet, and no-slip upper and lower surfaces, with the free stream entering at α = 10°.",
            width: 1363,
            height: 633,
            plate: true,
          },
          body: [
            "The case is steady, turbulent, two-dimensional flow around a symmetric NACA 0012 section at 10° angle of attack, with a 1 m chord and air approaching at 51.45 m/s.",
            "The domain is the region *between* the aerofoil surface and an outer far-field boundary placed roughly 12.5 chord lengths away. That outer boundary is a numerical stand-in for infinity — the real flow extends indefinitely, and truncating it is an approximation whose adequacy has to be demonstrated rather than assumed.",
            "Before any solver was opened, a thin-aerofoil hand calculation put lift at CL = 1.097. That number is what makes the CFD result falsifiable: without an independent expectation, any output has to be accepted on faith.",
          ],
        },
      ],
    },
    {
      id: "meshing",
      title: "Designing the mesh",
      kicker: "Discretisation",
      blocks: [
        {
          kind: "text",
          body: [
            "Mesh design is not a matter of making cells small everywhere — that is unaffordable and unnecessary. It is a matter of spending cells where the gradients are: the leading edge, the boundary layer, the trailing edge and the wake. The mesh here contains roughly 27,000 cells.",
          ],
        },
        {
          kind: "figurePair",
          labels: ["Mesh strategy", "Near-wall theory"],
          figures: [
            {
              src: img("mesh-strategy.png"),
              alt: "Mesh strategy diagram showing ten inflation layers at growth ratio 1.2, a sphere of influence of radius three chords, wake refinement and bidirectional edge bias",
              caption:
                "Ten inflation layers at growth 1.2, a sphere of influence at r ≈ 3c with local size 0.05c, wake refinement, and bidirectional edge bias concentrating cells at both leading and trailing edges.",
              width: 1366,
              height: 612,
              plate: true,
            },
            {
              src: img("near-wall-velocity-laws.png"),
              alt: "Plot of non-dimensional velocity against wall distance showing the viscous law and the log law, with the viscous sublayer and the standard wall-function target region marked",
              caption:
                "The viscous law and log law in wall units, with the 30 < y⁺ < 300 band that standard wall functions require. This is what sets the first-cell height.",
              width: 1393,
              height: 818,
              plate: true,
            },
          ],
        },
        {
          kind: "note",
          tone: "caveat",
          body:
            "The y⁺ audit found that much of the aerofoil does **not** sit in the 30–300 range the chosen wall functions require — the solver is applying a log-law relation at points where the log law does not hold. The mesh and the wall treatment are inconsistent, and the write-up says so rather than quietly reporting the lift coefficient.",
        },
      ],
    },
    {
      id: "results",
      title: "Aerodynamic results",
      kicker: "Post-processing",
      blocks: [
        {
          kind: "text",
          body: [
            "Each field below is checked against what the pre-analysis predicted, rather than merely described.",
          ],
        },
        {
          kind: "figurePair",
          labels: ["Velocity magnitude", "Velocity vectors"],
          figures: [
            {
              src: img("naca-velocity-contours.png"),
              alt: "Velocity magnitude contours showing the stagnation region, acceleration over the suction surface and the wake deficit",
              caption:
                "Far-field velocity matches the specified free stream — the fastest check that boundary conditions were applied as intended. Flow accelerates to nearly twice free-stream around the upper leading edge.",
              width: 1136,
              height: 922,
            },
            {
              src: img("naca-velocity-vectors.png"),
              alt: "Velocity vectors showing the flow turning around the leading edge of the aerofoil",
              caption: "Flow turning around the leading edge, displaced toward the lower surface by the positive incidence.",
              width: 999,
              height: 578,
            },
          ],
        },
        {
          kind: "figure",
          figure: {
            src: img("naca-pressure-contours.png"),
            alt: "Static pressure contours around the NACA 0012 aerofoil showing the leading-edge suction peak and trailing-edge pressure recovery",
            caption:
              "Higher pressure below, lower above — this difference is the lift. Pressure changes very little across the thin boundary layer, a genuine result of boundary-layer theory rather than a plotting artefact, and the reason the pressure field is comparatively insensitive to near-wall mesh quality.",
            width: 1136,
            height: 922,
          },
        },
        {
          kind: "figureAside",
          side: "right",
          figure: {
            src: img("naca-tke.png"),
            alt: "Turbulent kinetic energy contours isolating the boundary layer as a thin sheet that thickens aft and sheds into the wake",
            caption:
              "Turbulent kinetic energy — the boundary layer as a thin, high-k sheet hugging the surface.",
            width: 1136,
            height: 922,
          },
          body: [
            "The turbulence field is the most diagnostically useful of the four plots, and the one most often skipped. It isolates the boundary layer as a thin high-k sheet, thickening toward the trailing edge and shedding into the wake — a direct picture of where turbulent momentum transport is happening.",
            "It also works as a **visual mesh check**. Turbulence production peaks where mean shear is greatest, very close to the wall. If the near-wall mesh is adequate, that appears as a sharp, well-defined sheet; if it is too coarse, the peak smears across cells and the sheet looks diffuse — a direct visual symptom of the resolution problem the y⁺ audit quantifies.",
          ],
        },
      ],
    },
    {
      id: "verification",
      title: "Verification and validation",
      kicker: "V&V",
      blocks: [
        {
          kind: "figure",
          figure: {
            src: img("verification-vs-validation.png"),
            alt: "Diagram contrasting verification, which asks whether the equations were solved correctly, with validation, which asks whether those equations describe the real flow",
            caption:
              "Two different questions, routinely conflated. Verification is answered from inside the simulation; validation can only be answered against independent measurement.",
            width: 1565,
            height: 604,
            plate: true,
          },
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
          kind: "figureAside",
          side: "left",
          figure: {
            src: img("experimental-cp-reference.png"),
            alt: "Plot of experimental upper-surface pressure coefficient against chord position for the NACA 0012, with an inverted vertical axis",
            caption:
              "The NASA experimental upper-surface Cp reference data used for validation. Note the inverted vertical axis — the aerodynamic convention, which puts stronger suction higher on the page.",
            width: 1382,
            height: 838,
            plate: true,
          },
          body: [
            "Validation compares the predicted surface pressure distribution against the NASA NACA 0012 resources — Gregory & O'Reilly for surface pressure, Ladson for force coefficients — at matched Reynolds number and incidence. The computed Cp distribution overlaps this experimental data closely across the full chord.",
            "The integrated lift follows at CL ≈ 1.06 against an experimental 1.07–1.08, about **1.4 % low**, and against the thin-aerofoil hand calculation of 1.097 made before any solver was opened.",
            "Matching the full Cp distribution is a deliberately stronger claim than matching lift alone. An integrated coefficient can agree through error cancellation between two compensating errors; a point-by-point match across the chord cannot happen by accident. And because the Cp distribution *is* the aerodynamic loading, it is also the quantity the structural side of an FSI analysis consumes.",
          ],
        },
        {
          kind: "note",
          tone: "insight",
          body:
            "A converged solution of the wrong equations is still wrong. A correct physical model solved on an inadequate mesh is also still wrong. Both failures produce output that looks entirely normal — which is why the two questions have to be asked separately.",
        },
      ],
    },
    {
      id: "turbine-fsi",
      title: "Wind turbine — one-way fluid–structure interaction",
      kicker: "Multiphysics",
      blocks: [
        {
          kind: "text",
          body: [
            "The main study couples two physics domains: the output of a rotating-frame CFD solution becomes the load input to a static structural analysis. That is how real aeroelastic sizing work is organised — and it introduces a class of error, load transfer between non-matching meshes, that no single-physics analysis has.",
            "The rotor is solved in a rotating reference frame, so a steady solution captures rotation without a transient sliding interface, and rotational periodicity lets one blade in a 120° sector stand for all three — cutting cost by a factor of three at the price of excluding tower shadow, wind shear and yaw.",
          ],
        },
        {
          kind: "text",
          body: [
            "The sector mesh at the top of this page is that domain: one blade, 120° of azimuth, with the periodic faces standing in for the two blades that are not meshed.",
            "The first check is kinematic: blade velocity in the stationary frame reaches 98.05 m/s at the tip of the 44.2 m rotor, against 98.12 m/s from ΩR by hand — 0.07 % agreement that verifies the rotation rate, axis, units and root offset in a single number.",
          ],
        },
        {
          kind: "figureStrip",
          figures: [
            {
              src: img("turbine-rotor-vectors.png"),
              alt: "Blade velocity vectors in the stationary frame showing the linear increase of velocity with radius up to 98 m/s at the tip",
              caption: "Blade velocity, stationary frame — the linear Ωr distribution along the span.",
              width: 1174,
              height: 922,
            },
            {
              src: img("turbine-section-pressure.png"),
              alt: "Pressure contours on a section through the turbine blade, stagnation point at +199 Pa and suction peak at −395 Pa",
              caption: "Sectional pressure — stagnation +199 Pa, suction peak −395 Pa.",
              width: 1174,
              height: 922,
            },
            {
              src: img("turbine-section-velocity.png"),
              alt: "Velocity vectors on a section through the turbine blade showing accelerated flow over the suction side up to 34.8 metres per second",
              caption: "Sectional velocity vectors — accelerated flow over the suction side, up to 34.8 m/s.",
              width: 1174,
              height: 922,
            },
          ],
        },
        {
          kind: "text",
          body: [
            "The section cut shows the aerofoil doing what the NACA 0012 study says it should — which is the point of having done that study first. The pressure difference across the section produces both the useful torque and the flapwise bending load the structure has to survive.",
          ],
        },
      ],
    },
    {
      id: "structural",
      title: "From pressure field to structural response",
      kicker: "Coupling",
      blocks: [
        {
          kind: "figureAside",
          side: "right",
          figure: {
            src: img("turbine-fea-deformation.png"),
            alt: "Total deformation contour of the turbine blade from the structural analysis, increasing from root to a 0.405 metre maximum at the tip",
            caption:
              "Total deformation under the mapped CFD pressure field plus centrifugal loading — 0.405 m at the tip, 0.92 % of rotor radius.",
            width: 1042,
            height: 471,
            plate: true,
          },
          body: [
            "The blade is modelled as a homogenised orthotropic composite shell — outer skin plus internal spar, both tapering along the span, with longitudinal stiffness 15× the transverse. The CFD pressure field plus centrifugal inertia, with the root on a remote displacement, gives a maximum tip deflection of **0.405 m**: classic cantilever behaviour, near-zero at the root and growing non-linearly toward the tip, since each span station carries the integrated moment of all load outboard of it.",
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

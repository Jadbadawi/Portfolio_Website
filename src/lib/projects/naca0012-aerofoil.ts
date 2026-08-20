import type { Project } from "./types";

const img = (file: string) => `/images/naca0012-aerofoil/${file}`;

/**
 * The aerofoil half of what was one combined "Aerospace CFD & FSI" case
 * study. The wind-turbine half is now `wind-turbine-aero-structural`, and
 * `next.config.ts` redirects the old `/projects/aerospace-cfd-fsi` URL
 * there. The two pages share one repository and link to each other.
 *
 * This page owns the validation story, because the NACA 0012 is the only
 * case in the portfolio with matched experimental data behind it. Keep the
 * turbine's multiphysics and credibility material off it.
 */
export const naca0012Aerofoil: Project = {
  slug: "naca0012-aerofoil",
  title: "NACA 0012 Aerofoil: Verification and Validation",
  shortTitle: "NACA 0012 Aerofoil CFD",
  tagline:
    "Carrying a two-dimensional RANS solution from a hand calculation through to a point-by-point comparison against NASA measurements, and reporting the part of the mesh that does not support the answer.",
  summary:
    "Steady RANS over a NACA 0012 at 10° and a chord Reynolds number of 6×10⁶, verified against a thin-aerofoil hand calculation and validated across the chord against NASA surface-pressure data, with a near-wall audit that found the wall treatment inconsistent with the mesh.",
  category: "CFD · Verification & validation",
  period: "Summer 2026",
  featured: true,
  order: 5,

  hero: {
    src: img("naca-velocity-contours.png"),
    alt: "Velocity magnitude contours around a NACA 0012 aerofoil at 10 degrees incidence, showing the stagnation region, acceleration over the suction surface and the wake deficit",
    caption:
      "Velocity magnitude at 10° incidence. Far-field velocity matches the specified free stream, which is the fastest check that the boundary conditions were applied as intended; flow accelerates to nearly twice free-stream around the upper leading edge.",
    width: 1136,
    height: 922,
  },
  card: {
    src: img("card.png"),
    alt: "CFD pressure contours around a NACA 0012 aerofoil",
    width: 900,
    height: 506,
  },
  cardHover: {
    src: img("experimental-cp-reference.png"),
    alt: "",
    width: 1382,
    height: 838,
    fit: "contain",
  },
  ogImage: img("og.png"),

  disciplines: [
    "External aerodynamics",
    "RANS turbulence modelling",
    "Near-wall modelling",
    "Verification & validation",
  ],
  tools: ["ANSYS Fluent", "SpaceClaim", "Python"],

  githubUrl: "https://github.com/Jadbadawi/aerospace-cfd-fsi",
  externalLinks: [
    {
      label: "Wind turbine study",
      url: "/projects/wind-turbine-aero-structural",
    },
  ],

  stats: [
    {
      value: "1.4 %",
      label: "Lift vs experiment",
      detail: "CL ≈ 1.06 against NASA measurements of 1.07 to 1.08",
    },
    {
      value: "1.097",
      label: "Thin-aerofoil prediction",
      detail: "Computed before the solver was opened, so the CFD was falsifiable",
    },
    {
      value: "10⁻⁷",
      label: "Mass imbalance",
      detail: "Normalised against the incoming flow",
    },
    {
      value: "y⁺ audit",
      label: "Failed, and reported",
      detail: "Much of the surface sits outside the range the wall treatment needs",
    },
  ],

  sections: [
    {
      id: "overview",
      title: "Why this case",
      kicker: "Overview",
      blocks: [
        {
          kind: "text",
          body: [
            "A CFD result only means something if you can show why it should be believed. This study is a two-dimensional steady RANS solution over a NACA 0012 aerofoil at 10° incidence and a chord Reynolds number of 6×10⁶, run in ANSYS 2026 R1 alongside CornellX's ENGR2000X simulation course on edX.",
            "The case was chosen for one reason: high-quality NASA experimental data exists for it, so the full verification and validation argument can be carried all the way to the end rather than stopping at plausibility. It is the only case in this portfolio where that is true, which is exactly why the wind turbine study, built on the same solver and the same discipline, cannot be called validated.",
          ],
        },
        {
          kind: "figure",
          figure: {
            src: img("reasoning-chain.png"),
            alt: "Diagram of the CFD reasoning chain: physical problem, mathematical model, geometry and mesh, numerical solution, post-processing, verification and validation, with feedback loops back to mesh and closure",
            caption:
              "The chain of reasoning the project follows. The dashed returns matter as much as the forward path. Verification failures send you back to the mesh, validation failures back to the physics model.",
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
              "The fluid domain: velocity inlet, pressure outlet, and no-slip upper and lower surfaces, with the free stream entering at α = 10°.",
            width: 1363,
            height: 633,
            plate: true,
          },
          body: [
            "The case is steady, turbulent, two-dimensional flow around a symmetric NACA 0012 section at 10° angle of attack, with a 1 m chord and air approaching at 51.45 m/s.",
            "The domain is the region between the aerofoil surface and an outer far-field boundary placed roughly 12.5 chord lengths away. That outer boundary is a numerical stand-in for infinity. The real flow extends indefinitely, so truncating it is an approximation whose adequacy has to be demonstrated rather than assumed.",
            "Before any solver was opened, a thin-aerofoil hand calculation put lift at CL = 1.097. That number is what makes the CFD result falsifiable. Without an independent expectation, any output has to be accepted on faith.",
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
            "Mesh design is not a matter of making cells small everywhere, which is both unaffordable and unnecessary. It is a matter of spending cells where the gradients are: the leading edge, the boundary layer, the trailing edge and the wake. The mesh here contains roughly 27,000 cells.",
          ],
        },
        {
          kind: "specGrid",
          items: [
            {
              title: "Boundary layer refinement",
              body: "Ten inflation layers were applied around the aerofoil with a growth rate of 1.2. They provide additional resolution normal to the wall, where the strongest velocity gradients occur.",
            },
            {
              title: "Local aerofoil refinement",
              body: "A sphere of influence with a radius of approximately three chord lengths was used around the aerofoil. Within that region the local element size is approximately 0.05c.",
            },
            {
              title: "Wake refinement",
              body: "Additional refinement was applied downstream of the trailing edge, to resolve the wake and the downstream velocity gradients it carries.",
            },
            {
              title: "Edge biasing",
              body: "Bidirectional edge biasing concentrates smaller elements near the leading and trailing edges, where the geometry and the aerodynamic gradients require greater resolution.",
            },
          ],
        },
        {
          kind: "figure",
          figure: {
            src: img("near-wall-velocity-laws.png"),
            alt: "Plot of non-dimensional velocity against wall distance showing the viscous law and the log law, with the viscous sublayer and the standard wall-function target region marked",
            caption:
              "The viscous law and log law in wall units, with the 30 < y⁺ < 300 band that standard wall functions require. This is what sets the first-cell height.",
            width: 1393,
            height: 818,
            plate: true,
          },
        },
        {
          kind: "note",
          tone: "caveat",
          body:
            "The y⁺ audit found that much of the aerofoil does **not** sit in the 30 to 300 range the chosen wall functions require, so the solver is applying a log-law relation at points where the log law does not hold. The mesh and the wall treatment are inconsistent, and the write-up says so rather than quietly reporting the lift coefficient.",
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
            "Each field below is checked against what the pre-analysis predicted, rather than just described.",
          ],
        },
        {
          kind: "figurePair",
          labels: ["Static pressure", "Velocity vectors"],
          figures: [
            {
              src: img("naca-pressure-contours.png"),
              alt: "Static pressure contours around the NACA 0012 aerofoil showing the leading-edge suction peak and trailing-edge pressure recovery",
              caption:
                "Higher pressure below, lower above. That difference is the lift. Pressure changes very little across the thin boundary layer, which is a genuine result of boundary-layer theory rather than a plotting artefact, and it is why the pressure field is comparatively insensitive to near-wall mesh quality.",
              width: 1136,
              height: 922,
            },
            {
              src: img("naca-velocity-vectors.png"),
              alt: "Velocity vectors showing the flow turning around the leading edge of the aerofoil",
              caption:
                "Flow turning around the leading edge, displaced toward the lower surface by the positive incidence.",
              width: 999,
              height: 578,
            },
          ],
        },
        {
          kind: "figureAside",
          side: "right",
          figure: {
            src: img("naca-tke.png"),
            alt: "Turbulent kinetic energy contours isolating the boundary layer as a thin sheet that thickens aft and sheds into the wake",
            caption:
              "Turbulent kinetic energy. The boundary layer appears as a thin, high-k sheet hugging the surface.",
            width: 1136,
            height: 922,
          },
          body: [
            "The turbulence field is the most diagnostically useful of the four plots, and the one most often skipped. It isolates the boundary layer as a thin high-k sheet, thickening toward the trailing edge and shedding into the wake, which is a direct picture of where turbulent momentum transport is happening.",
            "It also works as a **visual mesh check**. Turbulence production peaks where mean shear is greatest, very close to the wall. If the near-wall mesh is adequate, that appears as a sharp, well-defined sheet. If it is too coarse, the peak smears across cells and the sheet looks diffuse, a visual symptom of the same resolution problem the y⁺ audit quantifies.",
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
            "**Mass conservation.** Normalised imbalance of order 10⁻⁷ of the incoming flow.",
            "**Iterative convergence.** Residuals driven to ≈10⁻⁶, with flat force monitors rather than residuals alone.",
            "**Near-wall audit.** The computed y⁺ distribution checked against the range the chosen wall treatment actually requires, rather than assumed.",
            "**Domain and grid independence.** Set out as a controlled six-case verification matrix, one variable changed at a time, each case with a stated acceptance criterion, using Richardson extrapolation and the grid convergence index.",
          ],
        },
        {
          kind: "figureAside",
          side: "left",
          figure: {
            src: img("experimental-cp-reference.png"),
            alt: "Plot of experimental upper-surface pressure coefficient against chord position for the NACA 0012, with an inverted vertical axis",
            caption:
              "The NASA experimental upper-surface Cp reference data used for validation. The vertical axis is inverted, following the aerodynamic convention that puts stronger suction higher on the page.",
            width: 1382,
            height: 838,
            plate: true,
          },
          body: [
            "Validation compares the predicted surface pressure distribution against the NASA NACA 0012 resources (Gregory & O'Reilly for surface pressure, Ladson for force coefficients) at matched Reynolds number and incidence. The computed Cp distribution overlaps this experimental data closely across the full chord.",
            "The integrated lift follows at CL ≈ 1.06 against an experimental 1.07 to 1.08, about **1.4 % low**, and against the thin-aerofoil hand calculation of 1.097 made before any solver was opened.",
            "Matching the full Cp distribution is a stronger claim than matching lift alone. An integrated coefficient can agree through cancellation between two compensating errors, whereas a point-by-point match across the chord cannot happen by accident. The Cp distribution is also the aerodynamic loading itself, so it is the quantity the structural side of a coupled analysis consumes.",
          ],
        },
        {
          kind: "note",
          tone: "insight",
          body:
            "A converged solution of the wrong equations is still wrong, and a correct physical model solved on an inadequate mesh is also still wrong. Both failures produce output that looks entirely normal, which is why the two questions have to be asked separately.",
        },
      ],
    },
    {
      id: "limitations",
      title: "Where the agreement does not extend",
      kicker: "Engineering judgement",
      blocks: [
        {
          kind: "text",
          body: [
            "Close agreement on lift is not a licence to trust every output. The mesh supports the pressure field well and the wall shear badly, and those two facts have to be reported together:",
          ],
        },
        {
          kind: "list",
          items: [
            "**Wall treatment inconsistent with the mesh.** Standard wall functions are being applied across a y⁺ field much of which lies outside their valid range.",
            "**Wall-shear-dependent quantities are not supported.** Drag is the obvious casualty: the same near-wall limitation that leaves lift accurate leaves skin friction unreliable.",
            "**Grid and domain independence are set out but not completed.** The six-case matrix is a plan, not a result, so the numerical uncertainty on CL has not been quantified.",
            "**Trailing-edge cell quality is poor** in orthogonality and aspect ratio, in exactly the region that sets the Kutta condition.",
            "**Two-dimensional and fully turbulent throughout.** No transition modelling, no three-dimensional effects, no separation onset prediction worth relying on near stall.",
          ],
        },
        {
          kind: "note",
          tone: "insight",
          body:
            "The next step after a scorecard like this is a controlled refinement study, one change at a time, followed by a repeat of the validation. It is emphatically not adjusting solver settings until the number improves: tuning inputs against a known answer is curve fitting, and it produces a model with no predictive value for any case where the answer is not already known.",
        },
      ],
    },
  ],
};

import type { Project } from "./types";

const img = (file: string) => `/images/naca-cfd-solver/${file}`;

/**
 * The solver written from scratch, as distinct from `naca0012-aerofoil`, which
 * is the same aerofoil at the same conditions solved in ANSYS Fluent. The two
 * pages deliberately cross-link: this one exists because that one raised the
 * question of what the commercial solver was doing underneath.
 *
 * Every number on this page was re-derived from the solver's own output files
 * rather than transcribed from a terminal, and the reference values come from
 * the NASA Turbulence Modeling Resource at its current address. See
 * `docs/content-sources.md`.
 */
export const nacaCfdSolver: Project = {
  slug: "naca-cfd-solver",
  title: "From First Principles to RANS: A C++ Finite-Volume CFD Solver",
  shortTitle: "C++ Finite-Volume CFD Solver",
  tagline:
    "Writing the solver rather than driving one: geometry, mesh, discretisation, pressure-velocity coupling and turbulence model built up in C++ and checked at every stage against problems with known answers.",
  summary:
    "A two-dimensional cell-centred finite-volume solver written from scratch in C++, carried from analytical verification and a lid-driven cavity benchmark through to wall-resolved k-omega SST simulations of a NACA 0012 at a chord Reynolds number of 6×10⁶.",
  category: "CFD · Numerical methods · C++",
  period: "Summer 2026",
  featured: true,
  order: 0,

  hero: {
    src: img("sst-velocity.png"),
    alt: "Velocity magnitude around a NACA 0012 aerofoil at 10 degrees incidence computed by the custom solver, showing the stagnation region below the leading edge, acceleration over the suction surface and the wake deficit behind the trailing edge",
    caption:
      "The final result: velocity magnitude at 10° incidence and Re = 6×10⁶, from the k-omega SST solver with limited second-order convection. Everything producing this picture, from the aerofoil coordinates to the turbulence model, was written for this project.",
    width: 1458,
    height: 794,
  },
  card: {
    src: img("card.png"),
    alt: "Close-up of the structured O-grid generated around a NACA 0012 aerofoil",
    width: 1199,
    height: 675,
  },
  cardHover: {
    src: img("og.png"),
    alt: "",
    width: 1280,
    height: 640,
  },
  ogImage: img("og.png"),

  disciplines: [
    "Finite-volume methods",
    "Pressure-velocity coupling",
    "RANS turbulence modelling",
    "Mesh generation",
    "Verification & validation",
  ],
  tools: ["C++17", "Python", "NumPy", "Matplotlib"],

  githubUrl: "https://github.com/Jadbadawi/naca-cfd-solver",
  externalLinks: [
    {
      label: "The same case in ANSYS Fluent",
      url: "/projects/naca0012-aerofoil",
    },
    {
      label: "NASA Turbulence Modeling Resource",
      url: "https://tmbwg.github.io/turbmodels/naca0012_val_sst.html",
    },
  ],

  stats: [
    {
      value: "3.6 %",
      label: "Lift against NASA SST",
      detail:
        "Cl = 1.119 against a three-code NASA mean of 1.079 at 10° and Re = 6×10⁶",
    },
    {
      value: "539 → 5",
      label: "Peak cell aspect ratio",
      detail:
        "The first O-grid was measured, diagnosed and rebuilt rather than used",
    },
    {
      value: "2.3×10⁻⁷",
      label: "Lift at zero incidence",
      detail:
        "Symmetry check on the turbulent solution, where the exact answer is zero",
    },
    {
      value: "y⁺ ≈ 1",
      label: "Resolved to the wall",
      detail:
        "Mean y⁺ of 1.07 in the converged solution, with no wall functions anywhere",
    },
  ],

  sections: [
    {
      id: "overview",
      title: "Why write the solver",
      kicker: "Overview",
      blocks: [
        {
          kind: "text",
          body: [
            "I had already solved this exact case in ANSYS Fluent: a NACA 0012 at 10° incidence and a chord Reynolds number of 6×10⁶, validated against NASA surface-pressure data. That study answered whether the aerofoil result was trustworthy. It did not answer a question it kept raising, which is what the solver was doing between the mesh and the answer.",
            "So I wrote one. This project implements the numerical machinery a commercial code keeps out of sight: the finite-volume discretisation, the pressure-velocity coupling that makes incompressible flow solvable at all, the correction that keeps a skewed mesh honest, and a two-equation turbulence model with its near-wall treatment. There is no numerical library underneath it. The linear systems are solved by a Gauss-Seidel sweep with over-relaxation written for this project, and no discretisation, no boundary condition and no turbulence closure comes from a library.",
            "The discipline that makes it worth showing is not that it runs. It is that every stage was checked against a problem whose answer was already known, before being trusted on a problem whose answer was not.",
          ],
        },
        {
          kind: "pipeline",
          steps: [
            {
              title: "Aerofoil geometry",
              detail:
                "NACA 0012 thickness distribution evaluated analytically, cosine-spaced, closed trailing edge",
              tag: "200 surface nodes",
            },
            {
              title: "Structured O-grid",
              detail:
                "Algebraic generator with surface-normal launch, Bezier radial lines and Laplacian smoothing",
              tag: "Quality metrics",
            },
            {
              title: "Diffusion operator",
              detail:
                "Laplace solver verified against an analytical annulus solution for observed order of accuracy",
              tag: "p → 2",
            },
            {
              title: "Convection schemes",
              detail:
                "Central differencing and first-order upwind measured against a one-dimensional analytical solution",
              tag: "p → 2 and 1",
            },
            {
              title: "SIMPLE coupling",
              detail:
                "Built on a staggered lid-driven cavity and validated against the Ghia benchmark before going near an aerofoil",
              tag: "Ghia et al.",
            },
            {
              title: "Collocated solver",
              detail:
                "Operators generalised to the body-fitted grid with Rhie-Chow interpolation and non-orthogonal correction",
              tag: "Re = 100",
            },
            {
              title: "k-omega SST",
              detail:
                "Two-equation RANS closure on a wall-resolved mesh designed for y⁺ ≈ 1",
              tag: "Re = 6×10⁶",
            },
            {
              title: "Second-order convection",
              detail:
                "Limited linear-upwind reconstruction applied as a deferred correction, then compared against NASA reference solutions",
              tag: "Cl and Cd",
            },
          ],
        },
      ],
    },

    {
      id: "method",
      title: "What the solver actually does",
      kicker: "Numerical method",
      blocks: [
        {
          kind: "text",
          body: [
            "The solver is cell-centred and collocated: velocity components and pressure all live at cell centres. Every transport equation is integrated over a control volume and converted by the divergence theorem into a sum of fluxes through faces, so the discrete equations conserve mass and momentum by construction rather than by accident.",
          ],
        },
        {
          kind: "equation",
          items: [
            {
              expr: "Σ_{f} (ρ u_{f} · S_{f}) φ_{f} − Σ_{f} Γ_{f} (∇φ)_{f} · S_{f} = Σ_{f} S_{φ} V_{P}",
              meaning:
                "Convection and diffusion of any quantity φ become sums over the faces of a cell. Everything after this point is a choice about how to evaluate φ and its gradient at a face.",
            },
            {
              expr: "S_{f} = E_{f} + T_{f}",
              meaning:
                "The face area vector is split into a part aligned with the line joining the two cell centres, treated implicitly, and a remainder handling the skewness, treated explicitly. Without this the solver silently mis-computes diffusion on any mesh that is not orthogonal.",
            },
            {
              expr: "μ_{t} = ρ a_{1} k / max(a_{1} ω, S F_{2})",
              meaning:
                "The SST eddy viscosity. The limiter in the denominator is what stops the model over-predicting turbulent stress in strong adverse pressure gradients, which is the reason SST is used for aerofoils in the first place.",
            },
          ],
        },
        {
          kind: "specGrid",
          items: [
            {
              title: "Why pressure needs its own equation",
              body: "In incompressible flow there is no equation for pressure: it appears in the momentum equations but never in continuity. SIMPLE resolves this by predicting a velocity field from a guessed pressure, deriving a pressure correction that forces the face fluxes to conserve mass, then correcting both. The solver iterates that loop with under-relaxation until continuity holds to a set tolerance.",
            },
            {
              title: "Why Rhie-Chow is unavoidable here",
              body: "Storing velocity and pressure at the same location decouples them on a collocated grid: a checkerboard pressure field produces no force and the solver has no way to reject it. Rhie-Chow interpolation builds the face velocity from a momentum-weighted average that reintroduces the pressure difference between adjacent cells, which suppresses the mode.",
            },
            {
              title: "Wall treatment",
              body: "The turbulent cases resolve the boundary layer rather than modelling it. Turbulent kinetic energy is set to zero at the wall and the specific dissipation rate is imposed from the near-wall asymptote ω = 60ν / (β₁ y²). This requires the first cell centre to sit at y⁺ of order one, which is what the high-Reynolds-number mesh was designed to deliver.",
            },
            {
              title: "Convection, both ways",
              body: "The turbulent case is solved twice. First with first-order upwind, which is unconditionally bounded and robust but strongly diffusive. Then with a limited linear-upwind reconstruction added as a deferred correction, keeping the robust operator in the matrix and moving the higher-order contribution to the source term, ramped in gradually.",
            },
          ],
        },
      ],
    },

    {
      id: "geometry-mesh",
      title: "The mesh that had to be rebuilt",
      kicker: "Grid generation",
      blocks: [
        {
          kind: "text",
          body: [
            "The aerofoil is generated analytically from the NACA 0012 thickness equation with the closed-trailing-edge coefficient, distributed with cosine spacing so that points cluster where the curvature is: the leading edge and the trailing edge.",
          ],
        },
        {
          kind: "figure",
          figure: {
            src: img("geometry-naca0012.png"),
            alt: "Upper panel showing the NACA 0012 section generated from its analytical thickness equation; lower panel showing the 200 ordered surface nodes with cosine spacing clustering points at the leading and trailing edges",
            caption:
              "The section and its discretisation. Cosine spacing is not cosmetic: uniform spacing puts the same number of points on the flat mid-chord as on the leading edge, where the surface turns through ninety degrees in a few percent of chord.",
            width: 1408,
            height: 817,
            plate: true,
          },
        },
        {
          kind: "text",
          body: [
            "The first O-grid ran. It produced a converged Laplace solution and had no inverted cells, which is exactly the situation in which a mesh gets used without further thought. Because the generator also computed quality metrics, it was measured instead, and the measurement was bad enough to send the generator back for a rewrite.",
          ],
        },
        {
          kind: "figurePair",
          labels: ["First attempt", "After the redesign"],
          figures: [
            {
              src: img("mesh-v1-aerofoil.png"),
              alt: "Close-up of the first O-grid around the aerofoil, showing grid lines collapsing towards the trailing edge and highly stretched, strongly skewed cells",
              caption:
                "The first generator interpolated radially from the surface to a circular far field. Near the trailing edge the grid lines fold together and the cells become both extremely stretched and strongly skewed.",
              width: 1162,
              height: 734,
            },
            {
              src: img("mesh-v2-aerofoil.png"),
              alt: "Close-up of the redesigned O-grid, showing smooth near-orthogonal cells wrapping the aerofoil with even clustering at the leading and trailing edges",
              caption:
                "The rebuilt generator launches grid lines along the true surface normal, distributes the far field uniformly in angle, joins the two with cubic Bezier curves and finishes with Laplacian smoothing.",
              width: 1162,
              height: 734,
            },
          ],
        },
        {
          kind: "keyResult",
          caption:
            "Both meshes carry 200 × 79 cells. The improvement is entirely in how the points are distributed, not how many there are.",
          items: [
            {
              label: "Peak aspect ratio",
              value: "539.3 → 5.0",
              note: "A hundredfold reduction in the worst cell",
              emphasis: true,
            },
            {
              label: "Peak non-orthogonality",
              value: "81.7° → 29.7°",
              note: "Below the threshold where explicit correction can cope",
            },
            {
              label: "Face-vector closure",
              value: "5.6×10⁻¹⁷",
              note: "Cell faces sum to zero at machine precision",
            },
          ],
        },
        {
          kind: "figurePair",
          figures: [
            {
              src: img("mesh-quality-v1-v2.png"),
              alt: "Two histograms comparing the first and rebuilt meshes: cell aspect ratio on a logarithmic scale, and face non-orthogonality in degrees, both showing the rebuilt mesh occupying a far narrower range",
              caption:
                "The whole population moves, not just the worst cell. Quoting a maximum alone can hide a mesh that is bad everywhere or bad in one place, and those need different fixes.",
              width: 1583,
              height: 700,
              plate: true,
            },
            {
              src: img("mesh-v2-leading-edge.png"),
              alt: "Extreme close-up of the rebuilt mesh at the leading edge showing near-orthogonal cells wrapping the curvature",
              caption:
                "Leading edge of the rebuilt mesh. Cells meet the surface close to perpendicular, which is what keeps the diffusion term well conditioned.",
              width: 1020,
              height: 729,
              plate: true,
            },
          ],
        },
        {
          kind: "note",
          tone: "insight",
          body:
            "The useful lesson is not that the second mesh is better. It is that a mesh can be perfectly valid, produce a converged solution, and still be quietly corrupting the answer. The only reason this one was caught is that the generator was made to report aspect ratio and non-orthogonality before anything was solved on it.",
        },
      ],
    },

    {
      id: "verification",
      title: "Checking the operators before trusting them",
      kicker: "Verification",
      blocks: [
        {
          kind: "text",
          body: [
            "Verification asks a question that has nothing to do with aerodynamics: given these equations, does the code solve them correctly, and at the rate the discretisation promises? It is answered against problems with closed-form solutions, where any discrepancy is the code's fault rather than the physics model's.",
          ],
        },
        {
          kind: "figure",
          figure: {
            src: img("verification-annulus.png"),
            alt: "Left, a log-log plot of L2 error against grid spacing for the diffusion solver on an annulus, with measured orders of 1.982, 1.995 and 1.999 annotated against a second-order reference slope; right, the computed radial profile lying on the exact logarithmic solution",
            caption:
              "Steady diffusion between two concentric circles has the exact solution φ(r) = ln(R/r) / ln(R/a). Refining the grid four times drives the measured order of accuracy to 1.9988, confirming the diffusion operator is genuinely second order rather than merely convergent.",
            width: 1595,
            height: 732,
            plate: true,
          },
        },
        {
          kind: "figure",
          figure: {
            src: img("verification-convection-schemes.png"),
            alt: "Left, the one-dimensional convection-diffusion profile with an inset showing pointwise error for central differencing and first-order upwind; right, a log-log convergence plot where central differencing follows a slope of two and upwind approaches a slope of one",
            caption:
              "Central differencing lands on the second-order slope; first-order upwind climbs to 0.95 and stops. The inset shows where upwind's error lives: concentrated in the boundary layer, roughly twenty times larger than central differencing on the same grid. This measurement is what the turbulent scheme comparison later cashes in.",
            width: 1580,
            height: 732,
            plate: true,
          },
        },
        {
          kind: "text",
          body: [
            "Once the operators were generalised to the body-fitted grid, the geometric machinery was tested on its own terms: face ownership and connectivity, cell areas, the closure of face vectors around every cell, mass conservation under a uniform flow imposed exactly, and the Green-Gauss gradient of a linear pressure field with a known answer.",
          ],
        },
        {
          kind: "keyResult",
          caption:
            "Geometric and operator tests on the 15,800-cell body-fitted grid. These are the checks that should return machine zero, so anything larger is a bug rather than a discretisation error.",
          items: [
            {
              label: "Uniform-flow mass residual",
              value: "1.1×10⁻¹⁶",
              note: "31,400 interior faces, 200 wall, 200 far field",
            },
            {
              label: "Linear pressure-gradient error",
              value: "2.3×10⁻¹²",
              note: "Against the exact ∇p = (2, −3)",
              emphasis: true,
            },
            {
              label: "Invalid or collapsed cells",
              value: "0",
              note: "Every cell closes and carries the expected face count",
            },
          ],
        },
        {
          kind: "figureAside",
          side: "right",
          figure: {
            src: img("verification-laplace-field.png"),
            alt: "Contours of a scalar solving Laplace's equation on the body-fitted O-grid around the aerofoil, decaying smoothly from the surface to the far field",
            caption:
              "Laplace's equation solved on the aerofoil grid with the surface held at one and the far field at zero.",
            width: 1426,
            height: 920,
            plate: true,
          },
          body: [
            "The same diffusion operator was then run on the aerofoil grid itself, where no analytical solution exists. What can still be checked is conservation: whatever diffuses out of the wall must arrive at the far field.",
            "Integrating the flux over each boundary gives 1.7904 leaving the wall and 1.7904 arriving at the far field, a net imbalance of 8.2×10⁻⁷, or a relative imbalance of 4.6×10⁻⁷. A discretisation that leaked would show up here even though the exact field is unknown.",
          ],
        },
      ],
    },

    {
      id: "validation",
      title: "The cavity before the aerofoil",
      kicker: "Validation",
      blocks: [
        {
          kind: "text",
          body: [
            "SIMPLE was not written directly onto the aerofoil grid. It was built first on the lid-driven cavity, a square box with a sliding top, on a staggered Cartesian arrangement where the pressure-velocity coupling is simplest and the failure modes are best understood. The cavity at Re = 100 has been a reference case since Ghia, Ghia and Shin published tabulated centreline velocities in 1982.",
          ],
        },
        {
          kind: "figurePair",
          figures: [
            {
              src: img("cavity-field.png"),
              alt: "Left, velocity magnitude in the lid-driven cavity showing the primary vortex; right, streamlines revealing the primary circulation and the two secondary corner vortices",
              caption:
                "Velocity magnitude and streamlines at Re = 100. The two secondary corner vortices are the sensitive part: they are weak, and a solver with a broken pressure correction loses them entirely.",
              width: 1631,
              height: 795,
            },
            {
              src: img("cavity-ghia-centrelines.png"),
              alt: "Horizontal and vertical centreline velocity profiles from three grid resolutions plotted against the tabulated Ghia benchmark points",
              caption:
                "Centreline velocities against Ghia. At 25 × 25 the solver visibly under-predicts the velocity extrema; by 100 × 100 the curves pass through the benchmark points.",
              width: 1580,
              height: 771,
              plate: true,
            },
          ],
        },
        {
          kind: "figureAside",
          side: "left",
          figure: {
            src: img("cavity-grid-convergence.png"),
            alt: "Log-log plot of root-mean-square error against the Ghia benchmark versus grid spacing for three cavity meshes, following a first-order reference slope",
            caption:
              "Benchmark error against grid spacing, with a first-order reference slope.",
            width: 1052,
            height: 763,
            plate: true,
          },
          body: [
            "Agreement on one grid is weak evidence: a solver can match a benchmark at a single resolution by luck or by compensating errors. What is worth more is the way the error behaves under refinement.",
            "Root-mean-square error against the benchmark falls from 0.0157 to 0.0078 to 0.0033 on the u profile as the grid doubles twice, which is close to first order.",
            "That rate is itself a check. The cavity solver uses first-order upwind convection, and the one-dimensional verification measured that scheme at order 0.95. The validation error is falling at the rate the verification predicted, which ties the two exercises together rather than leaving them as separate claims.",
          ],
        },
        {
          kind: "vv",
          verification: {
            question: "Am I solving the equations correctly?",
            items: [
              "Diffusion operator measured at order 1.9988 against an analytical annulus",
              "Convection schemes measured at order 2.00 and 0.95 against a one-dimensional exact solution",
              "Face-vector closure and uniform-flow conservation at machine precision",
              "Green-Gauss gradient of a linear field correct to 2.3×10⁻¹²",
              "Boundary flux balance closed to 4.6×10⁻⁷ on the aerofoil grid",
            ],
          },
          validation: {
            question: "Do the equations describe the real flow?",
            items: [
              "Lid-driven cavity centreline velocities against Ghia et al. (1982) on three grids",
              "Zero lift recovered at zero incidence on a symmetric section, to 2.3×10⁻⁷",
              "Turbulent lift and drag against three independent NASA reference codes",
            ],
          },
          verdict:
            "The numerical operators are verified in the strict sense: measured orders of accuracy, not just converged residuals. Validation is real but partial. The cavity and the symmetry check are solid; the turbulent aerofoil case is compared against reference CFD rather than experiment, on a single grid, and with freestream turbulence settings that do not match the reference. It is a credible solver, not a validated one.",
        },
      ],
    },

    {
      id: "laminar",
      title: "A laminar case to develop against",
      kicker: "Development",
      blocks: [
        {
          kind: "text",
          body: [
            "Before turbulence, the collocated solver was exercised on the aerofoil at Re = 100, where the flow is steady and laminar and the equations being solved are unambiguous. This is where Rhie-Chow interpolation and the non-orthogonal correction were shaken out.",
            "An earlier attempt to run the momentum equations on their own, with pressure frozen, is worth recording because of how it failed. Without a pressure correction enforcing continuity there is nothing to stop the velocity field growing without bound, and the run diverged to non-finite values in every one of the 15,800 cells. That is the correct behaviour for an incompressible momentum predictor with no coupling, and it is the most direct demonstration of why SIMPLE exists.",
          ],
        },
        {
          kind: "figurePair",
          figures: [
            {
              src: img("laminar-velocity-field.png"),
              alt: "Velocity magnitude around the aerofoil at Reynolds number 100, showing a thick viscous region and a broad wake",
              caption:
                "Velocity magnitude at Re = 100. The viscous region is a large fraction of the chord, which is what makes this a useful development case: everything is smooth and well resolved.",
              width: 1457,
              height: 815,
            },
            {
              src: img("laminar-cp-field.png"),
              alt: "Pressure coefficient field around the aerofoil at Reynolds number 100",
              caption:
                "Pressure coefficient over the same solution, with the scale centred on the free-stream value.",
              width: 1476,
              height: 825,
            },
          ],
        },
        {
          kind: "figure",
          figure: {
            src: img("laminar-nonorthogonal-correction.png"),
            alt: "Left, surface pressure coefficient with and without the non-orthogonal diffusion correction; right, a bar chart of the pressure lift and drag coefficients under both treatments with percentage differences marked",
            caption:
              "What the non-orthogonal correction is worth. With a peak skewness near 30°, ignoring it shifts the pressure lift by 1.5 % and the pressure drag by 2.2 %. Small, but it is a bias rather than noise, and it does not go away with iteration.",
            width: 1630,
            height: 792,
            plate: true,
          },
        },
        {
          kind: "figure",
          figure: {
            src: img("laminar-grid-convergence.png"),
            alt: "Lift and drag coefficients plotted against grid spacing for coarse, medium and fine meshes of 3,900, 8,850 and 15,800 cells, with successive changes decreasing",
            caption:
              "Three meshes at Re = 100. Successive changes shrink, with the medium to fine step moving lift by 1.7 % and drag by 1.4 %. Not a formal grid convergence index study, but enough to show the solution settling rather than wandering.",
            width: 1581,
            height: 724,
            plate: true,
          },
        },
      ],
    },

    {
      id: "turbulent",
      title: "Resolving the wall at Re = 6×10⁶",
      kicker: "Turbulence",
      blocks: [
        {
          kind: "text",
          body: [
            "Moving to a chord Reynolds number of six million changes the problem entirely. The boundary layer becomes a thin turbulent sheet, and the solver has to gain a turbulence model and a mesh capable of resolving that sheet without wall functions.",
          ],
        },
        {
          kind: "params",
          groups: [
            {
              title: "Flow conditions",
              rows: [
                ["Reynolds number", "6.0×10⁶"],
                ["Incidence", "10°"],
                ["Formulation", "Incompressible, non-dimensional"],
                ["Turbulence model", "k-omega SST, fully turbulent"],
              ],
            },
            {
              title: "Wall-resolved mesh",
              rows: [
                ["Nodes", "240 × 180"],
                ["Cells", "42,960"],
                ["First node spacing", "9.23×10⁻⁶ c"],
                ["Wall-normal growth ratio", "1.064"],
              ],
            },
          ],
        },
        {
          kind: "figureAside",
          side: "right",
          figure: {
            src: img("mesh-highre-yplus-design.png"),
            alt: "Left, estimated y-plus at the first cell centre along the chord, sitting close to the design target of one; right, the first wall-normal node spacing and first cell-centre distance along the chord",
            caption:
              "The first cell height was sized from a skin-friction estimate to put the first cell centre at y⁺ ≈ 1 before the mesh was built, rather than discovered afterwards.",
            width: 1630,
            height: 738,
            plate: true,
          },
          body: [
            "A wall-resolved mesh is not produced by refining until it looks fine. The first cell height is computed from an estimate of the wall shear stress, which sets the viscous length scale, which sets the spacing needed to place the first cell centre inside the viscous sublayer.",
            "That calculation gave a first node spacing of 9.23×10⁻⁶ chords, grown outward at a ratio of 1.064. The consequence is cells with edge aspect ratios in the hundreds, which would be a defect on the laminar grid and is the intended design here: the boundary layer varies violently normal to the wall and hardly at all along it, so the cells should be stretched to match.",
          ],
        },
        {
          kind: "figurePair",
          figures: [
            {
              src: img("mesh-highre-aerofoil.png"),
              alt: "The wall-resolved mesh around the aerofoil, with dense clustering against the surface",
              caption:
                "The wall-resolved mesh. The near-wall clustering is dense enough that individual layers are not separable at this scale.",
              width: 1213,
              height: 729,
            },
            {
              src: img("mesh-highre-first-cells.png"),
              alt: "Extreme close-up of the first boundary-layer cells at the leading edge, on axes scaled to a few thousandths of a chord",
              caption:
                "The same mesh at the leading edge, on axes spanning a few thousandths of a chord. This is the resolution the SST wall treatment requires.",
              width: 1028,
              height: 784,
            },
          ],
        },
        {
          kind: "text",
          body: [
            "Before running the case of interest, the turbulent solver was run at zero incidence. A symmetric section at zero angle of attack must produce exactly zero lift, so any lift the solver reports is pure numerical and modelling error, with no physics hiding it. It is the cheapest severe test available for this configuration.",
          ],
        },
        {
          kind: "figure",
          figure: {
            src: img("sst-alpha0-symmetry.png"),
            alt: "Left, upper and lower surface pressure coefficient at zero incidence lying on top of one another; right, the wall y-plus distribution on both surfaces with minimum, mean and maximum annotated",
            caption:
              "Zero incidence. Upper and lower surface pressures are indistinguishable, and the integrated lift comes out at −2.3×10⁻⁷. The measured y⁺ in the converged solution has a mean of 1.07, confirming the mesh design worked in the solution rather than only in the estimate.",
            width: 1630,
            height: 720,
            plate: true,
          },
        },
        {
          kind: "note",
          tone: "caveat",
          body:
            "The symmetry test validates symmetry, and nothing more. The zero-incidence drag from that same run is 0.0127 against a NASA reference near 0.0081, because it was run with first-order convection. A near-perfect result on one quantity says nothing about the others in the same solution.",
        },
        {
          kind: "figurePair",
          figures: [
            {
              src: img("sst-cp-field.png"),
              alt: "Pressure coefficient field around the aerofoil at 10 degrees incidence from the SST solution, showing the stagnation region below the leading edge and strong suction above it",
              caption:
                "Pressure coefficient at 10°. Stagnation below the leading edge, strong suction above it, and recovery towards the trailing edge.",
              width: 1453,
              height: 794,
            },
            {
              src: img("sst-mut-ratio.png"),
              alt: "Turbulent to laminar viscosity ratio, confined to a thin layer on the suction surface and spreading into the wake",
              caption:
                "Turbulent viscosity ratio. The model raises the effective viscosity by up to 750 times, confined to the boundary layer and the wake. The radial banding downstream is genuine under-resolution of the far wake by the O-grid.",
              width: 1466,
              height: 773,
            },
          ],
        },
        {
          kind: "figure",
          figure: {
            src: img("sst-wall-quantities.png"),
            alt: "Left, wall y-plus along the chord on upper and lower surfaces for both convection schemes; right, wall shear stress distributions for both schemes",
            caption:
              "Wall quantities for both convection schemes. y⁺ stays close to one over almost the whole surface, rising only at the leading edge where the shear stress peaks.",
            width: 1614,
            height: 709,
            plate: true,
          },
        },
      ],
    },

    {
      id: "schemes",
      title: "What the convection scheme costs",
      kicker: "Discretisation study",
      blocks: [
        {
          kind: "text",
          body: [
            "The turbulent case was solved twice on the same mesh with the same turbulence model, changing only how convected quantities are evaluated at faces. The first-order upwind solution converged to every tolerance and looks entirely reasonable. It is also wrong in a way that only a comparison exposes.",
          ],
        },
        {
          kind: "figure",
          figure: {
            src: img("sst-surface-cp-schemes.png"),
            alt: "Surface pressure coefficient at 10 degrees incidence for first-order upwind and limited second-order convection, with the second-order solution showing a substantially sharper suction peak",
            caption:
              "Where the difference lives. The first-order scheme smears the leading-edge suction peak from about −5.7 to −4.4 and depresses suction over the whole upper surface. That missing area under the curve is the missing lift.",
            width: 1203,
            height: 851,
            plate: true,
          },
        },
        {
          kind: "table",
          caption:
            "Same mesh, same turbulence model, same convergence criteria. Only the face interpolation changes.",
          head: ["Quantity", "First-order upwind", "Limited second-order"],
          rows: [
            ["Lift coefficient Cl", "1.0064", "1.1187"],
            ["Drag coefficient Cd", "0.04731", "0.01326"],
            ["Pressure drag Cd (pressure)", "0.04272", "0.00733"],
            ["Viscous drag Cd (viscous)", "0.00459", "0.00593"],
            ["Peak turbulent viscosity ratio", "1438", "747"],
          ],
        },
        {
          kind: "text",
          body: [
            "The pressure drag falls by a factor of nearly six. That number is the numerical diffusion of the first-order scheme made visible: smearing gradients across cells thickens the effective boundary layer, weakens the suction peak and leaves a pressure imbalance that is a discretisation artefact rather than aerodynamics.",
            "The peak turbulent viscosity ratio tells the same story from the model's side. The first-order solution carries almost twice the peak eddy viscosity of the second-order one. Numerical diffusion thickened the shear layer, the turbulence model saw the thickened profile and responded by producing more turbulence, and the two errors reinforced each other.",
          ],
        },
        {
          kind: "note",
          tone: "caveat",
          body:
            "The second-order run reached its 15,000 iteration cap before meeting every convergence criterion. Continuity was converged, at a maximum mass residual of 4.8×10⁻⁸ against a 10⁻⁷ tolerance. The velocity, pressure-correction and turbulence increments had not yet fallen to their tolerances, the worst being the relative change in turbulent kinetic energy at 1.4×10⁻³ against a 10⁻⁵ target. The result is used here as a discretisation study, and it should not be read as a fully converged solution.",
        },
      ],
    },

    {
      id: "reference",
      title: "Against the NASA reference solutions",
      kicker: "Comparison",
      blocks: [
        {
          kind: "text",
          body: [
            "The NASA Turbulence Modeling Resource publishes this exact case, a NACA 0012 at 10° and Re = 6×10⁶, solved with the SST model by three independent codes on a common 897 × 257 grid. Because the three agree closely with each other, they form a usable reference band.",
          ],
        },
        {
          kind: "figure",
          figure: {
            src: img("scheme-vs-nasa-coefficients.png"),
            alt: "Bar charts of lift and drag coefficients comparing this solver's first-order and second-order results against CFL3D, FUN3D and NTS, with percentage deviations from the NASA mean marked",
            caption:
              "Both schemes against the three NASA reference codes. Second-order convection moves lift from 6.8 % low to 3.6 % high, and drag from nearly four times the reference to 6.4 % above it.",
            width: 1642,
            height: 747,
            plate: true,
          },
        },
        {
          kind: "table",
          caption:
            "NASA values from the Turbulence Modeling Resource SST validation page, 897 × 257 grid.",
          head: ["Source", "Cl", "Cd"],
          rows: [
            ["This solver, second order", "1.1187", "0.01326"],
            ["CFL3D", "1.0778", "0.01236"],
            ["FUN3D", "1.0840", "0.01253"],
            ["NTS", "1.0765", "0.01251"],
            ["Deviation from the three-code mean", "+3.6 %", "+6.4 %"],
          ],
        },
        {
          kind: "note",
          tone: "caveat",
          body:
            "This is not a like-for-like comparison and should not be presented as one. The NASA codes are compressible, run at M = 0.15; this solver is incompressible, which alone accounts for roughly a percent on lift. Their freestream turbulence intensity is 0.052 % with a viscosity ratio of 0.009, against 0.1 % and 10 here, a difference of three orders of magnitude in freestream eddy viscosity. Their grid carries five times the cells, and no grid convergence study was performed at this Reynolds number. Agreement within a few percent is a good outcome for a solver written from scratch; it is not evidence that the two are equivalent.",
        },
      ],
    },

    {
      id: "limitations",
      title: "What this solver is not",
      kicker: "Limitations",
      blocks: [
        {
          kind: "list",
          items: [
            "**Two-dimensional and incompressible.** No compressibility, no three-dimensional effects, and no route to either without substantial rework.",
            "**No transition model.** The boundary layer is turbulent from the leading edge, which matches the NASA case intent but rules out any case where transition location matters.",
            "**The second-order result is not fully converged.** Continuity met its tolerance; the momentum and turbulence increments did not before the iteration cap.",
            "**One grid at Re = 6×10⁶.** Grid convergence was demonstrated at Re = 100 and not repeated for the turbulent case, so the discretisation uncertainty on the headline coefficients is unquantified.",
            "**An O-grid, not a C-grid.** Production aerofoil meshes use a C-topology precisely because an O-grid under-resolves the wake, which is visible in the turbulent viscosity field.",
            "**Reference conditions do not match.** Compressibility, freestream turbulence and grid density all differ from the NASA solutions being compared against.",
            "**A custom implementation, not a production code.** It reproduces published behaviour on the cases tested here. That is a long way short of the validation coverage behind any code used for engineering decisions.",
          ],
        },
      ],
    },

    {
      id: "learned",
      title: "What building it changed",
      kicker: "Reflection",
      blocks: [
        {
          kind: "list",
          items: [
            "**Convergence is not correctness.** The first-order turbulent solution met every tolerance and over-predicted drag by nearly a factor of four. Residuals measure whether iteration has stopped moving, not whether the answer is right.",
            "**Mesh quality is a physics decision.** A mesh that runs cleanly can still bias the answer, and the only way to know is to measure it before solving rather than after.",
            "**Discretisation order shows up in drag first.** Lift is an integrated pressure difference and forgiving; drag depends on gradients and exposes numerical diffusion immediately.",
            "**Canonical problems earn their keep.** The annulus, the one-dimensional profile and the cavity each cost little and each caught something. The measured upwind order later explained the cavity's convergence rate and predicted the turbulent drag error.",
            "**Commercial CFD reads differently now.** Choosing a second-order scheme, a coupled solver or a y⁺ target in Fluent is no longer selecting from a menu, because I have written the thing each option switches on.",
          ],
        },
        {
          kind: "note",
          tone: "provenance",
          body:
            "The solver, mesh generators, verification cases and post-processing are entirely my own work, written in C++17 and Python. No external numerical or CFD library is used, and the linear solvers are hand-written. Reference data comes from Ghia, Ghia and Shin (1982) for the cavity and the NASA Turbulence Modeling Resource for the turbulent aerofoil, both cited in the repository.",
        },
      ],
    },
  ],
};

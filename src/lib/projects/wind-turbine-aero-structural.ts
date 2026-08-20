import type { Project } from "./types";

const img = (file: string) => `/images/wind-turbine-aero-structural/${file}`;

/**
 * Provenance note for future edits.
 *
 * The geometry, operating point and baseline solver setup come from the
 * Cornell / ANSYS wind-turbine FSI module. Everything presented here as an
 * assessment, a check or a limitation is Jad's own. Two rules follow, and
 * `docs/content-sources.md` records which side of the line every number
 * falls on:
 *
 *   1. Nothing in the "next campaign" section may be written as though it
 *      has been run. It has not.
 *   2. Torque, power and Cp originate from the supplied course result, not
 *      from an independent extraction, and the copy says so.
 */
export const windTurbineAeroStructural: Project = {
  slug: "wind-turbine-aero-structural",
  title: "Wind Turbine Aero-Structural Simulation",
  shortTitle: "Wind Turbine Aero-Structural Simulation",
  tagline:
    "A rotating-frame RANS solution of a three-bladed rotor, coupled one way into an orthotropic composite shell model of the blade, then assessed for what it can and cannot support.",
  summary:
    "Modelled a rotating composite wind-turbine blade with RANS CFD and shell FEA, transferred the aerodynamic pressure field into the structural model, and verified the centrifugal load path against an independent hand calculation.",
  category: "CFD · FEA · Multiphysics",
  period: "Summer 2026",
  featured: true,
  order: 1,

  hero: {
    src: img("rotor-vectors.png"),
    alt: "Blade velocity vectors in the stationary frame on the wind turbine rotor, rising linearly with radius to 98 metres per second at the tip, with the two unsolved blades drawn as graphical instances",
    caption:
      "Blade velocity in the stationary frame. One blade and 120° of azimuth are solved; the other two are graphical instances of the same solution, which is why the vectors on all three are identical. Tip speed reaches 98.05 m/s against 98.12 m/s from ΩR by hand.",
    width: 1174,
    height: 922,
    plate: true,
  },
  card: {
    src: img("card.png"),
    alt: "Wind turbine rotor with blade velocity vectors coloured by magnitude",
    width: 900,
    height: 506,
  },
  cardHover: {
    src: img("fea-deformation.png"),
    alt: "",
    width: 1042,
    height: 471,
    fit: "contain",
  },
  ogImage: img("og.png"),

  disciplines: [
    "Rotating-frame CFD",
    "RANS turbulence modelling",
    "Fluid-structure interaction",
    "Orthotropic composite shell FEA",
    "Numerical verification",
  ],
  tools: ["ANSYS Fluent", "ANSYS Mechanical", "ANSYS CFD-Post", "SpaceClaim"],

  githubUrl: "https://github.com/Jadbadawi/aerospace-cfd-fsi",
  externalLinks: [
    { label: "NACA 0012 aerofoil study", url: "/projects/naca0012-aerofoil" },
  ],

  stats: [
    {
      value: "0.116 %",
      label: "Reaction vs hand calc",
      detail: "Root radial reaction 1,578.1 kN from ANSYS against 1,576.3 kN from mΩ²r",
    },
    {
      value: "0.07 %",
      label: "Tip speed vs ΩR",
      detail: "98.05 m/s in CFD-Post against 98.12 m/s by hand",
    },
    {
      value: "0.405 m",
      label: "Tip deflection",
      detail: "0.92 % of the 44.2 m rotor radius",
    },
    {
      value: "Not validated",
      label: "Rotor performance",
      detail: "No matched experimental data; Cp is a coarse-grid value",
    },
  ],

  sections: [
    // ------------------------------------------------------------- problem
    {
      id: "problem",
      title: "The engineering problem",
      kicker: "Problem",
      blocks: [
        {
          kind: "text",
          body: [
            "A three-bladed horizontal-axis wind turbine sits in a 12 m/s wind and turns at 2.22 rad/s. The question is what aerodynamic load that produces on a blade, and what the blade does under it.",
            "Answering it takes two physics domains. A steady RANS solution in a rotating reference frame predicts the pressure field on the blade surface; that field is then mapped onto a separate structural mesh, where an orthotropic composite shell model predicts deformation, stress and root reactions. The coupling runs one way only: the structure never feeds its deformation back to the flow.",
            "Only one blade is solved. Rotational periodicity across a 120° sector stands in for the other two, on the assumption that all three blades and their inflow are identical. That single assumption cuts the cost of the aerodynamic problem by roughly a factor of three, and it is the first thing this page holds up to scrutiny.",
          ],
        },
        {
          kind: "note",
          tone: "provenance",
          body:
            "The blade geometry, the operating point and the baseline solver setup come from the Cornell and ANSYS wind-turbine module, and this page does not claim otherwise. What is mine is everything downstream of that: tracing the governing physics through both solvers, the independent checks, the reading of the convergence evidence, the judgement about which results can be trusted, and the verification campaign the model still needs. Where a number came from the supplied course result rather than from something I extracted independently, it is labelled.",
        },
      ],
    },

    // ------------------------------------------------------------ workflow
    {
      id: "workflow",
      title: "The simulation workflow",
      kicker: "Method",
      blocks: [
        {
          kind: "pipeline",
          steps: [
            {
              title: "Operating condition",
              tag: "Inputs",
              detail:
                "12 m/s axial wind, 2.22 rad/s rotor speed, 44.2 m tip radius. Fixes the tip-speed ratio at 8.18 and the local relative wind at every radius.",
            },
            {
              title: "Rotating-frame RANS",
              tag: "ANSYS Fluent",
              detail:
                "Steady incompressible pressure-based solve on a 120° periodic sector, SST k-ω closure, frame motion applied to the fluid cell zone instead of moving the mesh.",
            },
            {
              title: "Aerodynamic pressure and torque",
              tag: "Outputs",
              detail:
                "Surface pressure on the blade wall, plus the integrated moment about the rotor axis that gives torque and, scaled by three, rotor power.",
            },
            {
              title: "Pressure mapping",
              tag: "Workbench",
              detail:
                "The pressure field is interpolated from the CFD wall mesh onto a different structural mesh. This step is where a multiphysics workflow can lose load without any warning.",
            },
            {
              title: "Orthotropic shell FEA",
              tag: "ANSYS Mechanical",
              detail:
                "SHELL181 elements on the blade midsurface, homogenised orthotropic composite, linearly tapering skin and spar, mapped pressure plus centrifugal inertia, remote displacement at the root.",
            },
            {
              title: "Structural response",
              tag: "Outputs",
              detail:
                "Total deformation, equivalent stress, root force and root moment reactions.",
            },
            {
              title: "Verification and credibility assessment",
              tag: "Assessment",
              detail:
                "Independent hand calculations, convergence evidence and an explicit statement of what the model has not yet earned the right to claim.",
            },
          ],
        },
        {
          kind: "text",
          body: [
            "Each stage consumes the previous one's output, so an error anywhere propagates forward silently. A structural stress contour looks exactly the same whether the pressure field feeding it was converged or not.",
          ],
        },
        {
          kind: "params",
          groups: [
            {
              title: "Aerodynamic model",
              rows: [
                ["Rotor radius", "44.2 m"],
                ["Wind speed", "12 m/s"],
                ["Angular speed", "2.22 rad/s"],
                ["Tip speed ΩR", "98.12 m/s"],
                ["Tip-speed ratio λ", "8.18"],
                ["Flow model", "Steady RANS"],
                ["Turbulence closure", "SST k-ω"],
                ["Rotor representation", "120° periodic sector"],
                ["Baseline mesh", "367,691 cells"],
                ["Solver", "ANSYS Fluent"],
              ],
            },
            {
              title: "Structural model",
              rows: [
                ["Idealisation", "Shell midsurface"],
                ["Elements", "4,831 SHELL181"],
                ["Structure", "Outer skin + spar"],
                ["Material", "Homogenised orthotropic"],
                ["Stiffness ratio E_{1}/E_{2}", "15"],
                ["Skin thickness", "0.100 m to 0.005 m"],
                ["Spar thickness", "0.100 m to 0.030 m"],
                ["Loads", "Mapped pressure + Ω²r"],
                ["Root", "Remote displacement"],
                ["Solver", "ANSYS Mechanical"],
              ],
            },
          ],
        },
      ],
    },

    // -------------------------------------------------------- steady rotor
    {
      id: "steady-rotor",
      title: "Making a spinning rotor a steady problem",
      kicker: "Physical modelling",
      blocks: [
        {
          kind: "text",
          body: [
            "A rotor is neither steady nor small. Solved literally, it needs a moving mesh, a transient solution and the full 360° of azimuth. Two modelling decisions remove all three costs, and both are worth stating precisely because both buy their speed with an assumption.",
          ],
        },
        {
          kind: "text",
          body: [
            "**The rotating reference frame.** Instead of rotating the mesh, the governing equations are written in a frame that rotates with the rotor. The blade is then stationary relative to its own cell zone, the flow field around it stops changing with time, and a steady solver is legitimate. The price is two extra acceleration terms in the momentum equation.",
          ],
        },
        {
          kind: "equation",
          items: [
            {
              expr: "Ω × (Ω × r)",
              meaning:
                "Centripetal acceleration. It exists because the frame itself is rotating, it grows with radius, and it is what makes the outboard blade see a fundamentally different operating condition from the root.",
            },
            {
              expr: "2 Ω × u_{rel}",
              meaning:
                "Coriolis acceleration. It depends on the velocity relative to the rotating frame and deflects the apparent path of the flow. In a rotating blade boundary layer it is part of why spanwise flow develops.",
            },
          ],
        },
        {
          kind: "text",
          body: [
            "There is no Euler term, because Ω is constant at a fixed operating point. Fluent introduces both source terms once frame motion is enabled on the fluid cell zone, which means the entire physical difference between a rotating and a stationary analysis lives in a setting that is easy to leave switched off and impossible to see in a contour plot afterwards.",
            "**The 120° sector.** A three-bladed rotor repeats itself every 360°/3 = 120°, so one sector containing one blade can represent the whole machine if the two radial faces are joined as a rotational periodic pair. Flow variables leaving one face re-enter at the other, rotated by 120°.",
          ],
        },
        {
          kind: "equation",
          items: [
            {
              expr: "360° / 3 = 120°",
              meaning:
                "One sector, one blade, one third of the cost. Vectors must be rotated by 120° when mapped between the faces, not copied component by component, which is why the interface is created as a rotational periodic pair rather than by matching Cartesian values.",
            },
          ],
        },
        {
          kind: "note",
          tone: "caveat",
          body:
            "Both decisions exclude the same class of physics: anything that breaks threefold symmetry or steadiness. The model cannot represent **tower shadow, wind shear, yaw misalignment, blade-to-blade differences, non-uniform inflow, transient gusts or rotor-wake interaction over time**. For a mean-load estimate at one operating point that is an acceptable trade. For fatigue loading, where the once-per-revolution variation is the whole point, it is not.",
        },
        {
          kind: "figure",
          figure: {
            src: img("mesh.png"),
            alt: "Computational mesh of the 120-degree periodic wind turbine sector, refined toward the blade surface with inflation layers and a coarsening far field",
            caption:
              "The 120° sector mesh, 367,691 cells: inflation layers normal to the blade, refinement carried through the rotor and near wake, and rapid coarsening toward the far field. The two radial faces of the wedge are the periodic pair.",
            width: 2000,
            height: 1042,
          },
        },
        {
          kind: "note",
          tone: "insight",
          body:
            "The periodic faces arrive from the mesher as walls. Left that way, the solution converges cleanly and looks entirely plausible, but the blade is then operating inside a 120° duct with two solid side walls rather than in an open rotor. It is a good example of a setup error that no residual plot will ever reveal.",
        },
      ],
    },

    // ----------------------------------------------------------- CFD results
    {
      id: "cfd-results",
      title: "Aerodynamic loading and rotor power",
      kicker: "CFD",
      blocks: [
        {
          kind: "text",
          body: [
            "The first result to check is kinematic, because it is the one with an exact answer. Blade velocity in the stationary frame reaches 98.05 m/s at the tip against 98.12 m/s from ΩR by hand, a difference of 0.07 %. That single number verifies the rotation rate, the axis, the units and the 1 m root offset at once. It says nothing whatever about the aerodynamics.",
          ],
        },
        {
          kind: "figurePair",
          labels: ["Sectional pressure", "Sectional velocity"],
          figures: [
            {
              src: img("section-pressure.png"),
              alt: "Static pressure contours on a section cut through the turbine blade, with a stagnation region at plus 199 pascals and a suction peak at minus 395 pascals",
              caption:
                "Pressure on a section cut through the blade: stagnation at +199 Pa, suction peak at −395 Pa. The difference across the section produces both the useful torque and the flapwise bending the structure has to carry.",
              width: 1174,
              height: 922,
            },
            {
              src: img("section-velocity.png"),
              alt: "Velocity vectors on a section through the turbine blade showing accelerated flow over the suction side reaching 34.8 metres per second",
              caption:
                "The same section in velocity. The blade section behaves as an aerofoil at incidence to the local relative wind, which is the vector sum of the 12 m/s axial wind and the local Ωr.",
              width: 1174,
              height: 922,
            },
          ],
        },
        {
          kind: "text",
          body: [
            "Torque follows from integrating the surface pressure and shear moment about the rotor axis. The supplied course result gives a one-blade torque of 137,115 N·m, and the rest is arithmetic: three blades at 2.22 rad/s give 0.913 MW of mechanical rotor power, against 6.496 MW of kinetic power passing through the 6,137 m² swept area.",
          ],
        },
        {
          kind: "equation",
          items: [
            {
              expr: "C_{P} = P_{rotor} / (½ ρ A V_{∞}^{3}) = 0.913 / 6.496 = 0.141",
              meaning:
                "The fraction of the available wind power converted to mechanical power. It clears the Betz limit of 0.5926 comfortably, which rules out gross errors in sign, swept area or scaling, but clearing a bound is a weak statement.",
            },
          ],
        },
        {
          kind: "note",
          tone: "caveat",
          body:
            "**Cp ≈ 0.141 is not a performance prediction for this turbine.** A machine of this class achieves roughly 0.30 to 0.45, and the supplied mesh-refinement data shows Cp still changing substantially between the tutorial-scale mesh and multi-million-cell meshes, without having entered an asymptotic range. It is a coarse-grid value, and it is reported here as one. Comparing it against a manufacturer rated figure (Cp ≈ 0.30 for a nominally similar machine) is a plausibility check on the order of magnitude, not a validation: the diameter, wind speed, blade geometry, control state and definition of rated output all differ.",
        },
      ],
    },

    // ---------------------------------------------------------- credibility
    {
      id: "credibility",
      title: "Numerical credibility",
      kicker: "Verification",
      blocks: [
        {
          kind: "text",
          body: [
            "Convergence is not an iteration count. A run that stops at the number of iterations it was asked for has demonstrated nothing except that the loop finished. What matters is whether the residuals are small **and** the engineering outputs have stopped moving, judged together.",
            "The figure below is the integral static pressure on the blade wall, logged every iteration of my own run of the baseline case. It is the quantity the structural analysis ultimately consumes, so it is the right thing to watch.",
          ],
        },
        {
          kind: "figure",
          figure: {
            src: img("convergence-monitor.png"),
            alt: "Plot of integral static pressure on the blade against iteration number from 300 to 1000, falling steeply then flattening, with an inset over the final 100 iterations showing the monitor still rising by 318 newtons",
            caption:
              "Integral blade static pressure against iteration, from my own run of the baseline mesh. At plot scale the tail is flat. Expanded, the monitor is still climbing at iteration 1,000: 318 N of spread across the final 100 iterations, or 0.41 % of the value being reported. Plotted directly from the Fluent report-definition file, not redrawn.",
            width: 1400,
            height: 800,
            plate: true,
          },
        },
        {
          kind: "note",
          tone: "caveat",
          body:
            "That 0.41 % is the honest reading of this run: the monitor has flattened enough to look converged and has not actually stopped moving. **Iteration independence has not been demonstrated**, and the run was stopped at 1,000 iterations rather than continued until the drift fell below a stated tolerance. The fix is not subtle, it is simply a longer run with a defined acceptance criterion, and it belongs in the campaign below rather than in a results table.",
        },
        {
          kind: "text",
          body: [
            "Three further numerical questions sit above that one, in the order they need answering:",
          ],
        },
        {
          kind: "list",
          items: [
            "**Mesh independence.** The 367,691-cell baseline resolves the workflow, not the physics. The supplied refinement evidence puts Cp still in motion at multi-million-cell counts, so discretisation error is currently the dominant uncertainty in every aerodynamic number on this page.",
            "**Near-wall resolution.** SST k-ω earns its reputation in adverse pressure gradients only if the near-wall mesh matches the treatment it is being asked to use. Wall shear, and therefore y⁺, is an output rather than an input, so the y⁺ distribution has to be plotted after solving and audited against the intended range across the whole blade, not assumed from the first-cell height.",
            "**Domain and boundary sensitivity.** The far field is a numerical stand-in for an unbounded flow, and the wake needs room to develop downstream. Inlet turbulence intensity and viscosity ratio are estimates, not measurements, so their influence on torque has to be bounded rather than trusted.",
          ],
        },
        {
          kind: "note",
          tone: "insight",
          body:
            "Mass conservation, residual histories and monitor plateaus are all necessary and none of them is sufficient. A small residual does not guarantee a balanced global mass flow, and a balanced mass flow says nothing about whether the momentum solution is accurate. Both have to be reported, alongside the discretisation error that neither of them measures.",
        },
      ],
    },

    // -------------------------------------------------------------- coupling
    {
      id: "coupling",
      title: "Crossing the interface",
      kicker: "Multiphysics",
      blocks: [
        {
          kind: "equation",
          items: [
            {
              expr: "p_{CFD}(x) → p_{FEA}(x)",
              meaning:
                "The wetted-surface pressure field is interpolated from the CFD wall mesh onto a structurally meshed surface that shares the geometry but not the discretisation.",
            },
          ],
        },
        {
          kind: "text",
          body: [
            "This is what makes the analysis one-way. Pressure crosses from fluid to structure; deformation does not cross back. The aerodynamic solution therefore remains that of the undeformed blade, and the local twist that actually sets angle of attack is never updated. For a first aero-structural estimate at a moderate operating point that is a reasonable trade, and the tip deflection below is what decides whether it holds.",
            "The interpolation itself deserves more suspicion than it usually gets. Mapping between non-matching meshes is a numerical operation with its own error, and a coverage report showing 100 % of target nodes received a value is not evidence that the load survived the trip. Two meshes can both be fully covered and still disagree about the total force.",
          ],
        },
        {
          kind: "note",
          tone: "caveat",
          body:
            "A credible coupled workflow checks that the **resultant force and moment are conserved across the transfer**, comparing the integrated load reported by Fluent against the integrated load Mechanical actually received, with a stated tolerance. That check has not been completed for this model. Until it is, the structural results rest on an assumption about the interface rather than on a measurement of it.",
        },
      ],
    },

    // ------------------------------------------------------- structural model
    {
      id: "structural-model",
      title: "The structural idealisation",
      kicker: "FEA",
      blocks: [
        {
          kind: "text",
          body: [
            "The blade is a slender, twisted, hollow composite shell: an aerodynamic skin over an internal spar, both tapering from root to tip. It is modelled as curved shell surfaces carrying an assigned thickness rather than as a solid meshed through its wall.",
          ],
        },
        {
          kind: "specGrid",
          items: [
            {
              title: "Why shell elements",
              body: "The blade is 43.2 m long and a few centimetres thick. Shell theory stores the midsurface and reconstructs the through-thickness strain analytically, so the wall costs one element instead of the several needed to resolve bending through a solid. Resolving 44 m of span with solids at that wall thickness is not a modelling improvement, it is an unaffordable one.",
            },
            {
              title: "Tapering thickness",
              body: "The skin runs from 0.100 m at the root to 0.005 m at the tip and the spar from 0.100 m to 0.030 m, both linear. Thickness is a property of the shell section rather than geometry that has to be meshed, which is precisely what makes the idealisation cheap.",
            },
            {
              title: "Homogenised orthotropy",
              body: "One orthotropic material stands for the whole laminate: E₁ = 113.75 GPa along the span against 7.583 GPa across it, with matched shear moduli and Poisson ratios. It captures directional stiffness globally and represents no individual ply, no stacking sequence and no adhesive layer.",
            },
            {
              title: "Loads and support",
              body: "Mapped aerodynamic pressure plus centrifugal inertia from the 2.22 rad/s rotation, reacted by a remote displacement at the root standing in for the hub connection. Gravity is omitted, and the pressure object carries no aerodynamic wall shear.",
            },
          ],
        },
        {
          kind: "note",
          tone: "insight",
          body:
            "With E₁ roughly fifteen times E₂ and E₃, the **material axes matter as much as the material constants**. If the stiff direction is not aligned with the span, the solve still converges, the contours still look like a blade bending, and the answer is physically meaningless. Plotting the element coordinate systems and shell normals before solving is not housekeeping; it is the check that the constitutive model is pointing the way the fibres do.",
        },
      ],
    },

    // ---------------------------------------------------------- root reaction
    {
      id: "root-reaction",
      title: "The check that carries the most weight",
      kicker: "Verification",
      blocks: [
        {
          kind: "text",
          body: [
            "For a rigidly rotating mass distribution, the total radial force reduces exactly to the total mass times the square of the angular speed times the centre-of-mass radius, no matter how the mass is spread along the span. That makes it computable by hand, independently of the finite element model, from three quantities the model reports.",
          ],
        },
        {
          kind: "equation",
          items: [
            {
              expr: "F_{c} = m Ω^{2} r_{cm} = 22,473 × 2.22^{2} × 14.232",
              meaning:
                "Blade mass 22,473 kg, centre of mass 14.232 m from the rotation axis, 2.22 rad/s. No finite elements involved.",
            },
          ],
        },
        {
          kind: "keyResult",
          items: [
            {
              label: "Analytical",
              value: "1,576.3 kN",
              note: "mΩ²r by hand",
            },
            {
              label: "ANSYS",
              value: "1,578.1 kN",
              note: "Root radial reaction",
            },
            {
              label: "Difference",
              value: "0.116 %",
              note: "Well inside any reasonable tolerance",
              emphasis: true,
            },
          ],
          caption:
            "One number simultaneously exercises the mass, the density, the centre of mass, the angular velocity, the centrifugal load implementation and the reaction extraction. If any one of them were wrong, this would not agree.",
        },
        {
          kind: "note",
          tone: "insight",
          body:
            "**This does not validate the structural model.** It verifies that the mass, centre of mass, rotational speed, centrifugal loading and reaction extraction are implemented consistently with each other. It says nothing about whether the homogenised material represents the real laminate, whether the shell idealisation captures the real load path, or whether the aerodynamic pressure driving the bending is correct. A model can pass this check perfectly and still be the wrong model.",
        },
      ],
    },

    // ------------------------------------------------------ structural results
    {
      id: "structural-results",
      title: "Structural response",
      kicker: "Results",
      blocks: [
        {
          kind: "figureAside",
          side: "right",
          figure: {
            src: img("fea-deformation.png"),
            alt: "Total deformation contour of the turbine blade increasing from zero at the root to 0.405 metres at the tip",
            caption:
              "Total deformation under mapped CFD pressure plus centrifugal inertia: 0.405 m at the tip, near zero at the root.",
            width: 1042,
            height: 471,
            plate: true,
          },
          body: [
            "The blade deflects away from the incoming wind, which is the direction the mapped pressure field demands, and the profile is classic cantilever behaviour: near zero at the root, growing non-linearly outboard, because every span station carries the integrated moment of all the load outboard of it.",
            "Maximum tip deflection is **0.405 m**, or 0.92 % of the 44.2 m rotor radius. That number does double duty. On a real machine it is a design driver, because the blade must not strike the tower. Here it is also the test of whether one-way coupling was legitimate in the first place, and under 1 % of radius the assumption looks defensible at this operating point.",
            "The qualification matters: deflection magnitude is not the quantity aerodynamics is most sensitive to. **Local twist** sets angle of attack, and a small tip displacement accompanied by significant torsional rotation could still change the loading materially. The change in twist was not extracted, so the one-way assumption is supported rather than proven, and under a peak gust the conclusion could reverse.",
          ],
        },
        {
          kind: "text",
          body: [
            "The supplied structural results give a maximum equivalent (von Mises) stress of approximately 33.36 MPa, at the junction where the spar transfers bending load into the skin. That location is physically sensible, and it is also exactly the sort of place where a value is sensitive to CAD simplification, to how the spar and skin are connected, and to local mesh density.",
            "Against the 537 MPa tensile strength quoted for the material, the ratio is about 16.",
          ],
        },
        {
          kind: "note",
          tone: "caveat",
          body:
            "**That ratio is a screen, not a strength assessment.** Von Mises is an isotropic, ductile-material measure; it collapses a stress state into one scalar and discards exactly the directional information that decides whether a composite fails. A defensible answer needs the stress components resolved in the local material axes and a direction-sensitive criterion, maximum stress or strain, Tsai-Hill, Tsai-Wu or Hashin, together with the tensile, compressive and shear allowables each of those requires. Reading a factor of safety off a von Mises contour is the single most common way an orthotropic structure gets declared safe without evidence.",
        },
      ],
    },

    // ------------------------------------------------------------- decisions
    {
      id: "decisions",
      title: "Modelling decisions",
      kicker: "Judgement",
      blocks: [
        {
          kind: "text",
          body: [
            "Every choice below buys something and costs something. Listing the cost beside the benefit is what separates a model from a set of settings.",
          ],
        },
        {
          kind: "table",
          head: ["Decision", "Why", "What it costs"],
          rows: [
            [
              "Steady RANS",
              "Affordable prediction of mean rotor loading",
              "No transient or unsteady effects",
            ],
            [
              "SST k-ω",
              "Good near-wall behaviour in adverse pressure gradients",
              "Depends on a matching near-wall mesh",
            ],
            [
              "Rotating reference frame",
              "Steady solution without a moving mesh",
              "Fixed operating point only",
            ],
            [
              "120° periodic sector",
              "One third of the cells",
              "Requires exact threefold symmetry",
            ],
            [
              "Shell FEA",
              "Efficient for a slender composite blade",
              "No detailed 3D local stress state",
            ],
            [
              "One-way FSI",
              "Cheap first aero-structural estimate",
              "Deformation never alters the flow",
            ],
            [
              "Homogenised orthotropy",
              "Captures directional stiffness globally",
              "No ply-level behaviour or interface",
            ],
          ],
          caption:
            "The right-hand column is the part that has to be carried forward into how the results are read.",
        },
      ],
    },

    // ----------------------------------------------------------- limitations
    {
      id: "limitations",
      title: "What the model does not yet prove",
      kicker: "Scope",
      blocks: [
        {
          kind: "vv",
          verification: {
            question: "Did I solve the chosen model correctly?",
            items: [
              "Tip speed against ΩR: 98.05 vs 98.12 m/s, 0.07 %",
              "Root radial reaction against mΩ²r: 0.116 %",
              "Cp below the Betz limit of 0.5926",
              "Load-path direction: radial force in x, bending moment in y",
              "Still outstanding: mesh convergence, y⁺ audit, load-transfer conservation",
            ],
          },
          validation: {
            question: "Does the model represent reality closely enough?",
            items: [
              "Requires measured rotor torque and thrust at matched V∞, Ω and pitch",
              "Requires blade surface pressure or sectional force distributions",
              "Requires measured deflection or strain under the same load",
              "Requires wake velocity deficit and swirl at defined planes",
              "Requires the measurement uncertainty to compare against",
            ],
          },
          verdict:
            "**No matched experimental dataset was available for this turbine, so the model must not be described as experimentally validated.** Everything on this page is verification, plausibility assessment or engineering judgement. Those are different claims, and conflating them is how an unvalidated model ends up carrying a design decision.",
        },
        {
          kind: "text",
          body: ["More specifically, and in no particular order of severity:"],
        },
        {
          kind: "list",
          items: [
            "**CFD mesh independence is not demonstrated.** The supplied refinement evidence shows Cp still moving well beyond the baseline mesh.",
            "**Iteration independence is not demonstrated.** The blade pressure monitor was still drifting 0.41 % across the final 100 iterations of the baseline run.",
            "**Structural mesh convergence has not been established.** The 4,831-element mesh has not been refined and compared.",
            "**Force and moment conservation across the pressure transfer has not been quantified.**",
            "**The homogenised orthotropic material represents no individual ply**, no stacking sequence, no adhesive layer and no spar-to-skin bondline.",
            "**One-way coupling ignores aerodynamic feedback from deformation**, and the change in local twist was never extracted.",
            "**The steady periodic model excludes asymmetric and transient effects**: tower shadow, shear, yaw, gusts and blade-to-blade variation.",
            "**Gravity was omitted**, so the once-per-revolution gravitational load that matters for fatigue is absent.",
            "**Composite failure needs a directional criterion**, not von Mises against a tensile strength.",
            "Run under the ANSYS Student licence, which caps mesh size and therefore limits how far the refinement study can be taken on this machine.",
          ],
        },
        {
          kind: "note",
          tone: "insight",
          body:
            "None of this makes the model useless. It makes its scope explicit, which is the difference between a simulation result and a simulation you can act on. The failure mode worth avoiding is not an inaccurate prediction, it is an inaccurate prediction nobody knew the boundaries of.",
        },
      ],
    },

    // ------------------------------------------------------------------ next
    {
      id: "next",
      title: "The next verification campaign",
      kicker: "Future work",
      blocks: [
        {
          kind: "text",
          body: [
            "None of the following has been run. It is the ordered plan for turning the current model into one whose numbers could carry an engineering argument, with the largest source of uncertainty attacked first.",
          ],
        },
        {
          kind: "flow",
          steps: [
            {
              title: "CFD mesh convergence",
              detail:
                "Three systematically refined meshes at a constant refinement ratio, tracking Cp, torque, thrust and y⁺ statistics, with Richardson extrapolation and a grid convergence index once the sequence is in the asymptotic range.",
            },
            {
              title: "Load-transfer verification",
              detail:
                "Compare the resultant force and moment reported by Fluent against the same resultants integrated over the mapped structural load, and report the percentage difference rather than the node coverage.",
            },
            {
              title: "Structural mesh convergence",
              detail:
                "Refine the shell mesh and track tip displacement, root force, root moment, total strain energy and a representative stress away from geometric singularities.",
            },
            {
              title: "Load separation",
              detail:
                "Solve aerodynamic pressure alone, centrifugal loading alone, then combined, so each contribution to deflection and stress can be attributed rather than inferred.",
            },
            {
              title: "Parameter sweep",
              detail:
                "Automate the operating point across wind speed and rotor speed to trace Cp against tip-speed ratio, and the structural response along with it, instead of characterising one machine by one point.",
            },
            {
              title: "Sensitivity assessment",
              detail:
                "Bound the influence of the modelling inputs that were estimated rather than measured: inlet turbulence quantities, orthotropic stiffness constants and the root support idealisation.",
            },
          ],
        },
        {
          kind: "note",
          tone: "caveat",
          body:
            "Only after the first two items would it be reasonable to quote a converged Cp or to interpret a stress margin. Validation stays out of reach until matched experimental data exists, and no amount of numerical work substitutes for it.",
        },
      ],
    },
  ],
};

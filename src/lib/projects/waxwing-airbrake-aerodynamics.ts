import type { Project } from "./types";

const img = (file: string) => `/images/waxwing-airbrake-aerodynamics/${file}`;

export const waxwingAirbrakeAerodynamics: Project = {
  slug: "waxwing-airbrake-aerodynamics",
  title: "Rocket Airbrake and Fin Aerodynamics",
  shortTitle: "Waxwing Aerodynamics",
  tagline:
    "Building a drag model for a rocket's airbrake system, and choosing the fin geometry that had to work with it.",
  summary:
    "External aerodynamics for Project Waxwing, HyPower Bristol's EuRoC 2025 launch vehicle: a twenty five case Star-CCM+ sweep of airbrake deployment against velocity to give the brake controller a real drag map, plus the section and planform selection for the composite fins.",
  category: "CFD · Aerodynamics",
  period: "2024/25 · HyPower Bristol, EuRoC 2025",
  featured: true,
  order: 3,

  hero: {
    src: img("hero-total-pressure.png"),
    alt: "Absolute total pressure on the surface of the launch vehicle, showing the stagnation region at the nose cone and a sharp pressure change at a deployed airbrake petal",
    caption:
      "Absolute total pressure over the vehicle with the airbrakes half deployed at 60 m/s. The stagnation region at the nose, the recovery down the body, and the paired low and high pressure at the deployed petal are all visible.",
    width: 991,
    height: 453,
  },
  card: {
    src: img("card-fin-render.png"),
    alt: "Rendered CAD of the swept trapezoidal carbon fibre fin",
    width: 1677,
    height: 943,
  },
  cardHover: {
    src: img("recirculation.png"),
    alt: "",
    width: 1080,
    height: 463,
    fit: "contain",
  },

  disciplines: [
    "External aerodynamics",
    "RANS turbulence modelling",
    "Subsonic and transonic flow",
    "Design downselection",
    "Verification",
  ],
  tools: ["Star-CCM+", "Autodesk Inventor", "MATLAB", "Abaqus", "OpenRocket"],

  role:
    "Aerodynamics & Structures Engineer, HyPower Bristol. Waxwing is a team vehicle. This page covers only the aerodynamics work I was responsible for: the airbrake CFD, the airbrake geometry selection, and the fin section and planform selection. Propulsion, avionics, recovery and primary structure were other people's work.",

  stats: [
    {
      value: "25",
      label: "CFD cases",
      detail: "Five deployment angles across five freestream velocities",
    },
    {
      value: "1.7×",
      label: "Drag at full deployment",
      detail: "Cd 0.270 deployed against 0.162 stowed, both at 100 m/s",
    },
    {
      value: "0.041 m",
      label: "Boundary layer in CFD",
      detail: "Against 0.047 m from a Prandtl-Schlichting hand calculation",
    },
    {
      value: "0.0661",
      label: "Selected fin Cd",
      detail: "Hybrid section at 10 % thickness, against 0.0670 for the NACA equivalent",
    },
  ],

  sections: [
    {
      id: "overview",
      title: "The vehicle and the problem",
      kicker: "Overview",
      blocks: [
        {
          kind: "text",
          body: [
            "Project Waxwing is HyPower Bristol's entry into the 3 km Liquid category at the European Rocketry Challenge 2025, built out of BristolSEDS at the University of Bristol. It is a student researched and developed bi-propellant vehicle carrying a deployable airbrake system used to trim apogee.",
            "My part was the external aerodynamics. Two things needed answering. The airbrakes needed a drag model before their controller could be tuned, because a controller that modulates drag has to know how much drag it is commanding. And the fins needed a section and a planform chosen on evidence rather than preference. Both problems sit across the subsonic and transonic range, since the vehicle reaches **Mach 0.9** early in the burn.",
          ],
        },
        {
          kind: "flow",
          steps: [
            {
              title: "Trajectory sets the envelope",
              detail:
                "Simulated trajectories give the Mach, velocity and Reynolds ranges the aerodynamics has to cover, and therefore which cases are worth running.",
            },
            {
              title: "Airbrake geometry downselection",
              detail:
                "Two flap geometries compared on braking force, separation behaviour, and whether their wake would reach the fins.",
            },
            {
              title: "CFD sweep",
              detail:
                "Twenty five steady RANS cases in Star-CCM+, five deployment angles by five velocities, on one meshing setup.",
            },
            {
              title: "Verification",
              detail:
                "Solver output checked against closed form boundary layer theory before any of it was used downstream.",
            },
            {
              title: "Drag map delivered",
              detail:
                "Cd against deployment and velocity, passed to the airbrake control team for gain tuning.",
            },
          ],
        },
      ],
    },

    {
      id: "envelope",
      title: "Why twenty five cases",
      kicker: "Scoping",
      blocks: [
        {
          kind: "text",
          body: [
            "The vehicle reaches Mach 0.9 about five seconds into flight, with apogee near 3850 m. The airbrakes operate on the coast, at velocities up to 150 m/s.",
            "Compressibility becomes significant above roughly Mach 0.3, which is around 100 m/s at these conditions. The sweep was capped there on purpose, so that the model stayed a clean incompressible one rather than a compressible one with nothing to check it against. The cost of that decision is real and worth stating: the top of the deployment envelope, 100 to 150 m/s, is not covered by these results.",
          ],
        },
        {
          kind: "figure",
          figure: {
            src: img("deployment-geometries.png"),
            alt: "Five front views of the rocket showing the airbrake petals at 0, 25, 50, 75 and 100 percent deployment",
            caption:
              "The five geometries exported from Inventor, from stowed to fully deployed. Each was run at 20, 40, 60, 80 and 100 m/s.",
            width: 1032,
            height: 204,
            plate: true,
          },
        },
      ],
    },

    {
      id: "geometry",
      title: "Choosing the airbrake geometry",
      kicker: "Downselection",
      blocks: [
        {
          kind: "text",
          body: [
            "Two flap geometries were on the table, a slot design and a rounded petal. The choice was not simply which one produced more drag. A brake that sheds a large separated wake risks that wake reaching the fins, which would put stability at risk at exactly the moment the vehicle is being slowed.",
          ],
        },
        {
          kind: "figure",
          figure: {
            src: img("airbrake-candidates.png"),
            alt: "Front views of the two candidate airbrake designs, a slot geometry and a rounded petal geometry",
            caption:
              "The two candidates. (a) slot design, (b) rounded petal design.",
            width: 733,
            height: 340,
            plate: true,
          },
        },
        {
          kind: "figurePair",
          labels: ["Slot", "Petal"],
          figures: [
            {
              src: img("separation-slot.png"),
              alt: "Velocity field along the vehicle with the slot airbrake design deployed, showing a long separated region running aft toward the fins",
              caption:
                "The separated region runs a long way aft, toward the fins.",
              width: 579,
              height: 306,
            },
            {
              src: img("separation-petal.png"),
              alt: "Velocity field along the vehicle with the petal airbrake design deployed, showing a shorter and more contained separated region",
              caption:
                "Shorter separation, and more predictable for a given base length.",
              width: 581,
              height: 293,
            },
          ],
        },
        {
          kind: "text",
          body: [
            "The rounded petal produced greater braking force but separated further from the body. The slot design gave less drag with a more predictable separation for a constant base length. The configuration taken forward was a compromise between the two rather than either one outright.",
            "A second constraint came out of the geometry rather than the flow. The number of flaps had to match the number of fins, so the two sit clocked apart and the wake from a brake does not run straight into a fin downstream.",
          ],
        },
      ],
    },

    {
      id: "method",
      title: "The simulation",
      kicker: "Setup",
      blocks: [
        {
          kind: "specGrid",
          items: [
            {
              title: "Full geometry, no symmetry plane",
              body: "The petals sit clocked out of phase with the fins, so a deployed vehicle is not symmetric about any plane. A half model would have been cheaper and wrong.",
            },
            {
              title: "Domain",
              body: "A cuboid 24 m by 12 m by 12 m, which is 72.7 by 36.4 by 36.4 rocket radii, with the base of the vehicle 48.5 radii upstream of the outlet.",
            },
            {
              title: "Mesh",
              body: "Trimmed cell hex dominant core, prism layer mesher at the wall, surface remesher on the body. Base size 4.0 m, 16 prism layers at a stretching factor of 1.5.",
            },
            {
              title: "Prism thickness from theory",
              body: "Prandtl-Schlichting predicts a 47.2 mm boundary layer at the aft end at 100 m/s, so the prism stack was sized to contain the whole layer rather than guessed at.",
            },
            {
              title: "Turbulence model",
              body: "Realizable two layer k-epsilon, chosen for cost across twenty five runs and because its all y+ wall treatment adapts to whatever y+ the mesh delivers, so one meshing setup serves every case.",
            },
            {
              title: "Wake resolution",
              body: "The wake is deliberately coarse. It damps pressure perturbations reflecting off the outlet back onto the body, and for a streamlined shape skin friction dominates, so near wall resolution matters more than wake resolution.",
            },
          ],
        },
        {
          kind: "text",
          body: [
            "Each case ran to 1000 iterations on a segregated solver, by which point continuity, energy and momentum residuals had fallen to between 10⁻⁷ and 10⁻¹⁰.",
          ],
        },
      ],
    },

    {
      id: "verification",
      title: "Checking the solution before using it",
      kicker: "Verification",
      blocks: [
        {
          kind: "text",
          body: [
            "A drag number is only worth handing to a control team if there is some independent reason to believe it. Three checks were run on the solution before any of it was used.",
          ],
        },
        {
          kind: "list",
          items: [
            "Local Reynolds number along the body reaches order 10⁷, and the flow turns turbulent within the first 75 mm. That is what justifies a fully turbulent k-epsilon model, rather than the model being assumed to apply.",
            "Boundary layer height in the solution came out at 0.0408 m against 0.047 m predicted by hand, about 13 percent apart, which confirms the prism stack was tall enough to contain the layer it was sized for.",
            "Wall y+ was mapped along the body. At 80 m/s fully deployed it sits around 10 across most of the surface, with higher values local to the brakes and fins.",
          ],
        },
        {
          kind: "figure",
          figure: {
            src: img("boundary-layer-check.png"),
            alt: "Velocity magnitude along the vehicle with a detail view at the aft end, annotated with a measured boundary layer height of 0.0408 metres",
            caption:
              "Boundary layer height measured in the solution at 100 m/s with the brakes stowed, against the hand calculation used to size the prism layers.",
            width: 760,
            height: 413,
          },
        },
        {
          kind: "note",
          tone: "caveat",
          body:
            "A y+ around 10 puts the solver in the blending region between the viscous sublayer and the log law. That is inside what the chosen wall treatment is built for, but resolving the viscous sublayer directly would have been better. The trade was deliberate: keeping one mesh setup across all twenty five cases means the comparison between cases stays consistent, which matters more here than the absolute accuracy of any single one.",
        },
      ],
    },

    {
      id: "results",
      title: "The drag map",
      kicker: "Results",
      blocks: [
        {
          kind: "figure",
          figure: {
            src: img("drag-map.png"),
            alt: "Plot of drag coefficient against airbrake deployment percentage, with one curve for each of five freestream velocities from 20 to 100 metres per second",
            caption:
              "Drag coefficient against airbrake deployment, one curve per freestream velocity.",
            width: 889,
            height: 490,
            plate: true,
          },
        },
        {
          kind: "table",
          caption:
            "Drag coefficient across the sweep. Values are read from the plotted results, so the third decimal is approximate.",
          head: ["Deployment", "20 m/s", "40 m/s", "60 m/s", "80 m/s", "100 m/s"],
          rows: [
            ["0 %", "0.008", "0.031", "0.065", "0.110", "0.162"],
            ["25 %", "0.009", "0.032", "0.067", "0.114", "0.169"],
            ["50 %", "0.010", "0.035", "0.076", "0.130", "0.193"],
            ["75 %", "0.011", "0.041", "0.088", "0.151", "0.227"],
            ["100 %", "0.013", "0.048", "0.104", "0.178", "0.270"],
          ],
        },
        {
          kind: "text",
          body: [
            "Drag rises with both deployment and velocity, and the sensitivity to deployment grows with speed. At 20 m/s the entire deployment range moves Cd by under 0.005. At 100 m/s the same range moves it by more than 0.1. That spread is the reason a single drag figure would not have been sufficient for the controller.",
          ],
        },
        {
          kind: "figurePair",
          labels: ["At the petal", "Downstream at the fins"],
          figures: [
            {
              src: img("recirculation.png"),
              alt: "Velocity vectors around a deployed airbrake petal showing two recirculation regions behind it",
              caption:
                "Two recirculation regions form behind a deployed petal at 80 m/s.",
              width: 1080,
              height: 463,
            },
            {
              src: img("flow-at-fins.png"),
              alt: "Velocity vectors in two slices through the aft of the vehicle, one through a fin and one above the centreline through the fin section, showing attached flow",
              caption:
                "By the fins the flow has reattached. (a) half section through a fin, (b) a slice 10 cm above the centreline.",
              width: 1329,
              height: 557,
            },
          ],
        },
        {
          kind: "text",
          body: [
            "Those recirculation regions close quickly, and the flow is reattached by the time it reaches the fins. At this condition the brakes do not compromise fin effectiveness, which was the clearance the mechanical design needed before the geometry could be frozen.",
          ],
        },
      ],
    },

    {
      id: "fins",
      title: "Fin section and planform",
      kicker: "Design",
      blocks: [
        {
          kind: "text",
          body: [
            "The fins see both subsonic and transonic flow, since the vehicle passes Mach 0.9 on the way up. A section that behaves well in one regime is not automatically right for the other.",
          ],
        },
        {
          kind: "figure",
          figure: {
            src: img("hybrid-fin-profile.png"),
            alt: "Non-dimensional plot of the hybrid fin section, a rounded NACA leading edge transitioning at 30 percent chord into a straight wedge running to a sharp trailing edge",
            caption:
              "The hybrid section. A NACA 0010 leading edge to 30 percent chord, then a straight wedge to a sharp trailing edge.",
            width: 1044,
            height: 516,
            plate: true,
          },
        },
        {
          kind: "text",
          body: [
            "The section tested was a hybrid: a NACA leading edge to keep the flow attached subsonically and delay shock induced separation transonically, then a sharp wedge trailing edge to fix the rear stagnation point and cut wave drag. It was compared against standard NACA sections at three thicknesses, evaluated at the trajectory average condition rather than at a single design point.",
          ],
        },
        {
          kind: "table",
          caption:
            "Drag coefficient at the trajectory average condition, hybrid section against the standard NACA equivalent.",
          head: ["Thickness", "Hybrid Cd", "Standard NACA Cd"],
          rows: [
            ["10 %", "0.0661", "0.0670"],
            ["12 %", "0.0687", "0.0691"],
            ["14 %", "0.0703", "0.0715"],
          ],
        },
        {
          kind: "text",
          body: [
            "The hybrid at 10 percent thickness gave the lowest drag and was selected. The margin over the equivalent standard section is about **1.3 percent**, which is small, and it is worth reporting as small rather than dressing it up. The CFD drag figures were cross checked against a MATLAB panel method written to run over the same geometries, so the ranking rests on two independent methods rather than one.",
            "The planform was chosen separately, through a weighted decision matrix over five candidates. The weightings came from a pairwise comparison of the requirements rather than being assigned directly, and structural stiffness at maximum dynamic pressure, static stability and flutter margin carried three quarters of the weight between them.",
          ],
        },
        {
          kind: "table",
          caption: "Weighted scores from the planform decision matrix.",
          head: ["Planform", "Weighted score"],
          rows: [
            ["Swept trapezoidal", "3.7"],
            ["Low aspect ratio swept trapezoid", "3.4"],
            ["Biconvex cross section upgrade", "3.4"],
            ["Highly swept clipped delta", "3.3"],
            ["Elliptical", "2.6"],
          ],
        },
        {
          kind: "text",
          body: [
            "Swept trapezoidal won. The elliptical planform lost on manufacturability in composite rather than on aerodynamics, which is worth saying plainly, because a downselection is more useful when the losing reason is specific. Three fins were used rather than four, so the airbrake wake has fewer chances to meet a fin downstream.",
            "The chosen fin was built from three triaxial carbon plies in a [-45, 0, 45] layup. For the structural check I took the worst case flight condition, Mach 0.9 at 850 m with a conservative 15 degree angle of attack, and reduced it to an equivalent uniform pressure of 146 kPa through dynamic pressure and a finite wing lift curve slope, which is what was applied to the Abaqus model of the fin.",
          ],
        },
      ],
    },

    {
      id: "limitations",
      title: "What this does not tell you",
      kicker: "Limitations",
      blocks: [
        {
          kind: "text",
          body: [
            "These are the assumptions recorded at the time, not ones reconstructed afterwards.",
          ],
        },
        {
          kind: "list",
          items: [
            "Panel gaps and manufacturing discontinuities on the body were not modelled.",
            "The gap between each petal and its housing was not modelled.",
            "Tri tangent fin tips could not be produced in the CAD package, so they are absent from the geometry. Drag is therefore marginally over predicted at the tips.",
            "The exhaust hole at the base was left out, to avoid introducing internal flow into a model that had nothing to check it against.",
            "All surfaces were treated as smooth, including the 3D printed fin tips, which are rougher than the carbon body.",
            "The sweep stops at 100 m/s, so deployment between 100 and 150 m/s is not covered.",
          ],
        },
        {
          kind: "note",
          tone: "caveat",
          body:
            "The most important limitation is that this work is verified but not validated. The checks above test the solution against theory and against a second method; none of them is a measurement. A wind tunnel campaign was designed to supply the experimental half, including the scaled model, the instrumentation and an eleven configuration test matrix covering fins on and off, brake deployment and yaw offsets. Until measured data is set against these numbers, they should be read as a carefully checked prediction rather than a measured result.",
        },
      ],
    },
  ],
};

import type { Project } from "./types";

const img = (file: string) => `/images/blood-transport-uav/${file}`;

export const bloodTransportUav: Project = {
  slug: "blood-transport-uav",
  title: "Blood-Transport UAV — Joints & Fairings",
  shortTitle: "Blood-Transport UAV",
  tagline:
    "Every structural interface that holds the aircraft together — designed, analysed, printed, and load-tested past ultimate. Then it failed somewhere the analysis never looked.",
  summary:
    "Design, manufacture and testing of the structural joints and aerodynamic fairings for a complete flight vehicle: ten additively manufactured parts, a load test past ultimate, and a failure analysis of the path nobody modelled.",
  category: "Design · Structures · Test",
  period: "2024–25 · AVDASI 2, University of Bristol",
  featured: true,
  order: 3,

  hero: {
    src: img("uav-assembly-front.png"),
    alt: "Front-view CAD render of the blood-transport UAV showing the full wingspan, the payload pod beneath the wing root and the vertical tail",
    caption:
      "Full-vehicle CAD assembly, front view. The joints beneath the wing root, the empennage joint at the tail and every fairing on the aircraft are this team's work.",
    width: 1800,
    height: 459,
    plate: true,
  },
  card: {
    src: img("uav-assembly-iso.png"),
    alt: "Isometric CAD render of the complete blood-transport UAV",
    width: 1800,
    height: 582,
    fit: "contain",
  },
  cardHover: {
    src: img("ultimate-load-test-station.jpg"),
    alt: "",
    width: 1600,
    height: 886,
  },
  ogImage: img("og.png"),

  disciplines: [
    "Structural analysis",
    "Aerodynamics",
    "CAD & detail design",
    "Additive manufacturing",
    "Wind-tunnel testing",
    "Project management",
  ],
  tools: [
    "Autodesk Inventor",
    "XFoil",
    "Python",
    "FDM (PLA)",
    "Wind tunnel + 6-component balance",
    "LabVIEW",
  ],
  role:
    "Fuselage Division Design Team Manager · Team Project Manager · Aero Specialist · Design Specialist",

  githubUrl: "https://github.com/Jadbadawi/blood-transport-uav",

  stats: [
    {
      value: "813 N",
      label: "Survived past ultimate load",
      detail: "Linear load–deflection response throughout — no stiffness knee",
    },
    {
      value: "1.95",
      label: "Governing reserve factor",
      detail: "Centre bar in bending at the 6g × 1.5 load case",
    },
    {
      value: "1,011 g",
      label: "Subassembly mass",
      detail: "Ten flight parts, 100 % additively manufactured",
    },
    {
      value: "0.09 N",
      label: "Measured fairing drag delta",
      detail: "Against 0.34 N run-to-run scatter — inconclusive, and reported as such",
    },
  ],

  sections: [
    {
      id: "brief",
      title: "The brief",
      kicker: "Requirements",
      blocks: [
        {
          kind: "text",
          body: [
            "Design, build and test a UAV capable of moving blood samples rapidly between a rural short-tarmac runway and a hospital test centre. Sixty students, three competing companies, one academic year — and a real test campaign at the end: a wind-tunnel entry for aerodynamic data and a structural test taken past the ultimate load case.",
            "Team 08 owned the joints and fairings: every structural interface that holds the aircraft together, and every aerodynamic surface that covers those interfaces. That put the team downstream of six other teams and upstream of the whole airframe — nothing assembled until these parts fit.",
          ],
        },
        {
          kind: "figureAside",
          side: "right",
          figure: {
            src: img("requirements-extract.png"),
            alt: "Extract from the project requirements traceability matrix",
            caption: "Extract from the requirements traceability matrix maintained throughout.",
            width: 342,
            height: 287,
            plate: true,
          },
          body: [
            "Requirements were tracked to a traceability matrix throughout the project — which matters more than it sounds, because one of them (2.5.2.a, treating printed parts as non-structural formers) turns out to be the root of the eventual failure.",
            "I held four roles: Fuselage Division Design Team Manager, Team Project Manager, Aero Specialist and Design Specialist. In the team's technical report I authored the project management and aerodynamics sections in full, plus the downselection and subassembly design sections.",
          ],
        },
        {
          kind: "flow",
          steps: [
            { title: "Requirements", detail: "Mission load cases and a traceability matrix" },
            { title: "Concept selection", detail: "Pairwise-weighted criteria feeding an MCDA matrix" },
            { title: "Structural analysis", detail: "Reserve factors at 6g × 1.5, ahead of detailed design" },
            { title: "Detailed design", detail: "Joints, clamps and fairings in Autodesk Inventor" },
            { title: "Manufacture", detail: "FDM PLA, brass inserts, trial assembly" },
            { title: "Test", detail: "Wind tunnel + ultimate load test — then failure analysis" },
          ],
        },
      ],
    },
    {
      id: "concept",
      title: "Concept selection",
      kicker: "Downselection",
      blocks: [
        {
          kind: "figurePair",
          labels: ["Criteria weighting", "The rejected concepts"],
          figures: [
            {
              src: img("downselection-criteria.png"),
              alt: "Pairwise comparison matrix used to weight the selection criteria for the multi-criteria decision analysis",
              caption:
                "Seven criteria, weighted by pairwise comparison so the weights came out of the comparison rather than out of whoever argued hardest.",
              width: 419,
              height: 697,
              plate: true,
            },
            {
              src: img("downselection-rejected.png"),
              alt: "Sketches of the candidate fairing and joint concepts that were rejected during downselection",
              caption:
                "The designs that lost, kept deliberately — a downselection with no visible rejects is not a decision, it is a preference.",
              width: 432,
              height: 633,
              plate: true,
            },
          ],
        },
        {
          kind: "text",
          body: [
            "Fairings were new to the unit that year: no reference geometry, no guidance on what one is even supposed to look like on this airframe — just a requirement and a blank sketch. Making that tractable meant building the selection process explicitly rather than arguing about shapes.",
          ],
        },
      ],
    },
    {
      id: "aircraft",
      title: "The aircraft",
      kicker: "Design",
      blocks: [
        {
          kind: "figure",
          figure: {
            src: img("uav-assembly-side.png"),
            alt: "Side-view CAD render of the blood-transport UAV showing the wing, payload pod, carbon-fibre tail boom and empennage",
            caption:
              "Side view. A 535-file Inventor assembly, including other teams' geometry so the top-level assembly resolves — authorship attributed per-tree in the repository.",
            width: 1519,
            height: 539,
            plate: true,
          },
        },
        {
          kind: "figure",
          figure: {
            src: img("parts-catalogue.png"),
            alt: "Catalogue sheet of the ten delivered flight parts: structural joints, clamps and aerodynamic fairings",
            caption: "The delivered part catalogue — every part designed, printed, fitted and flown by the team.",
            width: 957,
            height: 899,
            plate: true,
          },
        },
      ],
    },
    {
      id: "joints",
      title: "Structural joints and the load-path asymmetry",
      kicker: "Detail design",
      blocks: [
        {
          kind: "figurePair",
          labels: ["Exploded", "As a single part"],
          figures: [
            {
              src: img("emp-fus-joint-exploded.png"),
              alt: "Exploded CAD view of the empennage to fuselage joint showing its fasteners and components",
              caption:
                "The empennage–fuselage joint, exploded. Load passes predominantly into the CFRP fuselage spar, which is sized for it — so an unreinforced PLA joint is acceptable at these load cases.",
              width: 517,
              height: 503,
              plate: true,
            },
            {
              src: img("emp-fus-joint-part.png"),
              alt: "CAD view of the empennage to fuselage joint as a single printed part with bosses for brass inserts",
              caption:
                "The joint as a single part. Brass inserts take the fasteners; these could work loose under significant lateral load, which the structural test never applied.",
              width: 1094,
              height: 802,
              plate: true,
            },
          ],
        },
        {
          kind: "figurePair",
          labels: ["Upper half — protected by metal", "Lower half — bolt bears on PLA"],
          figures: [
            {
              src: img("aluminium-strap.png"),
              alt: "CAD view of the formed 2014A-T3 aluminium strap protecting the upper half of the fuselage to main-wing joint",
              caption:
                "The formed 2014A-T3 aluminium strap protecting the upper half of the wing joint — load passes into metal and away from printed plastic.",
              width: 752,
              height: 409,
              plate: true,
            },
            {
              src: img("mwp-clamp-counterbore.png"),
              alt: "CAD section through the lower main-wing clamp showing the counterbore cavity directly beneath the wing nut",
              caption:
                "The lower clamp counterbore. No metal protection here — bolt forces bear directly on PLA.",
              width: 890,
              height: 407,
              plate: true,
            },
          ],
        },
        {
          kind: "note",
          tone: "insight",
          body:
            "The load-path asymmetry above is the whole story of this project in one pair of images. The top half of the joint was protected by metal. The bottom half was not, and nobody modelled it.",
        },
      ],
    },
    {
      id: "fairings",
      title: "Aerodynamic fairings",
      kicker: "Detail design",
      blocks: [
        {
          kind: "text",
          body: [
            "The fairing design is an argument about drag budgets. The exposed items were the payload rings, the main wing joint, and roughly 100 mm of cylindrical wing spar — and a circular section in two-dimensional flow produces on the order of ten times the drag of an aerofoil section of the same thickness. But a fairing adds wetted area, which adds skin friction: it only pays for itself if it removes more form drag than the friction it introduces.",
          ],
        },
        {
          kind: "figurePair",
          labels: ["Section", "Planform"],
          figures: [
            {
              src: img("fus-mwp-fairing.png"),
              alt: "CAD view of the fuselage to main-wing fairing shaped to the NACA 2414 aerofoil section",
              caption:
                "Shaped to the same NACA 2414 section the wing teams used, so the covering is continuous with the wing it meets.",
              width: 951,
              height: 413,
              plate: true,
            },
            {
              src: img("fus-mwp-fairing-planform.png"),
              alt: "Planform view of the fuselage to main-wing fairing",
              caption:
                "Planform — maintains laminar flow as far aft as possible and minimises abrupt contour changes.",
              width: 959,
              height: 426,
              plate: true,
            },
          ],
        },
        {
          kind: "figurePair",
          labels: ["Assembly, front", "Assembly, rear"],
          figures: [
            {
              src: img("fairing-assembly-front.png"),
              alt: "CAD view of the fairing assembly from the front",
              width: 605,
              height: 361,
              plate: true,
            },
            {
              src: img("fairing-assembly-rear.png"),
              alt: "CAD view of the fairing assembly from the rear",
              width: 697,
              height: 362,
              plate: true,
            },
          ],
        },
      ],
    },
    {
      id: "structures",
      title: "Structural analysis before detailed design",
      kicker: "Analysis",
      blocks: [
        {
          kind: "text",
          body: [
            "All checks ran at 6g with the standard aerospace 1.5 factor on top — a design load of nine times the 1g load — and were completed deliberately ahead of detailed design, so the design team had limits to work inside rather than an audit to fail afterwards.",
          ],
        },
        {
          kind: "figurePair",
          labels: ["Centre of mass", "Root torsion"],
          figures: [
            {
              src: img("centre-of-mass-calculation.png"),
              alt: "Hand-derived centre of mass calculation across the aircraft subassemblies",
              caption:
                "Centre of mass across all subassemblies, cross-checked with the other teams: 0.369 m.",
              width: 542,
              height: 286,
              plate: true,
            },
            {
              src: img("torsion-calculation.png"),
              alt: "Hand-derived root torsion calculation with weight acting ahead of the spar and lift behind it",
              caption:
                "Root torsion — weight acting 120 mm from the leading edge, lift at the rear of the spar: 375 N·mm at 1g, 3375 N·mm at 9g.",
              width: 424,
              height: 456,
              plate: true,
            },
          ],
        },
        {
          kind: "table",
          caption: "Reserve factors at the 6g × 1.5 load case",
          head: ["Part", "Check", "RF"],
          rows: [
            ["Centre bar", "Bending", "1.95"],
            ["Spar", "Bearing", "2.4"],
            ["Flange", "Prying", "3.4"],
            ["Spar", "Tension", "4.4"],
            ["Spar", "Shear", "5.1"],
            ["Pin", "Shear", "7.4"],
            ["Spar", "Cleavage", "8.9"],
            ["Lug", "Prying", "39.0"],
          ],
        },
        {
          kind: "figurePair",
          labels: ["Reserve factors", "Mass budget"],
          figures: [
            {
              src: img("reserve-factors.png"),
              alt: "Bar chart of the eight computed reserve factors with the critical centre bar highlighted",
              caption: "Eight reserve factors, critical member highlighted — the centre bar at 1.95 was the predicted first failure.",
              width: 1256,
              height: 836,
              plate: true,
            },
            {
              src: img("mass-budget.png"),
              alt: "Mass budget chart splitting the 1,011 gram subassembly between load-bearing structure and aerodynamic shell",
              caption: "Where the mass went: 269 g of load path, 742 g of aerodynamic shell.",
              width: 1399,
              height: 954,
              plate: true,
            },
          ],
        },
        {
          kind: "text",
          body: [
            "Two numbers in that table are worth more than the pass/fail verdict. The 1.95 is the design point — conservative by construction, and the predicted first failure. The 39.0 is a defect: a reserve factor that high is 39× more material than the load requires, and on a vehicle where mass drives take-off performance, that is an unclaimed mass saving. It went unclaimed.",
          ],
        },
        {
          kind: "figureAside",
          side: "left",
          figure: {
            src: img("fairing-mass-benchmark.png"),
            alt: "Chart benchmarking the team's fairing mass against the two competing companies",
            caption: "3.1× the lightest competitor. All fairings came to 652 g, 11.85 % of all-up UAV mass.",
            width: 1052,
            height: 858,
            plate: true,
          },
          body: [
            "The mass story has the same honesty. Of the 1,011 g total, only 269 g carries load — the other 742 g is aerodynamic shell, and against the competing companies the fairings came out 3.1× heavier than the lightest.",
            "The cause was a single early decision to commit entirely to FDM PLA, which bought fast iteration and compound curves the project genuinely needed given how much the interfaces moved, and cost mass. What makes it a real error rather than an accepted trade is that some parts never changed: the nose cone was stable from early on and could have been Styrofoam at no schedule risk.",
          ],
        },
      ],
    },
    {
      id: "aero",
      title: "Aerodynamics: prediction against tunnel",
      kicker: "Experiment",
      blocks: [
        {
          kind: "text",
          body: [
            "At the tunnel speed of 20 m/s the wing sits at a Reynolds number of 4.1×10⁵ and Mach 0.058 — compressibility is irrelevant, but transition is sensitive to surface finish and freestream turbulence, which is why XFoil and the tunnel were never going to coincide.",
          ],
        },
        {
          kind: "figurePair",
          labels: ["XFoil vs tunnel", "Drag vs angle of attack"],
          figures: [
            {
              src: img("aerofoil-prediction-vs-test.png"),
              alt: "Comparison of XFoil predictions against wind-tunnel measurements for clean and 30-degree flap configurations",
              caption: "The tunnel loses lift and gains drag in both configurations — consistently, and in the expected direction.",
              width: 1373,
              height: 705,
              plate: true,
            },
            {
              src: img("tunnel-drag-vs-aoa.png"),
              alt: "Fuselage drag against angle of attack with the seven-run repeat scatter band at zero degrees",
              caption: "Fuselage drag vs angle of attack, with the seven-run 0° repeat scatter that decides how much of this is signal.",
              width: 1106,
              height: 890,
              plate: true,
            },
          ],
        },
        {
          kind: "text",
          body: [
            "The conclusion is not that XFoil was wrong — a 2D, infinite-span, smooth-surface model is a lower bound on drag and an upper bound on lift, and should be read as such. The dominant discrepancy is finite span: tip vortices generate induced drag entirely absent from a 2D solution.",
          ],
        },
        {
          kind: "gallery",
          title: "Original drag polars — XFoil (left pair) and tunnel (right pair)",
          figures: [
            {
              src: img("drag-polar-xfoil-clean.png"),
              alt: "XFoil drag polar for the clean configuration",
              caption: "XFoil, clean.",
              width: 512,
              height: 367,
              plate: true,
            },
            {
              src: img("drag-polar-xfoil-flap30.png"),
              alt: "XFoil drag polar for the 30 degree flap configuration",
              caption: "XFoil, 30° flap.",
              width: 609,
              height: 367,
              plate: true,
            },
            {
              src: img("drag-polar-tunnel-clean.png"),
              alt: "Wind tunnel drag polar for the clean configuration",
              caption: "Tunnel, clean.",
              width: 617,
              height: 387,
              plate: true,
            },
            {
              src: img("drag-polar-tunnel-flap30.png"),
              alt: "Wind tunnel drag polar for the 30 degree flap configuration",
              caption: "Tunnel, 30° flap.",
              width: 512,
              height: 387,
              plate: true,
            },
          ],
        },
        {
          kind: "text",
          body: [
            "The fairing question got the more interesting answer. Averaged over the campaign, fairings-on recorded 0.09 N more drag than fairings-off — but seven repeat runs give a run-to-run standard deviation of 0.34 N. The measured difference is a quarter of one standard deviation of the noise. **It is not a resolvable difference.**",
            "And the test was structurally biased against the part. The tunnel could only accommodate the fuselage, which removed the fairing's single largest justification — the 100 mm of exposed spar — from the experiment entirely, while its cost in extra wetted area was fully present.",
          ],
        },
        {
          kind: "figurePair",
          labels: ["Cutout added for tunnel clearance", "Exposed spar, no wings fitted"],
          figures: [
            {
              src: img("tunnel-fairing-cutout.jpg"),
              alt: "The fairing mounted in the wind tunnel with the vertical cutout added to clear the mounting hardware",
              caption: "A feature added purely for testability degraded the quantity being tested.",
              width: 342,
              height: 233,
            },
            {
              src: img("tunnel-exposed-spar.jpg"),
              alt: "The exposed cylindrical spar section in the wind tunnel with no wings fitted",
              caption: "With no wings fitted, the fairing's flanks were open and flow crept inside — a condition impossible on the assembled aircraft.",
              width: 301,
              height: 256,
            },
          ],
        },
        {
          kind: "note",
          tone: "insight",
          body:
            "The result I am most willing to defend is the one that says the experiment could not answer the question. Reporting the fairing comparison as inconclusive — rather than dressing it up in either direction — is the correct engineering answer. CFD was considered and rejected honestly: a result nobody on the team could defend is worse than no result.",
        },
      ],
    },
    {
      id: "test",
      title: "The ultimate load test",
      kicker: "Test campaign",
      blocks: [
        {
          kind: "figure",
          figure: {
            src: img("ultimate-load-test-station.jpg"),
            alt: "The loaded airframe in the structural test rig with LabVIEW deflection acquisition at port wing, starboard wing, centre and empennage",
            caption:
              "The loaded airframe in the rig, 5 March 2025 — LabVIEW deflection channels at port wing, starboard wing, centre and empennage. (A reflected face has been blurred for privacy.)",
            width: 1600,
            height: 886,
          },
        },
        {
          kind: "figurePair",
          labels: ["The practice build", "Load vs deflection"],
          figures: [
            {
              src: img("trial-assembly-airframe.jpg"),
              alt: "The physical airframe during trial assembly on the workbench",
              caption:
                "Nothing assembled until these parts fitted, so a trial assembly was not optional. (Cropped to remove identifiable people.)",
              width: 400,
              height: 383,
            },
            {
              src: img("load-deflection.png"),
              alt: "Load against deflection showing a linear response with fitted stiffnesses of 74 and 102 newtons per millimetre",
              caption:
                "Linear to ultimate load — no knee, no progressive softening. 74 N/mm centre, 102 N/mm empennage.",
              width: 1097,
              height: 906,
              plate: true,
            },
          ],
        },
        {
          kind: "text",
          body: [
            "The airframe survived past the ultimate load case to 813 N with a linear load–deflection response throughout. The predictions that were made were sound.",
            "Sensors were then removed to protect them, and loading continued. The recorded load went 813 N → 804 N → 764 N: a load drop with no visible or audible event, which means something has yielded. The aircraft was disassembled and inspected.",
          ],
        },
      ],
    },
    {
      id: "failure",
      title: "Then it failed somewhere else",
      kicker: "Failure analysis",
      blocks: [
        {
          kind: "text",
          body: [
            "The centre bar — reserve factor 1.95, the predicted first failure — was undamaged. It was inspected specifically because it was expected to fail, and showed no deformation at all.",
            "The failure was bolt shear-out through the 3D-printed PLA main-wing clamp: the wing nut pulled down into the counterbore cavity and the bolt began working through the remaining thin section of printed plastic.",
          ],
        },
        {
          kind: "figureStrip",
          figures: [
            {
              src: img("clamp-shear-damage-1.jpg"),
              alt: "Post-test inspection photograph showing bolt shear-out damage through the PLA main-wing clamp",
              caption: "Bolt shear-out through the PLA clamp.",
              width: 445,
              height: 250,
            },
            {
              src: img("clamp-shear-damage-2.jpg"),
              alt: "Second post-test view of the shear damage where the wing nut pulled into the counterbore cavity",
              caption: "The wing nut pulled down into the counterbore cavity.",
              width: 443,
              height: 250,
            },
            {
              src: img("clamp-shear-damage-detail.jpg"),
              alt: "Close detail of the bolt working through the remaining thin section of printed plastic",
              caption: "The bolt working through the remaining thin section.",
              width: 222,
              height: 245,
            },
          ],
        },
        {
          kind: "text",
          body: [
            "Two causes, and neither is arithmetic. First, the analysis had no term for this mode: every reserve factor in the table is a check on a metallic member, because printed PLA parts were treated per requirement 2.5.2.a as non-structural formers. The analysis boundary was drawn around the parts the method knew how to handle, and never revisited when a printed part ended up in a primary load path. That is a scoping failure, and a common one in practice.",
            "Second, the wrong clamp was fitted. Two variants existed deliberately — a wind-tunnel clamp with an 8 mm counterbore for a flanged bronze bush, and a structural-test clamp with solid material under the wing nut. The wind-tunnel clamp was fitted for the structural test because swapping it meant disassembling the pod and there was not enough time. The aircraft was loaded with a cavity directly beneath the wing nut.",
          ],
        },
        {
          kind: "note",
          tone: "insight",
          body:
            "Both things are true at once: the predictions that were made were sound — the linear response and the undamaged centre bar confirm the whole analysis chain — and the predictions did not cover the aircraft. Correct answers to the wrong question. That gap between what was analysed and what actually broke is the most useful thing in the project.",
        },
      ],
    },
    {
      id: "role",
      title: "What I personally did",
      kicker: "Contribution",
      blocks: [
        {
          kind: "text",
          body: [
            "Taking four roles was deliberate: the fastest way to find out which parts of engineering you are good at is to take on more than one and find out by doing.",
            "As **Design Team Manager** for the fuselage division I enforced a company-wide design freeze when other teams' geometry kept moving after the design gate — the right mechanism, applied too late, and the write-up says so. I built the divisional-level network diagrams connecting team objectives to company objectives, and worked hands-on through printing, post-processing, brass-insert fitting and trial assembly.",
          ],
        },
        {
          kind: "figurePair",
          labels: ["Work breakdown structure", "Design & build phase Gantt"],
          figures: [
            {
              src: img("work-breakdown-structure.png"),
              alt: "Work breakdown structure for the team's year of work",
              caption: "The work breakdown structure — one of three planning documents kept congruent with each other.",
              width: 1200,
              height: 1089,
              plate: true,
            },
            {
              src: img("gantt-design-build-phase.png"),
              alt: "Gantt chart covering the design and build phase, weeks seven to seventeen",
              caption:
                "The design and build phase, broken to a feasible task granularity with explicit slack and each task assigned to a named individual.",
              width: 1281,
              height: 491,
              plate: true,
            },
          ],
        },
        {
          kind: "text",
          body: [
            "As **Project Manager** I built and kept congruent the three planning documents governing the team's year, and introduced a mandatory post-meeting reflection that measurably improved the team's self-assessed commitment scores. My critical path predicted 48 hours where the team clocked 105: the estimates were not the problem, the model was — I planned the dependencies inside my team and not the ones I did not control, which for a team sitting downstream of six others were the only ones that mattered.",
          ],
        },
        {
          kind: "figurePair",
          labels: ["Divisional network diagram", "Risk rating matrix"],
          figures: [
            {
              src: img("network-diagram-company.png"),
              alt: "Network diagram capturing dependencies and critical paths across the fuselage division teams",
              caption:
                "Divisional-level network diagram — dependencies and critical paths across teams rather than within them. This was the layer that had otherwise been missing entirely.",
              width: 1400,
              height: 774,
              plate: true,
            },
            {
              src: img("risk-rating-matrix.png"),
              alt: "Risk rating matrix scoring project risks by likelihood and consequence",
              caption: "The risk rating matrix behind the team's risk register.",
              width: 1318,
              height: 809,
              plate: true,
            },
          ],
        },
        {
          kind: "text",
          body: [
            "As **Aero Specialist** I owned the drag-decomposition argument for the fairings, the NACA 2414 section choice, and the XFoil-versus-tunnel comparison — including the finding that the tunnel configuration could not answer the fairing question.",
            "As **Design Specialist** I designed joints and fairings in Inventor and ran the concept downselection. When the company's technical director did not complete the full-aircraft CAD assembly, my design team stepped outside its remit and assembled the entire 535-file aircraft model for the company — the piece of the year I am most pleased with, not for the CAD, which was laborious rather than difficult, but because a small team chose to absorb someone else's failure rather than let the company miss its deadline.",
          ],
        },
      ],
    },
  ],
};

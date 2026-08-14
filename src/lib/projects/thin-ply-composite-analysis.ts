import type { Project } from "./types";

const img = (file: string) => `/images/thin-ply-composite-analysis/${file}`;

export const thinPlyCompositeAnalysis: Project = {
  slug: "thin-ply-composite-analysis",
  title: "Thin-Ply Composite Analysis",
  tagline:
    "Does the Double-Double strength penalty survive when the plies get thin? Theory, manufacture, experiment and FE — combined to answer one question.",
  summary:
    "Experimental, analytical and finite-element investigation of thin-ply quasi-isotropic and Double-Double laminates: four architectures manufactured and tested, a ply-by-ply 3D Abaqus free-edge model, and statistics that decide the result.",
  category: "Composites · FEA · Experiment",
  period: "2025–26 · Final-year research project, University of Bristol",
  featured: true,
  order: 2,

  hero: {
    src: img("sem-fractography.jpg"),
    alt: "SEM fractography of quasi-isotropic and Double-Double laminate fracture surfaces, with magnified views across the ply orientations",
    caption:
      "SEM fractography — QI (top) and DD (bottom) fracture surfaces, with magnified cross-sections across the ply orientations. The failure mechanism is visible directly.",
    width: 1600,
    height: 940,
  },
  card: {
    src: img("sem-fractography.jpg"),
    alt: "Scanning electron microscope images of composite laminate fracture surfaces",
    width: 1600,
    height: 940,
    objectPosition: "50% 30%",
  },
  ogImage: img("og.png"),

  disciplines: [
    "Composite structures",
    "Classical laminate theory",
    "Finite-element analysis",
    "Experimental testing",
    "Fractography",
    "Statistical analysis",
  ],
  tools: ["Abaqus", "MATLAB", "Python", "eLamX", "Instron 1342", "SEM"],
  role: "Undergraduate research project (AENG30017), supervised by Prof. Michael R. Wisnom",

  githubUrl: "https://github.com/Jadbadawi/thin-ply-composite-analysis",

  stats: [
    {
      value: "4 × 32-ply",
      label: "Laminates manufactured",
      detail: "TC33/K51 spread-tow prepreg, 0.03 mm plies, autoclave-cured",
    },
    {
      value: "496–538 MPa",
      label: "Failure stress range",
      detail: "All four architectures, failure strains 1.41–1.53 %",
    },
    {
      value: "45–254 J/m²",
      label: "O'Brien energy release rates",
      detail: "Within or below the Gc ≈ 200–500 J/m² critical range",
    },
    {
      value: "65",
      label: "Automated tests",
      detail: "Asserting the analysis pipeline's core properties",
    },
  ],

  sections: [
    {
      id: "question",
      title: "The research question",
      kicker: "Overview",
      blocks: [
        {
          kind: "text",
          body: [
            "Conventional-thickness Double-Double (DD) laminates carry a well-documented unnotched tensile penalty relative to stiffness-equivalent quasi-isotropic (QI) laminates, usually attributed to elevated free-edge stresses, earlier matrix cracking and delamination.",
            "This project asks whether that penalty is intrinsic to the DD architecture — or merely a consequence of matrix- and interface-dominated damage mechanisms that thin plies suppress. And whether the same suppression applies to the classical strength penalty of ply blocking.",
            "Answering that took four lines of evidence run in parallel: tensile testing, classical laminate theory with failure criteria, a 3D ply-by-ply finite-element model of the free edge, and SEM fractography of the failure surfaces.",
          ],
        },
        {
          kind: "flow",
          steps: [
            { title: "Theory", detail: "CLT, ABD matrices, Hashin first-ply failure, O'Brien energy release rates" },
            { title: "Manufacture", detail: "Hand layup, vacuum bagging, autoclave cure — four 32-ply panels" },
            { title: "Experiment", detail: "Unnotched tension on an Instron 1342 with video-gauge strain" },
            { title: "FE model", detail: "3D ply-by-ply Abaqus free-edge stress extraction" },
            { title: "Statistics", detail: "Welch tests with Holm correction for multiple comparisons" },
            { title: "Fractography", detail: "SEM identification of the governing damage mechanisms" },
          ],
        },
        {
          kind: "figure",
          figure: {
            src: img("laminate-architectures.png"),
            alt: "Diagram of the four laminate architectures: dispersed and blocked variants of quasi-isotropic and Double-Double stacking sequences",
            caption:
              "The four architectures. Blocking groups four plies of the same angle together while preserving the in-plane stiffness of the dispersed equivalent — so any strength difference is a stacking effect, not a stiffness effect.",
            width: 845,
            height: 456,
            plate: true,
          },
        },
        {
          kind: "text",
          body: [
            "Each laminate is 32 plies at 0.03 mm — a 0.96 mm laminate. The blocked stacks contain the same proportion of each orientation as their dispersed counterparts, so their extensional stiffness (A) matrices are identical. That equivalence is the premise the whole comparison rests on, and it is asserted by an automated test rather than assumed.",
          ],
        },
      ],
    },
    {
      id: "manufacture",
      title: "Manufacturing and testing",
      kicker: "Experiment",
      blocks: [
        {
          kind: "figure",
          figure: {
            src: img("manufacturing-process.jpg"),
            alt: "Three stages of composite manufacture: laid-up laminate panel, vacuum-bagged assembly, and the open autoclave used for curing",
            caption: "Laid-up panel, vacuum-bagged assembly, autoclave cure.",
            width: 1600,
            height: 584,
            plate: true,
          },
        },
        {
          kind: "text",
          body: [
            "Panels were laid up by hand from TC33/K51 spread-tow thin-ply prepreg, vacuum-bagged and autoclave-cured, then cut into untabbed coupons. Working at 0.03 mm ply thickness makes layup defects a live concern — the repository documents wrinkles after debulking, ply repairs and fibre separation rather than editing them out.",
            "Testing used an Instron 1342 with video-gauge strain measurement. The non-contact gauge matters on a 0.96 mm coupon: a bonded extensometer or strain gauge would introduce exactly the local stiffening and stress concentration the experiment is trying to avoid. Coupons were run untabbed after preliminary tabbed tests failed prematurely at the tab ends.",
          ],
        },
        {
          kind: "figurePair",
          figures: [
            {
              src: img("autoclave-with-panel.jpg"),
              alt: "Open autoclave with a composite panel inside on the loading rack",
              caption: "The autoclave, open, with a panel in for cure.",
              width: 960,
              height: 1280,
            },
            {
              src: img("instron-rig.jpg"),
              alt: "Instron 1342 test machine with a composite coupon gripped and the video gauge positioned for strain measurement",
              caption: "The Instron 1342 rig with the video gauge in place.",
              width: 960,
              height: 1280,
            },
          ],
        },
      ],
    },
    {
      id: "fe-model",
      title: "The 3D free-edge finite-element model",
      kicker: "Numerical",
      blocks: [
        {
          kind: "text",
          body: [
            "The FE work is the numerical half of the argument: if DD really carries an intrinsic penalty, it should show up as a more severe free-edge stress state than QI at matched in-plane stiffness.",
            "Every one of the 32 plies is meshed discretely through the thickness. The free-edge problem is a ply-scale effect — smearing the laminate into an equivalent shell would delete the very thing being measured.",
          ],
        },
        {
          kind: "figurePair",
          figures: [
            {
              src: img("fe-model-bcs-path.png"),
              alt: "Finite-element model of the coupon strip showing boundary conditions and the mid-length extraction path across the width",
              caption:
                "One end fully fixed, the other pulled to 1 mm; interlaminar stresses are read along a path across the width at mid-length, far from the grip constraints.",
              width: 1206,
              height: 591,
              plate: true,
            },
            {
              src: img("fe-mesh-detail.png"),
              alt: "Mesh detail showing all 32 plies individually resolved through the laminate thickness",
              caption: "All 32 plies individually meshed through the thickness.",
              width: 1095,
              height: 604,
              plate: true,
            },
          ],
        },
        {
          kind: "text",
          body: [
            "The extraction targets the three interlaminar components — peel stress S33 and the two interlaminar shears S13, S23 — at the central same-angle interface: the 90°/90° pair in QI, the 67.5°/67.5° pair in DD.",
          ],
        },
        {
          kind: "figure",
          figure: {
            src: img("free-edge-s33.png"),
            alt: "Interlaminar peel stress magnitude across the coupon width for all four laminates, flat in the interior with steep excursions in the final millimetre at each free edge",
            caption:
              "|S33| across the coupon width, all four laminates. The interior is essentially stress-free; everything happens in the last ~1 mm at each edge.",
            width: 1600,
            height: 1305,
            plate: true,
          },
        },
        {
          kind: "text",
          body: [
            "Two results come out of this. QI and DD develop genuinely different free-edge stress states despite matched in-plane stiffness — the architectures are not interchangeable at the ply scale even when their ABD matrices say they are. And blocking raises the local magnitudes in both families, which is the conventional explanation for the blocking strength penalty.",
            "Feeding these fields into the O'Brien energy release rate gives per-interface values of 45–254 J/m², sitting within or below the expected critical range for this material system (Gc ≈ 200–500 J/m²) for three of the four laminates. The free-edge stresses are real and architecture-dependent — but mostly **not large enough to drive delamination first**. That is the crux of the whole result.",
          ],
        },
      ],
    },
    {
      id: "results",
      title: "What the experiment showed",
      kicker: "Results",
      blocks: [
        {
          kind: "text",
          body: [
            "All four laminates failed at similar global strains (1.41–1.53 %) and stresses (496–538 MPa). Blocked DD gave the highest mean — but the interesting question is which differences are real.",
          ],
        },
        {
          kind: "figure",
          figure: {
            src: img("stress-strain-qi-vs-dd.png"),
            alt: "Mean stress-strain curves for QI and DD laminates tracking each other almost exactly to failure, with scatter bands across specimens",
            caption:
              "Mean stress–strain response — the two architectures track each other almost exactly to failure, DD sitting marginally higher. Shaded bands are the scatter across specimens.",
            width: 1600,
            height: 985,
            plate: true,
          },
        },
        {
          kind: "text",
          body: [
            "Classical laminate theory converts the laminate-level measurements into something comparable against the material's own fibre allowable: the back-calculated local ply strain at failure. QI reaches a critical ply strain of 1.42 % against a 1.5 % reference; DD reaches 1.16 %. Taken alone, that looks like the classic DD penalty. It is not — the shortfall tracks the grip-failure caveat below, and the architectures are statistically indistinguishable when compared against each other rather than against literature values.",
          ],
        },
        {
          kind: "figurePair",
          figures: [
            {
              src: img("clt-critical-ply-strain.png"),
              alt: "Bar chart of back-calculated critical local ply strain at failure for QI and DD laminates against the material reference value",
              caption: "Critical local ply strain at failure, against the 1.5 % material reference.",
              width: 1600,
              height: 900,
              plate: true,
            },
            {
              src: img("holm-pvalue-heatmap.png"),
              alt: "Heatmap of Holm-adjusted Welch p-values for pairwise failure strain comparisons between the four laminates",
              caption:
                "Holm-adjusted Welch p-values for failure strain — after correction for multiple comparisons, only one pairing clears 0.05.",
              width: 1600,
              height: 1530,
              plate: true,
            },
          ],
        },
        {
          kind: "text",
          body: [
            "The p-value heatmap is the plot that decides the question. Raw pairwise tests throw up differences; once Holm correction is applied for the number of comparisons actually being made, almost all of them disappear. The headline QI-versus-DD difference does not survive it.",
          ],
        },
        {
          kind: "note",
          tone: "caveat",
          body:
            "Every coupon failed near the grips, so results are interpreted comparatively — as differences between architectures tested identically — rather than as intrinsic gauge-section strengths.",
        },
      ],
    },
    {
      id: "fractography",
      title: "Fractography closes the loop",
      kicker: "Mechanism",
      blocks: [
        {
          kind: "text",
          body: [
            "SEM of the fracture surfaces makes the mechanism visible directly. QI shows matrix-dominated separation localised at the 90° ply — a single weak orientation doing the failing. DD shows fibre fracture across all four orientations, with damage distributed rather than concentrated at one ply.",
            "That is exactly what the thin-ply suppression hypothesis predicts: with no weak matrix-dominated ply to fail first, the DD architecture loses the mechanism that conventionally penalises it. The statistics say the penalty is gone; the fractography says why.",
          ],
        },
        {
          kind: "figure",
          figure: {
            src: img("sem-fractography.jpg"),
            alt: "Four-panel SEM comparison: QI and DD full fracture surfaces on the left, magnified cross-sections across the ply orientations on the right",
            caption:
              "QI (top) and DD (bottom): full fracture surfaces left, magnified cross-sections across the ply orientations right.",
            width: 1600,
            height: 940,
          },
        },
      ],
    },
    {
      id: "reproducibility",
      title: "Reproducibility as an engineering deliverable",
      kicker: "Methods",
      blocks: [
        {
          kind: "text",
          body: [
            "The reported numbers come from the MATLAB pipeline — ABD construction, Hashin first-ply failure across all four modes, O'Brien energy release rates, and the Welch + Holm statistics. Because MATLAB needs a licence, the central calculation is also implemented in Python and runs against a clearly-labelled synthetic sample dataset with no licensed software at all.",
            "A 65-test suite asserts the properties the analysis depends on rather than just that the code runs: that a symmetric laminate really produces a zero B matrix, that the A matrix is genuinely unchanged by blocking — the stiffness-matching premise of the whole comparison — that a unidirectional laminate recovers its engineering constants exactly, that Hashin returns unity at each allowable, and that the Holm implementation matches hand-computed adjusted p-values.",
          ],
        },
        {
          kind: "note",
          tone: "caveat",
          body:
            "Stated limitations travel with the data: compression allowables were never measured for this material, so any compressive-mode result inherits placeholder uncertainty; and the blocked-laminate experimental data was generated by a collaborator, credited in the repository, whose raw measurements are not republished.",
        },
      ],
    },
  ],
};

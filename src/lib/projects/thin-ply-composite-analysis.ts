import type { Project } from "./types";

const img = (file: string) => `/images/thin-ply-composite-analysis/${file}`;

export const thinPlyCompositeAnalysis: Project = {
  slug: "thin-ply-composite-analysis",
  title: "Thin-Ply Composite Analysis",
  tagline:
    "Does the Double-Double strength penalty survive when the plies get thin? Theory, manufacture, experiment and FE, combined to answer one question.",
  summary:
    "Experimental, analytical and finite-element investigation of thin-ply quasi-isotropic and Double-Double laminates: four architectures manufactured and tested, a ply-by-ply 3D Abaqus free-edge model, and statistics that decide the result.",
  category: "Composites · FEA · Experiment",
  period: "2025/26 · Final-year research project, University of Bristol",
  featured: true,
  order: 3,

  hero: {
    src: img("manufacturing-process.jpg"),
    alt: "Three stages of composite manufacture: a laid-up laminate panel, the vacuum-bagged assembly, and the autoclave used for curing",
    caption:
      "The panels behind every number on this page: laid-up laminate, vacuum-bagged assembly, and the autoclave curing system.",
    width: 1600,
    height: 584,
    plate: true,
  },
  card: {
    src: img("card.jpg"),
    alt: "Scanning electron microscope image of a composite laminate fracture surface",
    width: 1480,
    height: 833,
  },
  cardHover: {
    src: img("laminate-architectures.png"),
    alt: "",
    width: 845,
    height: 456,
    fit: "contain",
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
      value: "496 to 538 MPa",
      label: "Failure stress range",
      detail: "All four architectures, failure strains 1.41 to 1.53 %",
    },
    {
      value: "45 to 254 J/m²",
      label: "O'Brien energy release rates",
      detail: "Within or below the Gc ≈ 200 to 500 J/m² critical range",
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
            "This project asks whether that penalty is intrinsic to the DD architecture, or whether it is only a consequence of matrix- and interface-dominated damage mechanisms that thin plies suppress. It asks the same question of the classical strength penalty associated with ply blocking.",
          ],
        },
        {
          kind: "figure",
          figure: {
            src: img("laminate-architectures.png"),
            alt: "Diagram of the four laminate architectures: dispersed and blocked variants of quasi-isotropic and Double-Double stacking sequences, with ply angle codes",
            caption:
              "The four architectures. Blocking groups four plies of the same angle together while preserving the in-plane stiffness of the dispersed equivalent, so any strength difference is a stacking effect rather than a stiffness effect.",
            width: 845,
            height: 456,
            plate: true,
          },
        },
        {
          kind: "text",
          body: [
            "Each laminate is 32 plies at 0.03 mm, giving a 0.96 mm laminate. The blocked stacks contain the same proportion of each orientation as their dispersed counterparts, so their extensional stiffness (A) matrices are identical. That equivalence is the premise the whole comparison rests on, and it is asserted by an automated test rather than assumed.",
          ],
        },
        {
          kind: "flow",
          steps: [
            { title: "Theory", detail: "CLT, ABD matrices, Hashin first-ply failure, O'Brien energy release rates" },
            { title: "Manufacture", detail: "Hand layup, vacuum bagging and autoclave cure of four 32-ply panels" },
            { title: "Experiment", detail: "Unnotched tension on an Instron 1342 with video-gauge strain" },
            { title: "FE model", detail: "3D ply-by-ply Abaqus free-edge stress extraction" },
            { title: "Statistics", detail: "Welch tests with Holm correction for multiple comparisons" },
            { title: "Fractography", detail: "SEM identification of the governing damage mechanisms" },
          ],
        },
      ],
    },
    {
      id: "manufacture",
      title: "Manufacturing the panels",
      kicker: "Process",
      blocks: [
        {
          kind: "text",
          body: [
            "Panels were laid up by hand from TC33/K51 spread-tow thin-ply prepreg, vacuum-bagged and autoclave-cured, then cut into untabbed coupons.",
          ],
        },
        {
          kind: "figureStrip",
          figures: [
            {
              src: img("layup-process.jpg"),
              alt: "Hand layup of spread-tow thin-ply prepreg onto the tool plate",
              caption: "Hand layup of the spread-tow thin-ply prepreg.",
              width: 960,
              height: 1280,
            },
            {
              src: img("vacuum-bagging.jpg"),
              alt: "Composite panel sealed under a vacuum bag with breather and vacuum ports",
              caption: "Panel bagged for debulking and cure.",
              width: 691,
              height: 1122,
            },
            {
              src: img("autoclave-with-panel.jpg"),
              alt: "Open autoclave loaded with a composite panel on the rack before cure",
              caption: "Autoclave loaded, before cure.",
              width: 960,
              height: 1280,
            },
          ],
        },
        {
          kind: "figureAside",
          side: "left",
          figure: {
            src: img("cured-panel-defects.jpg"),
            alt: "Cured composite panel on the bench with surface wrinkling visible across the plate",
            caption: "Cured panel, with surface wrinkling visible across the plate.",
            width: 733,
            height: 955,
          },
          body: [
            "Working at 0.03 mm ply thickness makes layup defects a live concern, and the repository documents them rather than editing them out. They are the reason results are ultimately interpreted comparatively rather than as intrinsic material strengths.",
            "The defect record below is part of the engineering argument. It covers wrinkling after debulking, wrinkling concentrated on the positive-angle plies, fibre separation in the spread-tow material, and a ply repair where a second ply was laid over a broken one.",
          ],
        },
        {
          kind: "gallery",
          title: "Defect record",
          figures: [
            {
              src: img("wrinkles-after-debulking.jpg"),
              alt: "Composite panel surface showing wrinkling present after the debulk step",
              caption: "Wrinkling after debulking.",
              width: 733,
              height: 955,
            },
            {
              src: img("wrinkles-positive-angles.jpg"),
              alt: "Close view of wrinkling concentrated on the positive-angle plies of the laminate",
              caption: "Wrinkling on positive-angle plies.",
              width: 960,
              height: 1280,
            },
            {
              src: img("fibre-separation.jpg"),
              alt: "Close view of fibre separation in the spread-tow prepreg material",
              caption: "Fibre separation in the spread-tow material.",
              width: 960,
              height: 1280,
            },
            {
              src: img("ply-repair-overlay.jpg"),
              alt: "A second ply laid over a broken ply as a repair during layup",
              caption: "Ply repair: a second ply laid over a broken one.",
              width: 960,
              height: 1280,
            },
          ],
        },
      ],
    },
    {
      id: "testing",
      title: "Tensile testing",
      kicker: "Experiment",
      blocks: [
        {
          kind: "figureStrip",
          figures: [
            {
              src: img("specimen.jpg"),
              alt: "A cut composite test coupon",
              caption: "A cut coupon, ready for test.",
              width: 382,
              height: 1280,
            },
            {
              src: img("instron-rig.jpg"),
              alt: "Instron 1342 test machine with hydraulic grips and the video gauge mounted on its tripod",
              caption: "The Instron 1342 rig, with hydraulic grips and the video gauge on its tripod.",
              width: 960,
              height: 1280,
            },
            {
              src: img("tensile-test-setup.jpg"),
              alt: "Composite coupon mounted in the test machine grips",
              caption: "Coupon mounted for test.",
              width: 287,
              height: 372,
            },
          ],
        },
        {
          kind: "text",
          body: [
            "The non-contact video gauge matters on a 0.96 mm coupon. A bonded extensometer or strain gauge would introduce exactly the local stiffening and stress concentration the experiment is trying to avoid. Coupons were run untabbed after preliminary tabbed tests failed prematurely at the tab ends.",
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
            "The FE work is the numerical half of the argument. If DD really carries an intrinsic penalty, it should show up as a more severe free-edge stress state than QI at matched in-plane stiffness.",
            "Every one of the 32 plies is meshed discretely through the thickness. The free-edge problem is a ply-scale effect, so smearing the laminate into an equivalent shell would delete the very thing being measured.",
          ],
        },
        {
          kind: "figurePair",
          labels: ["Model & boundary conditions", "Through-thickness mesh"],
          figures: [
            {
              src: img("fe-model-bcs-path.png"),
              alt: "Finite-element model of the coupon strip showing boundary conditions and the mid-length extraction path across the width",
              caption:
                "One end fully fixed, the other pulled to Ux = 1 mm. Interlaminar stresses are read along a path across the width at mid-length, far from the grip constraints.",
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
          kind: "figure",
          figure: {
            src: img("interlaminar-components.png"),
            alt: "Diagram of the three interlaminar stress components: S33 peel, S13 and S23 interlaminar shear, at the central same-angle interface",
            caption:
              "The three interlaminar components extracted at the central same-angle interface: S33 (peel), S13 and S23 (interlaminar shear). The interface of interest is the 90°/90° pair in QI and the 67.5°/67.5° pair in DD.",
            width: 1227,
            height: 573,
            plate: true,
          },
        },
        {
          kind: "figurePair",
          labels: ["All four laminates", "QI blocked, signed"],
          figures: [
            {
              src: img("free-edge-s33.png"),
              alt: "Interlaminar peel stress magnitude across the coupon width for all four laminates, flat in the interior with steep excursions in the final millimetre at each free edge",
              caption:
                "|S33| across the coupon width for all four laminates. The interior is essentially stress-free, and everything happens in the last 1 mm or so at each edge.",
              width: 1600,
              height: 1305,
              plate: true,
            },
            {
              src: img("free-edge-profile-qi.png"),
              alt: "Signed peel stress against distance across the width for the blocked quasi-isotropic laminate, flat through the interior then reaching about minus 175 megapascals at each free edge",
              caption:
                "The same picture in signed form for QI blocked: flat through the interior, then a steep excursion to roughly −175 MPa right at the free edge.",
              width: 1540,
              height: 1253,
              plate: true,
            },
          ],
        },
        {
          kind: "text",
          body: [
            "Two results come out of this. QI and DD develop genuinely different free-edge stress states despite matched in-plane stiffness, so the architectures are not interchangeable at the ply scale even when their ABD matrices say they are. Blocking also raises the local magnitudes in both families, which is the conventional explanation for the blocking strength penalty.",
            "Feeding these fields into the O'Brien energy release rate gives per-interface values of 45 to 254 J/m², sitting within or below the expected critical range for this material system (Gc ≈ 200 to 500 J/m²) for three of the four laminates. The free-edge stresses are real and architecture-dependent, but mostly **not large enough to drive delamination first**. That is the crux of the whole result.",
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
            "All four laminates failed at similar global strains (1.41 to 1.53 %) and stresses (496 to 538 MPa). Blocked DD gave the highest mean, but the question worth answering is which of the differences are real.",
          ],
        },
        {
          kind: "figure",
          figure: {
            src: img("stress-strain-qi-vs-dd.png"),
            alt: "Mean stress-strain curves for QI and DD laminates tracking each other almost exactly to failure, with scatter bands across specimens",
            caption:
              "Mean stress-strain response. The two architectures track each other almost exactly to failure, with DD sitting marginally higher. Shaded bands are the scatter across specimens.",
            width: 1600,
            height: 985,
            plate: true,
          },
        },
        {
          kind: "figurePair",
          labels: ["Local ply strain at failure", "Failure stress vs reference"],
          figures: [
            {
              src: img("clt-critical-ply-strain.png"),
              alt: "Chart of back-calculated critical local ply strain at failure for QI and DD laminates against the material reference value",
              caption:
                "Critical local ply strain at failure. QI reaches 1.42 % against a 1.5 % reference, DD only 1.16 %.",
              width: 1600,
              height: 900,
              plate: true,
            },
            {
              src: img("failure-stress-vs-ref.png"),
              alt: "Chart comparing measured failure stress against reference values for the QI and DD laminates",
              caption: "Failure stress: QI 13 % below its reference value, DD 25 % below.",
              width: 1258,
              height: 920,
              plate: true,
            },
          ],
        },
        {
          kind: "text",
          body: [
            "Classical laminate theory converts the laminate-level measurements into something comparable against the material's own fibre allowable. Both architectures underperform their references and DD underperforms by more, which taken alone looks like the classic DD penalty. It is not. The shortfall tracks the grip-failure caveat below, and the architectures are statistically indistinguishable when compared against each other rather than against literature values.",
          ],
        },
        {
          kind: "figurePair",
          labels: ["Raw p-values", "After Holm correction"],
          figures: [
            {
              src: img("raw-pvalue-heatmap.png"),
              alt: "Heatmap of raw uncorrected pairwise Welch p-values for failure strain between the four laminates",
              caption:
                "Raw pairwise Welch p-values for failure strain. Several comparisons appear significant.",
              width: 1600,
              height: 1530,
              plate: true,
            },
            {
              src: img("holm-pvalue-heatmap.png"),
              alt: "Heatmap of Holm-adjusted Welch p-values for the same pairwise failure strain comparisons, with almost all differences no longer significant",
              caption:
                "The same comparisons after Holm correction. Only one pairing still clears 0.05.",
              width: 1600,
              height: 1530,
              plate: true,
            },
          ],
        },
        {
          kind: "text",
          body: [
            "That pair is what decides the question. Raw pairwise tests throw up differences, but once Holm correction is applied for the number of comparisons actually being made, almost all of them disappear. The headline QI-versus-DD difference does not survive it.",
          ],
        },
        {
          kind: "note",
          tone: "caveat",
          body:
            "Every coupon failed near the grips, so results are interpreted comparatively, as differences between architectures tested identically, rather than as intrinsic gauge-section strengths.",
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
            "SEM of the fracture surfaces makes the mechanism visible directly. QI shows matrix-dominated separation localised at the 90° ply, so a single weak orientation is doing the failing. DD shows fibre fracture across all four orientations, with damage distributed rather than concentrated at one ply.",
            "That is what the thin-ply suppression hypothesis predicts. With no weak matrix-dominated ply to fail first, the DD architecture loses the mechanism that conventionally penalises it. The statistics say the penalty is gone, and the fractography says why.",
          ],
        },
        {
          kind: "figure",
          figure: {
            src: img("sem-fractography.jpg"),
            alt: "Four-panel SEM comparison: QI and DD full fracture surfaces on the left, magnified cross-sections across the ply orientations on the right",
            caption:
              "QI (top) and DD (bottom), with full fracture surfaces on the left and magnified cross-sections across the ply orientations on the right. Matrix cracking is annotated on the DD surface.",
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
            "The reported numbers come from the MATLAB pipeline, which covers ABD construction, Hashin first-ply failure across all four modes, O'Brien energy release rates, and the Welch and Holm statistics. Because MATLAB needs a licence, the central calculation is also implemented in Python and runs against a clearly labelled synthetic sample dataset with no licensed software at all.",
            "A 65-test suite asserts the properties the analysis depends on rather than just that the code runs. It checks that a symmetric laminate really produces a zero B matrix, that the A matrix is genuinely unchanged by blocking (the stiffness-matching premise of the whole comparison), that a unidirectional laminate recovers its engineering constants exactly, that Hashin returns unity at each allowable, and that the Holm implementation matches hand-computed adjusted p-values.",
          ],
        },
        {
          kind: "note",
          tone: "caveat",
          body:
            "Stated limitations travel with the data. Compression allowables were never measured for this material, so any compressive-mode result inherits placeholder uncertainty. The blocked-laminate experimental data was generated by a collaborator, credited in the repository, whose raw measurements are not republished here.",
        },
      ],
    },
  ],
};

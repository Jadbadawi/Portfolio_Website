/**
 * Central site configuration.
 *
 * Everything a future update is likely to touch lives here: contact details,
 * link targets, and the resume toggle. An empty string or a false flag means
 * "not configured yet", and the UI hides those entries automatically, so
 * filling a value in is all that is needed to activate it.
 */
export const site = {
  name: "Jad El Badaoui",
  /** Short positioning line used in metadata. */
  role: "Aerospace engineer: CFD, structures and computational methods",
  /**
   * Production URL. Used for canonical links, Open Graph, the sitemap and
   * robots.txt, so it must be the live domain rather than a preview URL.
   */
  siteUrl: "https://jadelbadaoui.com",
  description:
    "Portfolio of Jad El Badaoui, an aerospace engineer working across CFD, fluid-structure interaction, composite structures and computational methods. BEng Aerospace Engineering, University of Bristol; incoming MSc, Imperial College London.",

  // ---------------------------------------------------------------- contact
  /** Public email (also visible in the public git history of the repos). */
  email: "jadbadawi00@gmail.com",
  github: "https://github.com/Jadbadawi",
  linkedin: "https://www.linkedin.com/in/jad-el-badaoui",

  // ---------------------------------------------------------------- resume
  /**
   * Where the CV will be served from once it exists. Nothing links to it
   * until `resumeAvailable` is true, so there is no route to a 404.
   *
   * To activate: put the PDF at `public/Jad-El-Badaoui-CV.pdf` and set
   * `resumeAvailable: true`. See the README.
   */
  resumeUrl: "/Jad-El-Badaoui-CV.pdf",
  resumeAvailable: false,

  // ------------------------------------------------------------- education
  education: [
    {
      degree: "MSc Advanced Computational Methods for Aeronautics, Flow Management and Fluid-Structure Interaction",
      institution: "Imperial College London",
      period: "Incoming",
      note: "",
    },
    {
      degree: "BEng Aerospace Engineering",
      institution: "University of Bristol",
      period: "",
      note: "Final-year research project on thin-ply composite laminates, supervised by Prof. Michael R. Wisnom.",
    },
  ],

  /**
   * Work experience. Intentionally empty until there is something to state:
   * add entries here and the section renders automatically.
   */
  experience: [] as {
    title: string;
    organisation: string;
    period: string;
    summary: string;
  }[],

  /** Current work-in-progress, shown under education. */
  inProgress: {
    title: "FPGA clustering acceleration",
    summary:
      "Performance engineering and FPGA-oriented optimisation of clustering algorithms in C++ with SYCL/DPC++ and Alpaka, covering loop-carried dependencies, irregular memory access and on-chip memory trade-offs. An independent demonstrator, not yet published.",
  },
} as const;

export type Site = typeof site;

/**
 * The href for the CV, or null while it is not yet published. Every resume
 * link in the UI goes through this, so one flag controls all of them.
 */
export const resumeHref: string | null = site.resumeAvailable
  ? site.resumeUrl
  : null;

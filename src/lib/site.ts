/**
 * Central site configuration.
 *
 * Everything a future update is likely to touch lives here: contact details,
 * link targets, and the resume toggle. Empty string / null means "not
 * configured yet" — the UI hides those entries automatically, so filling a
 * value in is all that is needed to activate it.
 */
export const site = {
  name: "Jad El Badaoui",
  /** Short positioning line used in the hero and metadata. */
  role: "Aerospace Engineer — CFD, Structures & Computational Methods",
  /**
   * Production URL. Update after the first Vercel deployment (or when a
   * custom domain is added) so metadata, sitemap and Open Graph URLs resolve.
   */
  url: "https://jadelbadaoui.vercel.app",
  description:
    "Portfolio of Jad El Badaoui — aerospace engineer working across CFD, fluid–structure interaction, composite structures and computational methods. BEng Aerospace Engineering, University of Bristol; incoming MSc, Imperial College London.",

  // ---------------------------------------------------------------- contact
  /** Public email (also visible in the public git history of the repos). */
  email: "jadbadawi00@gmail.com",
  github: "https://github.com/Jadbadawi",
  /** Add the full profile URL (https://www.linkedin.com/in/...) to activate. */
  linkedin: "",

  // ---------------------------------------------------------------- resume
  /**
   * To activate the resume links, place the PDF at
   * `public/Jad-El-Badaoui-CV.pdf` and set this to "/Jad-El-Badaoui-CV.pdf".
   */
  resume: null as string | null,

  // ------------------------------------------------------------- education
  education: [
    {
      degree: "MSc Advanced Computational Methods for Aeronautics, Flow Management and Fluid–Structure Interaction",
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
   * Work experience. Intentionally empty until there is something to state —
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
      "Performance engineering and FPGA-oriented optimisation of clustering algorithms in C++ with SYCL/DPC++ and Alpaka — loop-carried dependencies, irregular memory access and on-chip memory trade-offs. An independent demonstrator, not yet published.",
  },
} as const;

export type Site = typeof site;

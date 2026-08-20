import type { Project } from "./types";
import { windTurbineAeroStructural } from "./wind-turbine-aero-structural";
import { naca0012Aerofoil } from "./naca0012-aerofoil";
import { thinPlyCompositeAnalysis } from "./thin-ply-composite-analysis";
import { bloodTransportUav } from "./blood-transport-uav";
import { waxwingAirbrakeAerodynamics } from "./waxwing-airbrake-aerodynamics";

export type { Project, Section, Block, Figure, Stat } from "./types";

/** All projects, sorted by display order. Register new projects here. */
export const projects: Project[] = [
  windTurbineAeroStructural,
  waxwingAirbrakeAerodynamics,
  thinPlyCompositeAnalysis,
  bloodTransportUav,
  naca0012Aerofoil,
].sort((a, b) => a.order - b.order);

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** Previous/next within display order, wrapping around. */
export function getAdjacentProjects(slug: string): {
  prev: Project;
  next: Project;
} {
  const i = projects.findIndex((p) => p.slug === slug);
  const n = projects.length;
  return {
    prev: projects[(i - 1 + n) % n],
    next: projects[(i + 1) % n],
  };
}

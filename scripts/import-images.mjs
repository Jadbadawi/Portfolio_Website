/**
 * Imports curated images from the local clones of the source repositories
 * into public/images/, resizing and re-encoding oversized files.
 *
 * Photographs are re-encoded as JPEG; plots, diagrams and CAD renders stay
 * PNG so line work and text remain crisp. Prints a manifest of final
 * dimensions used to populate the width/height fields in src/lib/projects.
 *
 * Run:  node scripts/import-images.mjs
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const HOME = process.env.USERPROFILE ?? process.env.HOME;
const REPOS = {
  cfd: path.join(HOME, "Documents", "Simulation"),
  ply: path.join(HOME, "Documents", "rp3"),
  uav: path.join(HOME, "UAV"),
};
const OUT = path.join(import.meta.dirname, "..", "public", "images");

/** @type {{repo: keyof typeof REPOS, from: string, to: string, maxWidth?: number, jpeg?: boolean}[]} */
const IMAGES = [
  // ------------------------------------------------------ aerospace-cfd-fsi
  { repo: "cfd", from: "naca0012-airfoil/01-velocity-contours.png", to: "aerospace-cfd-fsi/naca-velocity-contours.png" },
  { repo: "cfd", from: "naca0012-airfoil/02-pressure-contours.png", to: "aerospace-cfd-fsi/naca-pressure-contours.png" },
  { repo: "cfd", from: "naca0012-airfoil/03-turbulent-kinetic-energy.png", to: "aerospace-cfd-fsi/naca-tke.png" },
  { repo: "cfd", from: "naca0012-airfoil/04-velocity-vectors.png", to: "aerospace-cfd-fsi/naca-velocity-vectors.png" },
  { repo: "cfd", from: "turbine-fsi/01-mesh.png", to: "aerospace-cfd-fsi/turbine-mesh.png", maxWidth: 2000 },
  { repo: "cfd", from: "turbine-fsi/02-rotor-velocity-vectors.png", to: "aerospace-cfd-fsi/turbine-rotor-vectors.png", maxWidth: 2000 },
  { repo: "cfd", from: "turbine-fsi/03-section-pressure-contours.png", to: "aerospace-cfd-fsi/turbine-section-pressure.png" },
  { repo: "cfd", from: "turbine-fsi/04-section-velocity-vectors.png", to: "aerospace-cfd-fsi/turbine-section-velocity.png" },
  { repo: "cfd", from: "turbine-fsi/06-fea-total-deformation.png", to: "aerospace-cfd-fsi/turbine-fea-deformation.png" },
  { repo: "cfd", from: "naca0012-airfoil/05-cfd-reasoning-chain.png", to: "aerospace-cfd-fsi/reasoning-chain.png" },
  { repo: "cfd", from: "naca0012-airfoil/06-domain-and-boundary-conditions.png", to: "aerospace-cfd-fsi/domain-and-bcs.png" },
  { repo: "cfd", from: "naca0012-airfoil/07-mesh-strategy.png", to: "aerospace-cfd-fsi/mesh-strategy.png" },
  { repo: "cfd", from: "naca0012-airfoil/08-verification-vs-validation.png", to: "aerospace-cfd-fsi/verification-vs-validation.png" },
  { repo: "cfd", from: "naca0012-airfoil/09-near-wall-velocity-laws.png", to: "aerospace-cfd-fsi/near-wall-velocity-laws.png" },
  { repo: "cfd", from: "naca0012-airfoil/10-experimental-cp-reference.png", to: "aerospace-cfd-fsi/experimental-cp-reference.png" },
  { repo: "cfd", from: ".github/social-preview.png", to: "aerospace-cfd-fsi/og.png" },

  // ------------------------------------------- thin-ply-composite-analysis
  { repo: "ply", from: "figures/00-laminate-architectures.png", to: "thin-ply-composite-analysis/laminate-architectures.png" },
  { repo: "ply", from: "figures/01-manufacturing-process.jpg", to: "thin-ply-composite-analysis/manufacturing-process.jpg", jpeg: true },
  { repo: "ply", from: "figures/02-tensile-test-rig.jpg", to: "thin-ply-composite-analysis/tensile-test-rig.jpg", jpeg: true },
  { repo: "ply", from: "figures/03-fe-model-bcs-path.png", to: "thin-ply-composite-analysis/fe-model-bcs-path.png" },
  { repo: "ply", from: "figures/04-fe-mesh-detail.png", to: "thin-ply-composite-analysis/fe-mesh-detail.png" },
  { repo: "ply", from: "figures/05-interlaminar-components.png", to: "thin-ply-composite-analysis/interlaminar-components.png" },
  { repo: "ply", from: "figures/06-free-edge-s33.png", to: "thin-ply-composite-analysis/free-edge-s33.png" },
  { repo: "ply", from: "figures/08-clt-critical-ply-strain.png", to: "thin-ply-composite-analysis/clt-critical-ply-strain.png" },
  { repo: "ply", from: "figures/09-failure-stress-vs-ref.png", to: "thin-ply-composite-analysis/failure-stress-vs-ref.png" },
  { repo: "ply", from: "figures/10-stress-strain-qi-vs-dd.png", to: "thin-ply-composite-analysis/stress-strain-qi-vs-dd.png" },
  { repo: "ply", from: "figures/11-sem-fractography.jpg", to: "thin-ply-composite-analysis/sem-fractography.jpg", jpeg: true },
  { repo: "ply", from: "figures/12-holm-pvalue-heatmap.png", to: "thin-ply-composite-analysis/holm-pvalue-heatmap.png" },
  { repo: "ply", from: "manufacturing/images/autoclave-open-with-panel.png", to: "thin-ply-composite-analysis/autoclave-with-panel.jpg", jpeg: true, maxWidth: 960 },
  { repo: "ply", from: "manufacturing/images/instron-rig-with-video-gauge.png", to: "thin-ply-composite-analysis/instron-rig.jpg", jpeg: true, maxWidth: 960 },
  { repo: "ply", from: "figures/07-free-edge-profile-qi.png", to: "thin-ply-composite-analysis/free-edge-profile-qi.png" },
  { repo: "ply", from: "results/figures/statistics/failure_strain_rawp_heatmap.png", to: "thin-ply-composite-analysis/raw-pvalue-heatmap.png", maxWidth: 1600 },
  { repo: "ply", from: "manufacturing/images/layup-process.jpeg", to: "thin-ply-composite-analysis/layup-process.jpg", jpeg: true, maxWidth: 960 },
  { repo: "ply", from: "manufacturing/images/vacuum-bagging.jpeg", to: "thin-ply-composite-analysis/vacuum-bagging.jpg", jpeg: true, maxWidth: 1122 },
  { repo: "ply", from: "manufacturing/images/cured-panel-surface-defects.png", to: "thin-ply-composite-analysis/cured-panel-defects.jpg", jpeg: true },
  { repo: "ply", from: "manufacturing/images/wrinkles-after-debulking.jpeg", to: "thin-ply-composite-analysis/wrinkles-after-debulking.jpg", jpeg: true },
  { repo: "ply", from: "manufacturing/images/wrinkles-on-positive-angles.jpeg", to: "thin-ply-composite-analysis/wrinkles-positive-angles.jpg", jpeg: true, maxWidth: 960 },
  { repo: "ply", from: "manufacturing/images/fibre-separation.jpeg", to: "thin-ply-composite-analysis/fibre-separation.jpg", jpeg: true, maxWidth: 960 },
  { repo: "ply", from: "manufacturing/images/ply-repair-overlay.jpeg", to: "thin-ply-composite-analysis/ply-repair-overlay.jpg", jpeg: true, maxWidth: 960 },
  { repo: "ply", from: "manufacturing/images/specimen.png", to: "thin-ply-composite-analysis/specimen.jpg", jpeg: true },
  { repo: "ply", from: "manufacturing/images/tensile-test-setup.png", to: "thin-ply-composite-analysis/tensile-test-setup.jpg", jpeg: true },
  { repo: "ply", from: ".github/social-preview.png", to: "thin-ply-composite-analysis/og.png" },

  // --------------------------------------------------- blood-transport-uav
  { repo: "uav", from: "figures/cad/uav-assembly-iso.png", to: "blood-transport-uav/uav-assembly-iso.png" },
  { repo: "uav", from: "figures/cad/parts-catalogue.png", to: "blood-transport-uav/parts-catalogue.png" },
  { repo: "uav", from: "figures/cad/emp-fus-joint-exploded.png", to: "blood-transport-uav/emp-fus-joint-exploded.png" },
  { repo: "uav", from: "figures/cad/aluminium-strap.png", to: "blood-transport-uav/aluminium-strap.png" },
  { repo: "uav", from: "figures/cad/mwp-clamp-counterbore.png", to: "blood-transport-uav/mwp-clamp-counterbore.png" },
  { repo: "uav", from: "figures/cad/fus-mwp-fairing.png", to: "blood-transport-uav/fus-mwp-fairing.png" },
  { repo: "uav", from: "figures/charts/reserve-factors.png", to: "blood-transport-uav/reserve-factors.png" },
  { repo: "uav", from: "figures/charts/load-deflection.png", to: "blood-transport-uav/load-deflection.png" },
  { repo: "uav", from: "figures/charts/mass-budget.png", to: "blood-transport-uav/mass-budget.png" },
  { repo: "uav", from: "figures/charts/aerofoil-prediction-vs-test.png", to: "blood-transport-uav/aerofoil-prediction-vs-test.png" },
  { repo: "uav", from: "figures/charts/tunnel-drag-vs-aoa.png", to: "blood-transport-uav/tunnel-drag-vs-aoa.png" },
  { repo: "uav", from: "figures/testing/tunnel-fairing-cutout.png", to: "blood-transport-uav/tunnel-fairing-cutout.jpg", jpeg: true },
  { repo: "uav", from: "figures/testing/tunnel-exposed-spar.png", to: "blood-transport-uav/tunnel-exposed-spar.jpg", jpeg: true },
  { repo: "uav", from: "figures/testing/trial-assembly-airframe.png", to: "blood-transport-uav/trial-assembly-airframe.jpg", jpeg: true },
  { repo: "uav", from: "figures/testing/ultimate-load-test-station.png", to: "blood-transport-uav/ultimate-load-test-station.jpg", jpeg: true, maxWidth: 1600 },
  { repo: "uav", from: "figures/testing/clamp-shear-damage-1.png", to: "blood-transport-uav/clamp-shear-damage-1.jpg", jpeg: true },
  { repo: "uav", from: "figures/testing/clamp-shear-damage-2.png", to: "blood-transport-uav/clamp-shear-damage-2.jpg", jpeg: true },
  { repo: "uav", from: "figures/cad/uav-assembly-front.png", to: "blood-transport-uav/uav-assembly-front.png" },
  { repo: "uav", from: "figures/cad/uav-assembly-side.png", to: "blood-transport-uav/uav-assembly-side.png" },
  { repo: "uav", from: "figures/cad/emp-fus-joint-part.png", to: "blood-transport-uav/emp-fus-joint-part.png" },
  { repo: "uav", from: "figures/cad/fus-mwp-fairing-planform.png", to: "blood-transport-uav/fus-mwp-fairing-planform.png" },
  { repo: "uav", from: "figures/cad/fairing-assembly-front.png", to: "blood-transport-uav/fairing-assembly-front.png" },
  { repo: "uav", from: "figures/cad/fairing-assembly-rear.png", to: "blood-transport-uav/fairing-assembly-rear.png" },
  { repo: "uav", from: "figures/cad/downselection-criteria.png", to: "blood-transport-uav/downselection-criteria.png" },
  { repo: "uav", from: "figures/cad/downselection-rejected.png", to: "blood-transport-uav/downselection-rejected.png" },
  { repo: "uav", from: "figures/requirements-extract.png", to: "blood-transport-uav/requirements-extract.png" },
  { repo: "uav", from: "figures/structures/centre-of-mass-calculation.png", to: "blood-transport-uav/centre-of-mass-calculation.png" },
  { repo: "uav", from: "figures/structures/torsion-calculation.png", to: "blood-transport-uav/torsion-calculation.png" },
  { repo: "uav", from: "figures/charts/fairing-mass-benchmark.png", to: "blood-transport-uav/fairing-mass-benchmark.png" },
  { repo: "uav", from: "figures/aero/drag-polar-xfoil-clean.png", to: "blood-transport-uav/drag-polar-xfoil-clean.png" },
  { repo: "uav", from: "figures/aero/drag-polar-tunnel-clean.png", to: "blood-transport-uav/drag-polar-tunnel-clean.png" },
  { repo: "uav", from: "figures/aero/drag-polar-xfoil-flap30.png", to: "blood-transport-uav/drag-polar-xfoil-flap30.png" },
  { repo: "uav", from: "figures/aero/drag-polar-tunnel-flap30.png", to: "blood-transport-uav/drag-polar-tunnel-flap30.png" },
  { repo: "uav", from: "figures/testing/clamp-shear-damage-detail.png", to: "blood-transport-uav/clamp-shear-damage-detail.jpg", jpeg: true },
  { repo: "uav", from: "figures/pm/work-breakdown-structure.png", to: "blood-transport-uav/work-breakdown-structure.png", maxWidth: 1200 },
  { repo: "uav", from: "figures/pm/gantt-design-build-phase.png", to: "blood-transport-uav/gantt-design-build-phase.png", maxWidth: 1400 },
  { repo: "uav", from: "figures/pm/network-diagram-company.png", to: "blood-transport-uav/network-diagram-company.png", maxWidth: 1400 },
  { repo: "uav", from: "figures/pm/risk-rating-matrix.png", to: "blood-transport-uav/risk-rating-matrix.png" },
  { repo: "uav", from: ".github/social-preview.png", to: "blood-transport-uav/og.png" },
];

/**
 * Derived card crops: 16:9 regions cut from a source image for homepage
 * cards, where the full figure includes solver chrome (legends, colourbars)
 * that reads poorly at card size. The untouched figure is still what the
 * case-study page shows.
 * @type {{from: string, to: string, region: {left: number, top: number, width: number, height: number}}[]}
 */
const CARD_CROPS = [
  {
    // Pressure field: warm palette, distinct from the velocity contour used
    // as the page hero, so card and hero never show the same picture.
    from: path.join(OUT, "aerospace-cfd-fsi", "naca-pressure-contours.png"),
    to: path.join(OUT, "aerospace-cfd-fsi", "card.png"),
    region: { left: 220, top: 190, width: 900, height: 506 },
  },
  {
    from: path.join(OUT, "thin-ply-composite-analysis", "sem-fractography.jpg"),
    to: path.join(OUT, "thin-ply-composite-analysis", "card.jpg"),
    region: { left: 60, top: 20, width: 1480, height: 833 },
  },
];

const manifest = [];
for (const img of IMAGES) {
  const src = path.join(REPOS[img.repo], img.from);
  const dest = path.join(OUT, img.to);
  await mkdir(path.dirname(dest), { recursive: true });

  let pipeline = sharp(src).rotate(); // respect EXIF orientation
  const meta = await sharp(src).metadata();
  if (img.maxWidth && meta.width > img.maxWidth) {
    pipeline = pipeline.resize({ width: img.maxWidth });
  }
  if (img.jpeg) {
    pipeline = pipeline.flatten({ background: "#ffffff" }).jpeg({ quality: 85, mozjpeg: true });
  } else {
    pipeline = pipeline.png({ compressionLevel: 9 });
  }
  const info = await pipeline.toFile(dest);
  manifest.push({ to: `/images/${img.to}`, width: info.width, height: info.height, kb: Math.round(info.size / 1024) });
}

for (const crop of CARD_CROPS) {
  let pipe = sharp(crop.from).extract(crop.region);
  pipe = crop.to.endsWith(".jpg")
    ? pipe.jpeg({ quality: 85, mozjpeg: true })
    : pipe.png({ compressionLevel: 9 });
  const info = await pipe.toFile(crop.to);
  manifest.push({ to: crop.to, width: info.width, height: info.height, kb: Math.round(info.size / 1024) });
}

console.table(manifest);

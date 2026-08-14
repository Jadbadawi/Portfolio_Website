# Visual asset inventory

Internal file — not linked from the public site. A complete audit of the
imagery in the three source repositories, with the placement decision for
each. Captions here and on the site are supported by the repository README
that references the figure; where a repository does not establish what an
image shows, it is **excluded** rather than captioned speculatively.

Layout codes: `hero` · `full` (full width) · `pair` (two-column comparison)
· `strip` (three across) · `gallery` (compact grid) · `inline` (with text)

---

## aerospace-cfd-fsi

Caption authority: `naca0012-airfoil/README.md` (§1–12) and
`turbine-fsi/README.md`, both of which reference every figure in context.

### Used

| File | Shows | Section | Layout |
|---|---|---|---|
| `naca0012-airfoil/05-cfd-reasoning-chain.png` | The ten-step CFD argument, physical problem → verification → validation, with feedback loops | Overview | `full` |
| `naca0012-airfoil/06-domain-and-boundary-conditions.png` | Fluid domain: velocity inlet (farfield1), pressure outlet (farfield2), no-slip upper/lower walls, V∞ at α = 10° | Problem & domain | `pair` L |
| `naca0012-airfoil/07-mesh-strategy.png` | Mesh strategy: 10 inflation layers at growth 1.2, sphere of influence r ≈ 3c at local size 0.05c, wake refinement, bidirectional edge bias | Meshing | `pair` R |
| `naca0012-airfoil/09-near-wall-velocity-laws.png` | u⁺ vs y⁺ — viscous law and log law, viscous sublayer and the 30 < y⁺ < 300 standard wall-function target band | Meshing / near-wall | `pair` L |
| `naca0012-airfoil/08-verification-vs-validation.png` | The distinction: verification (equations solved correctly) vs validation (equations describe reality) | V&V | `full` |
| `naca0012-airfoil/01-velocity-contours.png` | Velocity magnitude — stagnation, suction-surface acceleration to ~2×V∞, wake deficit | Aerodynamic results | `pair` L |
| `naca0012-airfoil/04-velocity-vectors.png` | Velocity vectors, flow turning around the leading edge | Aerodynamic results | `pair` R |
| `naca0012-airfoil/02-pressure-contours.png` | Pressure field — suction peak, trailing-edge recovery; little variation across the thin BL | Aerodynamic results | `full` |
| `naca0012-airfoil/03-turbulent-kinetic-energy.png` | TKE — boundary layer as a thin high-k sheet; doubles as a visual near-wall mesh check | Aerodynamic results | `pair` |
| `naca0012-airfoil/10-experimental-cp-reference.png` | **Experimental upper-surface Cp reference data only** (NASA), inverted axis. *Verified by inspection: this is the reference dataset, NOT a CFD-vs-experiment overlay — caption must not imply otherwise.* | Validation | `pair` R |
| `turbine-fsi/01-mesh.png` | 120° periodic sector mesh, refined toward blade surfaces | **Page hero** | `hero` |
| `turbine-fsi/02-rotor-velocity-vectors.png` | Blade velocity, stationary frame — linear Ωr from root to 98 m/s tip | Turbine results | `pair` L |
| `turbine-fsi/03-section-pressure-contours.png` | Sectional pressure — stagnation +199 Pa, suction peak −395 Pa | Turbine results | `pair` L |
| `turbine-fsi/04-section-velocity-vectors.png` | Sectional velocity vectors, accelerated flow over suction side up to 34.8 m/s | Turbine results | `pair` R |
| `turbine-fsi/06-fea-total-deformation.png` | Total deformation from mapped CFD pressure + centrifugal load; 0.405 m tip | FSI / structural | `full` |

### Excluded

None — every tracked figure in this repository is technically meaningful and
captioned by its README. (`.github/social-preview.png` is used only as the
project's Open Graph image, not as page content.)

---

## thin-ply-composite-analysis

Caption authority: root `README.md`, `manufacturing/README.md` (a per-image
table), and `figures/`/`results/figures/` naming.

### Used

| File | Shows | Section | Layout |
|---|---|---|---|
| `figures/01-manufacturing-process.jpg` | Three-panel composite: laid-up panel, vacuum-bagged assembly, autoclave curing system | **Page hero** | `hero` |
| `figures/00-laminate-architectures.png` | The four architectures — dispersed/blocked × QI/DD, with layup codes | Research question | `full` |
| `manufacturing/images/layup-process.jpeg` | Hand layup of spread-tow thin-ply prepreg | Manufacture | `strip` |
| `manufacturing/images/vacuum-bagging.jpeg` | Panel bagged for debulking and cure | Manufacture | `strip` |
| `manufacturing/images/autoclave-open-with-panel.png` | Autoclave loaded, before cure | Manufacture | `strip` |
| `manufacturing/images/cured-panel-surface-defects.png` | Cured panel with surface wrinkling visible across the plate | Manufacture / defects | `pair` L |
| `manufacturing/images/wrinkles-after-debulking.jpeg` | Wrinkling present after the debulk step | Manufacture / defects | `gallery` |
| `manufacturing/images/wrinkles-on-positive-angles.jpeg` | Wrinkling concentrated on positive-angle plies | Manufacture / defects | `gallery` |
| `manufacturing/images/fibre-separation.jpeg` | Fibre separation in the spread-tow material | Manufacture / defects | `gallery` |
| `manufacturing/images/ply-repair-overlay.jpeg` | Second ply laid over a broken one as a repair | Manufacture / defects | `gallery` |
| `manufacturing/images/specimen.png` | Cut coupon | Testing | `strip` |
| `manufacturing/images/instron-rig-with-video-gauge.png` | Instron rig, hydraulic grips, video gauge on tripod | Testing | `pair` |
| `manufacturing/images/tensile-test-setup.png` | Coupon mounted for test | Testing | `strip` |
| `figures/03-fe-model-bcs-path.png` | FE model: one end fixed, other pulled to Ux = 1 mm, mid-length extraction path across the width | FE model | `pair` L |
| `figures/04-fe-mesh-detail.png` | All 32 plies discretely meshed through the thickness | FE model | `pair` R |
| `figures/05-interlaminar-components.png` | The three interlaminar components S33 (peel), S13, S23 at the central same-angle interface | FE model | `full` |
| `figures/06-free-edge-s33.png` | \|S33\| across coupon width, all four laminates — interior stress-free, excursion in the last ~1 mm | FE results | `pair` L |
| `figures/07-free-edge-profile-qi.png` | QI blocked, signed S33 vs width: flat interior, steep excursion at each free edge (±175 MPa) | FE results | `pair` R |
| `figures/10-stress-strain-qi-vs-dd.png` | Mean stress–strain, QI vs DD, with specimen scatter bands | Results | `full` |
| `figures/08-clt-critical-ply-strain.png` | Back-calculated critical local ply ε₁ at failure vs the 1.5 % reference | Results | `pair` L |
| `figures/09-failure-stress-vs-ref.png` | Failure stress against reference values | Results | `pair` R |
| `results/figures/statistics/failure_strain_rawp_heatmap.png` | **Raw** (uncorrected) pairwise Welch p-values, failure strain | Statistics | `pair` L |
| `figures/12-holm-pvalue-heatmap.png` | **Holm-adjusted** Welch p-values, failure strain — the corrected view of the same comparisons | Statistics | `pair` R |
| `figures/11-sem-fractography.jpg` | QI/DD fracture surfaces + magnified cross-sections across ply orientations | Fractography | `hero`, `full` |

The raw-vs-Holm pairing is deliberate: it shows the correction doing its
work, which is the paper's central argument.

### Excluded

- `manufacturing/images/photo-2026-03-01.jpeg`, `photo-2026-03-02.jpeg`,
  `photo-58d15043.png`, `photo-7c7b9328.png` — `manufacturing/README.md`
  explicitly states their subject "has not been positively identified".
  Cannot be captioned truthfully.
- `manufacturing/images/araldite-adhesive.jpeg` — captioned in the repo but
  a product shot; no engineering information for a portfolio reader.
- `manufacturing/images/vacuum-bagging-detail.png`,
  `ply-repair-after.jpeg` — near-duplicates of images already used.
- `archive/**` — superseded drafts and earlier figure versions, by definition
  not the reported results.
- `results/figures/free-edge/*` (≈40 files) — per-component and
  per-laminate variants; `figures/` already holds the curated selection the
  README itself uses.
- `results/figures/tensile/**` per-specimen curves — the mean comparison is
  the meaningful view; individual traces are data, not narrative.
- Statistics heatmaps for failure force / max stress — see the discrepancy
  note in `content-sources.md`; the site follows the README's failure-strain
  framing.

---

## blood-transport-uav

Caption authority: root `README.md` (per-image `<sub>` captions),
`figures/README.md` (figure index), and `docs/0*.md`.

### Used

| File | Shows | Section | Layout |
|---|---|---|---|
| `figures/cad/uav-assembly-front.png` | Full vehicle, front view | **Page hero** | `hero` |
| `figures/cad/uav-assembly-iso.png` | Full-vehicle CAD assembly, isometric | Homepage card only | `card` |
| `figures/cad/uav-assembly-side.png` | Full vehicle, side view | The aircraft | `full` |
| `figures/requirements-extract.png` | Extract from the requirements traceability matrix | Requirements | `inline` |
| `figures/cad/downselection-criteria.png` | Pairwise criteria weighting feeding the MCDA | Concept selection | `pair` L |
| `figures/cad/downselection-rejected.png` | The rejected concepts, kept deliberately | Concept selection | `pair` R |
| `figures/cad/parts-catalogue.png` | The ten delivered flight parts | Design | `full` |
| `figures/cad/emp-fus-joint-exploded.png` | Empennage–fuselage joint, exploded | Design | `pair` L |
| `figures/cad/emp-fus-joint-part.png` | The same joint as a single part; brass inserts take the fasteners | Design | `pair` R |
| `figures/cad/aluminium-strap.png` | Formed 2014A-T3 aluminium strap protecting the *upper* half of the wing joint | Design / load path | `pair` L |
| `figures/cad/mwp-clamp-counterbore.png` | Lower clamp counterbore — no metal protection, bolt bears directly on PLA | Design / load path | `pair` R |
| `figures/cad/fus-mwp-fairing.png` | Fus-MWP fairing, shaped to the wing's NACA 2414 section | Fairings | `pair` L |
| `figures/cad/fus-mwp-fairing-planform.png` | Fairing planform | Fairings | `pair` R |
| `figures/cad/fairing-assembly-front.png` | Fairing assembly, front | Fairings | `pair` L |
| `figures/cad/fairing-assembly-rear.png` | Fairing assembly, rear | Fairings | `pair` R |
| `figures/structures/centre-of-mass-calculation.png` | Centre-of-mass calculation across subassemblies: 0.369 m | Analysis | `pair` L |
| `figures/structures/torsion-calculation.png` | Root torsion: 375 N·mm at 1g, 3375 N·mm at 9g | Analysis | `pair` R |
| `figures/charts/reserve-factors.png` | All eight reserve factors, critical member highlighted | Analysis | `pair` L |
| `figures/charts/mass-budget.png` | Subassembly mass by part, structural vs aerodynamic | Analysis | `pair` R |
| `figures/charts/fairing-mass-benchmark.png` | Fairing mass against the two competing companies (3.1× lightest) | Analysis | `inline` |
| `figures/charts/aerofoil-prediction-vs-test.png` | XFoil vs tunnel, CL,max and CD,min, clean and 30° flap | Aerodynamics | `pair` L |
| `figures/charts/tunnel-drag-vs-aoa.png` | Fuselage drag vs AoA with the 0° repeat scatter | Aerodynamics | `pair` R |
| `figures/aero/drag-polar-xfoil-clean.png` | XFoil drag polar, clean | Aerodynamics | `gallery` |
| `figures/aero/drag-polar-tunnel-clean.png` | Tunnel drag polar, clean | Aerodynamics | `gallery` |
| `figures/aero/drag-polar-xfoil-flap30.png` | XFoil drag polar, 30° flap | Aerodynamics | `gallery` |
| `figures/aero/drag-polar-tunnel-flap30.png` | Tunnel drag polar, 30° flap | Aerodynamics | `gallery` |
| `figures/testing/tunnel-fairing-cutout.png` | Vertical cutout added for tunnel mounting clearance | Aerodynamics / test bias | `pair` L |
| `figures/testing/tunnel-exposed-spar.png` | Exposed spar section, fairing flanks open with no wings fitted | Aerodynamics / test bias | `pair` R |
| `figures/testing/trial-assembly-airframe.png` | The practice build (cropped for privacy — see repo note) | Test campaign | `pair` |
| `figures/testing/ultimate-load-test-station.png` | Load test station, 5 Mar 2025, LabVIEW deflection channels (face blurred for privacy) | Test campaign | `full` |
| `figures/charts/load-deflection.png` | Load vs deflection with fitted stiffness, 74 / 102 N/mm | Test results | `pair` R |
| `figures/testing/clamp-shear-damage-1.png` | Bolt shear-out through the PLA main-wing clamp | Failure | `strip` |
| `figures/testing/clamp-shear-damage-2.png` | Second view of the same damage | Failure | `strip` |
| `figures/testing/clamp-shear-damage-detail.png` | Detail: wing nut pulled into the counterbore cavity | Failure | `strip` |
| `figures/pm/work-breakdown-structure.png` | Work breakdown structure | Contribution / PM | `pair` L |
| `figures/pm/gantt-design-build-phase.png` | Design and build phase Gantt (weeks 7–17) | Contribution / PM | `pair` R |
| `figures/pm/network-diagram-company.png` | Company fuselage-division network diagram | Contribution / PM | `pair` L |
| `figures/pm/risk-rating-matrix.png` | Risk rating matrix | Contribution / PM | `pair` R |

The failure sequence gets a three-image strip plus prominent placement:
per the brief, the unpredicted failure is the most valuable engineering
content in the project.

### Excluded

- `figures/structures/load-deflection-original.png` — the pre-digitisation
  source of `charts/load-deflection.png`; kept in the repo for checking, but
  redundant on the site.
- `figures/structures/subassembly-mass-table.png`,
  `company-weight-comparison.png`, `figures/aero/tunnel-run-data-table.png`
  — raw table screenshots, superseded by the generated charts.
- `figures/pm/gantt-full-year.png`, `network-diagram-team.png`,
  `risk-register.png` — PM material beyond the two-of-each already shown;
  diminishing returns on an engineering portfolio.
- `cad/**` (535 Inventor native files) — source geometry, not images.
- `reference/*.pdf`, `docs/*.pdf` — documents, linked not embedded.

---

## Profile README repository

No images. Text only; used for positioning copy (see `content-sources.md`).

## Global rules applied

1. **No duplicate placement** — an image used as a card is not repeated as
   that project's hero, and heroes are not repeated in the body.
2. **Plots are never cropped.** Contour plots, graphs and diagrams render
   complete on a white plate. Only photographs are cropped, and only for
   cards.
3. **Every technical figure is clickable** into a lightbox at full source
   resolution, because a recruiter should be able to read the axes.
4. **Captions state what the figure shows**, sourced from the repository —
   never "this is a cool CFD image", never an inference the repo does not
   support.

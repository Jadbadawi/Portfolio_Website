# Content provenance

Internal file — not linked from the public site. Every factual claim on the
site traces to one of the sources below. If a claim cannot be traced, remove
it. When editing site copy, keep this file current.

Local clones at the time of writing (paths differ from repo names):

| Repository | Local clone |
|---|---|
| `github.com/Jadbadawi/aerospace-cfd-fsi` | `~/Documents/Simulation` |
| `github.com/Jadbadawi/thin-ply-composite-analysis` | `~/Documents/rp3` |
| `github.com/Jadbadawi/blood-transport-uav` | `~/UAV` |
| `github.com/Jadbadawi/Jadbadawi` (profile README) | `~/Documents/Jadbadawi` |

## Global / identity

| Claim | Source |
|---|---|
| Name, positioning ("aerospace engineer working on computational engineering…") | Profile README, opening lines |
| BEng Aerospace Engineering, University of Bristol | Profile README (deliberate decision: the "MEng" in `blood-transport-uav/docs/my-contribution.md` is a known error — do **not** copy it) |
| Incoming MSc Advanced Computational Methods…, Imperial College London | Profile README |
| Toolset list (ANSYS Fluent · Abaqus · MATLAB · Python · C++ · SYCL · FPGA) | Profile README |
| "Trustworthy, not just converged" framing | Profile README, paragraph 2 |
| FPGA clustering acceleration (in progress, unpublished) | Profile README, "In progress" section |
| Contact email | Public git commit metadata on all three repositories |
| LinkedIn | **Not available anywhere public** — config field left empty, do not guess |

## Homepage capabilities section (`src/lib/capabilities.ts`)

Every line maps to the "Skills demonstrated" table in
`aerospace-cfd-fsi/README.md`, the methods sections of
`thin-ply-composite-analysis/README.md`, or the Tools section of
`blood-transport-uav/README.md`.

## Aerospace CFD & FSI (`src/lib/projects/aerospace-cfd-fsi.ts`)

| Claim | Source (in `aerospace-cfd-fsi`) |
|---|---|
| CL ≈ 1.06 vs experiment 1.07–1.08, 1.4 % low; thin-aerofoil 1.097 | `README.md` §1 Validation |
| Gregory & O'Reilly / Ladson comparison at matched Re and incidence | `README.md` §1 Validation |
| Mass imbalance 10⁻⁷; residuals ≈10⁻⁶; y⁺ audit; six-case verification matrix | `README.md` §1 verification list; `naca0012-airfoil/README.md` §14.2 |
| `preanalysis.py` capabilities | `README.md` §2; `tools/preanalysis.py` |
| Rotating frame, 120° periodic sector, SST k–ω, orthotropic shell | `README.md` §3 |
| Tip speed 98.05 vs 98.12 m/s (0.07 %), rotor 44.2 m | `README.md` §3 Fluid domain |
| Stagnation +199 Pa, suction −395 Pa | `README.md` §3 Sectional aerodynamics |
| Longitudinal stiffness 15× transverse; tip deflection 0.405 m; 0.92 % of radius | `README.md` §3 Structural response |
| Root reaction 1,576.3 kN hand vs 1,578.1 kN ANSYS (0.116 %); blade 22,473 kg, c.m. 14.232 m | `README.md` §3 Structural response |
| Cp ≈ 0.141 not converged, still moving at 7.7 M cells; all other limitations | `README.md` §3 Limitations |
| Course context (CornellX ENGR2000X, ANSYS 2026 R1, summer 2026) | `README.md` header |
| All six images | `naca0012-airfoil/` and `turbine-fsi/` figure files (names preserved in `scripts/import-images.mjs`) |

## Thin-Ply Composite Analysis (`src/lib/projects/thin-ply-composite-analysis.ts`)

| Claim | Source (in `thin-ply-composite-analysis`) |
|---|---|
| Research question wording | `README.md` "Research question" |
| TC33/K51, 0.03 mm plies, four 32-ply laminates, 0.96 mm, layup table | `README.md` "What was done" |
| Identical A matrices asserted by test | `README.md`; `tests/test_clt.py` |
| Instron 1342 + video gauge; untabbed after tab failures | `README.md` "Manufacturing and testing" |
| Ply-by-ply 3D FE model, extraction path, S13/S23/S33 at central interface | `README.md` "3D free-edge finite element model" |
| O'Brien G = 45–254 J/m² vs Gc ≈ 200–500 J/m², three of four below | `README.md` Results / Key findings |
| Failure strains 1.41–1.53 %, stresses 496–538 MPa; QI–DD difference does not survive Holm | `README.md` Key findings |
| CLT critical ply strain: QI 1.42 % vs 1.5 % ref; DD 1.16 % | `README.md` "What it says about the coupons" |
| SEM: QI matrix-dominated at 90° ply; DD fibre fracture all orientations | `README.md` Key findings + Fractography |
| Grip-failure caveat → comparative interpretation | `README.md` caveat block |
| 65 automated tests and what they assert | `README.md` Tests section |
| Compression allowables placeholder; collaborator (Jason Wong) data credit | `README.md` "Notes on tracked content" (site copy says "a collaborator" — repo names him) |
| Supervisor, unit code, 2025–26 | `README.md` header |
| All images | `figures/` and `manufacturing/images/` (mapping in `scripts/import-images.mjs`) |

## Blood-Transport UAV (`src/lib/projects/blood-transport-uav.ts`)

| Claim | Source (in `blood-transport-uav`) |
|---|---|
| Brief, 60 students / 3 companies / 1 year; team scope | `README.md` "The brief" |
| Four roles; authored PM + Aero + downselection/subassembly sections | `README.md`; `docs/my-contribution.md` |
| 813 N survived; 74 / 102 N/mm linear; RF table (1.95…39.0) | `README.md` "Results at a glance", "Structural analysis" |
| 1,011 g / ten flight parts / 100 % AM; 269 g load path vs 742 g shell | `README.md` stats + "Where the mass went" |
| PLA commitment trade-off; nose cone could have been foam | `README.md` "Where the mass went" |
| NACA 2414 fairing; Cayley / 10× cylinder drag argument; wetted-area trade | `README.md` fairing section; `docs/05-aerodynamics.md` |
| Re 4.1×10⁵, M 0.058; XFoil vs tunnel table and interpretation | `README.md` "Aerodynamics" |
| Fairing delta 0.09 N vs σ = 0.34 N (7 repeats), inconclusive; tunnel bias (no wings, cutout) | `README.md` "Did the fairings work?" |
| Load-drop sequence 813→804→764 N; centre bar undamaged; bolt shear-out through PLA clamp | `README.md` "Then it failed somewhere else" |
| Scoping failure + wrong-clamp configuration cause | `README.md` "Two causes" |
| Design freeze, network diagrams, 48 vs 105 h critical path, post-meeting reflections | `docs/my-contribution.md` |
| 535-file CAD assembly takeover | `docs/my-contribution.md` "Taking over the company CAD assembly" |
| 6g × 1.5 load case | `README.md` "Structural analysis" |
| All images | `figures/` (mapping in `scripts/import-images.mjs`) |

## Known discrepancies (do not resolve silently)

Recorded during the July 2026 repository overhaul; flagged to Jad, unresolved:

1. `thin-ply-composite-analysis`: the README says the QI–DD difference did not
   survive Holm correction, but `results/figures/statistics/max_stress_holm_heatmap.png`
   shows dispersed-QI vs blocked-DD at p = 0.005 for max stress. The site follows
   the README wording (failure-strain framing) and shows the failure-strain heatmap.
2. `blood-transport-uav`: README says "10 flight parts";
   `analysis/data/subassembly_mass.csv` has 9 structural parts + 5 fastener line
   items. The site follows the published README (10).

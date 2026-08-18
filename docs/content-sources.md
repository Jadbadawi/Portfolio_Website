# Content provenance

Internal file, not linked from the public site. Every factual claim on the
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
| BEng Aerospace Engineering, University of Bristol | Profile README (deliberate decision: the "MEng" in `blood-transport-uav/docs/my-contribution.md` is a known error, so do **not** copy it) |
| Incoming MSc Advanced Computational Methods…, Imperial College London | Profile README |
| Toolset list (ANSYS Fluent · Abaqus · MATLAB · Python · C++ · SYCL · FPGA) | Profile README |
| "Trustworthy, not just converged" framing | Profile README, paragraph 2 |
| FPGA clustering acceleration (in progress, unpublished) | Profile README, "In progress" section |
| Contact email | Public git commit metadata on all three repositories |
| LinkedIn | Supplied directly by Jad (15 Aug 2026): `https://www.linkedin.com/in/jad-el-badaoui` |

## Homepage capabilities section (`src/lib/capabilities.ts`)

Every line maps to the "Skills demonstrated" table in
`aerospace-cfd-fsi/README.md`, the methods sections of
`thin-ply-composite-analysis/README.md`, or the Tools section of
`blood-transport-uav/README.md`.

## Aerospace CFD & FSI (`src/lib/projects/aerospace-cfd-fsi.ts`)

| Claim | Source (in `aerospace-cfd-fsi`) |
|---|---|
| CL ≈ 1.06 vs experiment 1.07 to 1.08, 1.4 % low; thin-aerofoil 1.097 | `README.md` §1 Validation |
| Gregory & O'Reilly / Ladson comparison at matched Re and incidence | `README.md` §1 Validation |
| Mass imbalance 10⁻⁷; residuals ≈10⁻⁶; y⁺ audit; six-case verification matrix | `README.md` §1 verification list; `naca0012-airfoil/README.md` §14.2 |
| `preanalysis.py` capabilities | `README.md` §2; `tools/preanalysis.py` |
| Rotating frame, 120° periodic sector, SST k-ω, orthotropic shell | `README.md` §3 |
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
| O'Brien G = 45 to 254 J/m² vs Gc ≈ 200 to 500 J/m², three of four below | `README.md` Results / Key findings |
| Failure strains 1.41 to 1.53 %, stresses 496 to 538 MPa; QI vs DD difference does not survive Holm | `README.md` Key findings |
| CLT critical ply strain: QI 1.42 % vs 1.5 % ref; DD 1.16 % | `README.md` "What it says about the coupons" |
| SEM: QI matrix-dominated at 90° ply; DD fibre fracture all orientations | `README.md` Key findings + Fractography |
| Grip-failure caveat → comparative interpretation | `README.md` caveat block |
| 65 automated tests and what they assert | `README.md` Tests section |
| Compression allowables placeholder; collaborator (Jason Wong) data credit | `README.md` "Notes on tracked content" (site copy says "a collaborator"; the repo names him) |
| Supervisor, unit code, 2025/26 | `README.md` header |
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

## Waxwing Airbrake Aerodynamics (`src/lib/projects/waxwing-airbrake-aerodynamics.ts`)

**No repository.** This is HyPower Bristol society work, not a public repo, so
`githubUrl` is omitted (the field was made optional for this project). The local
archive is `~/Documents/portfolio/HYpower`, assembled and labelled 18 Aug 2026;
start at `00-START-HERE.md`.

Three primary sources, referred to below as:

| Short name | What it is |
|---|---|
| **Report** | `01-Technical-Report/Team16_Waxwing_EuRoC2025_TechnicalReport.pdf`. Printed page N is PDF page N+3. Section attribution is mapped in `01-Technical-Report/README_my-sections.md`. |
| **Manuals** | Three Star-CCM+ setup manuals Jad wrote, Aug 2025, `03-CFD-Method-Manuals/`. |
| **Raw** | Convergence and residual CSVs, `02-CFD-Airbrake-Sweep/results/`. |

| Claim | Source |
|---|---|
| EuRoC 2025, 3 km Liquid category, BristolSEDS, SRAD bi-propellant | Report, printed p2 (Introduction) |
| Peak Mach 0.9, apogee near 3850 m, brakes deploy to 150 m/s | Report, Appendix I.2 printed p151 and the trajectory figures |
| Cap at 100 m/s because compressibility matters above Mach 0.3 | Report, Appendix I.2 printed p151, stated as a scoping decision |
| Slot vs petal comparison, and the flap-count-equals-fin-count constraint | Report, section 4.2.1 printed p20 to p21 |
| Domain 24 × 12 × 12 m; 72.7 / 36.4 / 36.4 radii; base 48.5 radii from outlet | Report, Appendix I.2 printed p152 |
| Trimmed cell + prism layer + surface remesher; base 4.0 m; 16 layers; stretch 1.5 | Report Appendix I.2 printed p153, corroborated by all three Manuals |
| Prandtl-Schlichting 47.2 mm boundary layer sizing the prism stack | Report, Appendix I.2 printed p153 |
| Realizable two-layer k-epsilon; all y+ rationale; when NOT to use it | Manual 3, section 4 (the fullest statement); Report Appendix I.2 printed p156 |
| Segregated solver, 1000 iterations, residuals 1e-7 to 1e-10 | Report Appendix I.2 printed p158; **Raw** residual CSV confirms 1000 iterations |
| 25 Cd values in the results table | **Read off the plotted figure** in Report Appendix I.2 printed p159. See caveat below. |
| 1.7× stat (0.270 / 0.162 at 100 m/s) | Derived from the same plotted figure; inherits the caveat below |
| Local Re order 1e7, transition at x ≈ 0.075 m | Report, Appendix I.2 printed p156 figure |
| Boundary layer 0.0408 m vs 0.047 m predicted | Report, Appendix I.2 printed p160 figure |
| y+ around 10 at 80 m/s, 100 % deployed | Report, Appendix I.2 printed p159 to p160 |
| Two recirculation regions; flow reattached before the fins | Report, Appendix I.2 printed p160 to p161 |
| Hybrid section, NACA LE to 0.3c then wedge; rationale | Report, section 4.2.2 printed p21 to p22 |
| Cd table: hybrid vs NACA at 10/12/14 % | Report, section 4.2.2 printed p22, Table 6 |
| MATLAB panel method cross-check | Report, section 4.2.2 printed p23 |
| MCDA weighted scores (3.7 / 3.4 / 3.4 / 3.3 / 2.6); elliptical lost on manufacturability | Report, Appendix I.3 printed p163 to p164 |
| Three fins, not four, to reduce airbrake wake / fin interaction | Report, section 4.2.2 printed p23 |
| [-45, 0, 45] triaxial layup | Report, section 4.1.3 printed p16 |
| 146 kPa equivalent pressure; Mach 0.9, 850 m, 15 deg AoA | `05-Fin-Structural-FEA/Fin_Pressure_Load_Calculation_146kPa.docx`. See caveat below. |
| Six modelling limitations (panel gaps, petal gap, tri-tangent tips, exhaust hole, smooth surfaces) | Report, Appendix I.2 printed p151 to p152, written by Jad at the time |
| Wind tunnel campaign designed: scaled model, instrumentation, 11-configuration matrix | Report, Appendix I.1 printed p146 to p148 |
| Hero (total pressure), card (fin render) | `02-CFD-Airbrake-Sweep/results/` and `04-Fin-Design-and-Downselection/` |
| All other figures | Extracted from the Report PDF with PyMuPDF at native embedded resolution; mapping in `07-Report-Figures/README.md` |

### Caveats specific to this project

1. **The 25 drag coefficients were read off a plotted figure, not a data file.**
   The raw sweep results are not in Jad's possession. The site says so in the
   table caption. Replace with real numbers if they are recovered, and re-plot
   the figure at full resolution while doing it.
2. **The fin load derivation has a unit inconsistency.** It gives span 230 and
   planform area 3457 without units, and those do not produce the stated aspect
   ratio of 15.3. The site therefore states the 146 kPa result and the flight
   condition, and does **not** reproduce the aspect ratio or lift curve slope.
   Resolve before adding them.
3. **Verified, not validated.** No wind tunnel or flight data was available.
   The site's limitations note says this explicitly. Do not soften it.
4. **Team attribution.** The report carries no bylines. Section attribution in
   `README_my-sections.md` is inferred by matching subject matter against Jad's
   LinkedIn and against the working files he holds. The `role` field on the page
   states the scope of his part and names what was other people's work.
5. **Deliberately not claimed.** A Python tool mapping the CFD pressure field
   onto the Abaqus fin model appears on Jad's LinkedIn, but no such file exists
   anywhere on his machine and no output from it survives. It is **not** claimed
   on the site, and it was removed from LinkedIn on 18 Aug 2026 pending recovery.
   If the tool is found, this is the strongest addition the page could take.

## Known discrepancies (do not resolve silently)

Recorded during the July 2026 repository overhaul; flagged to Jad, unresolved:

1. `thin-ply-composite-analysis`: the README says the QI vs DD difference did not
   survive Holm correction, but `results/figures/statistics/max_stress_holm_heatmap.png`
   shows dispersed-QI vs blocked-DD at p = 0.005 for max stress. The site follows
   the README wording (failure-strain framing) and shows the failure-strain heatmap.
2. `blood-transport-uav`: README says "10 flight parts";
   `analysis/data/subassembly_mass.csv` has 9 structural parts + 5 fastener line
   items. The site follows the published README (10).

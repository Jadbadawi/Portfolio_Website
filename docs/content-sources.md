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
| NACA 0012 finite-volume solver | **Superseded 24 Aug 2026.** The solver is finished and now has its own project page (`naca-cfd-solver`), so the "In progress" card was emptied and the About paragraph moved to the past tense. `~/Documents/cfdshit` is coursework driving a *provided* solver binary and is still not this project; do not cite it as evidence. |
| FPGA clustering acceleration (still true, no longer the headline) | Profile README, "In progress" section. Retained in the About paragraph and in `capabilities.ts`; it no longer occupies the in-progress card. |
| Contact email | Public git commit metadata on all three repositories |
| LinkedIn | Supplied directly by Jad (15 Aug 2026): `https://www.linkedin.com/in/jad-el-badaoui` |
| The two published CVs (`public/Jad-El-Badaoui-CV-Structures.pdf`, `public/Jad-El-Badaoui-CV-Flight-Physics.pdf`) | Copied from `~/Documents/airbus-cvs`, from `Jad_El_Badaoui_Airbus_Structures_CV_FINAL.pdf` and `Jad_El_Badaoui_Airbus_Flight_Physics_FINAL_v2.pdf`. That folder holds five candidates; these two were selected because each file's own header comment states it supersedes the others, and **Jad confirmed on 20 Aug 2026 that they are the correct versions**. Re-confirm when replacing either, because the filenames in that folder do not make the newest obvious. |

### Claims the CVs make that the site does not

Both CVs state a First Class BEng and cohort-topping marks in Aerodynamics
(95%) and Engineering Mathematics (94%). None of that appears anywhere on
the site. It is not an oversight to correct silently: it is unverified
against any document held here, and it belongs on the site only once Jad
supplies it deliberately. Flagged to him 20 Aug 2026.

## Homepage capabilities section (`src/lib/capabilities.ts`)

Every line maps to the "Skills demonstrated" table in
`aerospace-cfd-fsi/README.md`, the methods sections of
`thin-ply-composite-analysis/README.md`, or the Tools section of
`blood-transport-uav/README.md`.

## Wind Turbine Aero-Structural Simulation (`src/lib/projects/wind-turbine-aero-structural.ts`)

Split out of the former combined `aerospace-cfd-fsi` project in August 2026,
along with the NACA 0012 study below. `next.config.ts` permanently redirects
`/projects/aerospace-cfd-fsi` to this page.

Three sources, referred to below as:

| Short name | What it is |
|---|---|
| **Repo** | `github.com/Jadbadawi/aerospace-cfd-fsi`, local clone `~/Documents/Simulation`; the turbine write-up is `turbine-fsi/README.md`. |
| **Notes** | Two engineering study notes written from the course material: `~/Documents/summer 2026/Wind_Turbine_CFD_FSI_Complete_Workflow_Verification_Validation.docx` (part 1, CFD) and `..._FEA_Part2_...docx` (part 2, structural). |
| **Archive** | The saved ANSYS Workbench project, `~/Documents/summer 2026/turbine_files/`. Raw solver output, not a write-up. |

| Claim | Source |
|---|---|
| 12 m/s wind, 2.22 rad/s, 43.2 m blade + 1 m hub offset, R = 44.2 m | Notes part 1 §1.3 |
| Tip speed 98.12 m/s by hand vs 98.05 m/s in CFD-Post (0.07 %); λ = 8.18 | Notes part 1 §7.1 and §1.3 |
| Swept area 6,137.5 m², wind power 6.496 MW | Notes part 1 §1.3 |
| Steady incompressible pressure-based RANS, SST k-ω, coupled scheme, 10⁻⁶ residual target | Notes part 1 §6 and Appendix A |
| Rotating-frame source terms Ω×(Ω×r) and 2Ω×u_rel; no Euler term at constant Ω | Notes part 1 §3.3 |
| 120° rotational periodic interface; vectors rotated rather than copied | Notes part 1 §4.1 to §4.3 |
| Periodic faces arrive as walls and must be converted, else the blade runs in a duct | Notes part 1 §4.3 step 6; Repo `turbine-fsi/README.md` §5 |
| **367,691 cells, 65,956 nodes, 5,108 blade wall faces** | Archive, `dp0/FFF/Fluent/Solution.trn` mesh-read log. Jad's own run, not the tutorial's nominal figure. |
| One-blade torque 137,115 N·m, 0.913 MW, Cp = 0.141 | Notes part 1 §7.2. **Supplied course result**, not an independent extraction, and the page says so. |
| Cp not mesh independent, still moving toward multi-million-cell meshes; Betz 0.5926 | Notes part 1 §5.4, §7.4, §12 |
| Manufacturer-scale Cp ≈ 0.30 is a plausibility check, not validation, and why | Notes part 1 §7.3 and §10.1 |
| Stagnation +199 Pa, suction −395 Pa; sectional velocity to 34.8 m/s | Read off the figures themselves (`section-pressure.png` and `section-velocity.png` colourbars) |
| **Iteration history, and the 0.41 % drift over the final 100 iterations** | Archive, `dp0/FFF/Fluent/report-def-0-rfile.out`, copied verbatim to `scripts/data/turbine-blade-pressure-monitor.out` and plotted by `scripts/make-turbine-plots.mjs`. Jad's own run. |
| One-way coupling: pressure crosses, deformation does not; interpolation between non-matching meshes | Notes part 1 §11.1 and part 2 §1 |
| Force and moment conservation across the transfer **not yet checked** | Notes part 1 §11.4 and part 2 §11.2, both listing it as required and outstanding |
| Skin 0.100 to 0.005 m, spar 0.100 to 0.030 m, both linear | Notes part 2 §2 thickness table |
| E₁ 113.75 GPa, E₂ = E₃ 7.583 GPa, ρ 1550 kg/m³, and the material-axis warning | Notes part 2 §3 |
| **4,831 SHELL181 elements, 4,673 nodes, 27,912 equations, all six root DOF constrained** | Archive, `dp0/SYS/MECH/solve.out`. Jad's own run; Notes part 2 §7 quotes the tutorial's nominal "about 4,000". |
| Blade mass 22,473 kg, c.m. 14.232 m, F = mΩ²r = 1,576.3 kN | Notes part 2 §9 |
| Root radial reaction 1,578.1 kN from ANSYS, 0.116 % difference | Notes part 2 §11.3 |
| Tip deflection 0.405 m, 0.92 % of rotor radius | Jad's own ANSYS contour, `wind-turbine-aero-structural/fea-deformation.png`, reading 0.40524 m max, dated 27 Jul 2026. See caveat 1. |
| Max equivalent stress ≈ 33.36 MPa at the spar-skin junction; UTS 537 MPa; ratio ≈ 16 | Notes part 2 §10. **Supplied course result**; no independent contour exists. See caveat 2. |
| Von Mises is not a composite failure criterion; Tsai-Hill, Tsai-Wu, Hashin needed | Notes part 2 §10 composite-strength warning |
| Every limitation in "What the model does not yet prove" | Notes part 1 §12, part 2 §4 and §12; Repo `turbine-fsi/README.md` limitations |
| Every item in "The next verification campaign" | Notes part 1 §12.1 and part 2 §13. **All unrun.** |
| ANSYS Student licence caps mesh size | Repo `turbine-fsi/README.md` limitations; the solver watermark on every figure |
| Course context (Cornell and ANSYS module, ANSYS 2026 R1, summer 2026) | Repo `README.md` header; stated on the page as a provenance note |
| Figures `mesh`, `rotor-vectors`, `section-pressure`, `section-velocity`, `fea-deformation` | Repo `turbine-fsi/` (mapping in `scripts/import-images.mjs`) |
| `convergence-monitor.png` | Generated by `scripts/make-turbine-plots.mjs` from the archive data above |
| `card.png` | 16:9 crop of `rotor-vectors.png` (region in `scripts/import-images.mjs`) |
| `og.png` | Generated by `scripts/make-og-projects.mjs` |

### Caveats specific to this project

1. **The 0.405 m tip deflection is not in either study note.** Notes part 2
   §12 explicitly records that no numeric tip deformation was supplied, and
   leaves the one-way-coupling adequacy check outstanding for want of one.
   The number comes from Jad's own ANSYS Mechanical solve and is legible in
   the committed contour image, so it is kept, and the page attributes the
   deflection to the model rather than to the course. If the result file is
   ever lost, that image is the evidence.
2. **The 33.36 MPa stress has no corresponding image in Jad's possession.**
   It is quoted from the study note, which took it from the supplied course
   material. The page frames it as "the supplied structural results give".
   Re-run and screenshot it before presenting it as an own result.
3. **Two mass values disagree by 0.2 %.** The study note gives 22,473 kg, and
   that value reproduces the quoted 1,576.3 kN exactly; the archive's
   `solve.out` reports 22,519 kg, which would give 1,579.6 kN. The page uses
   the note's pair (22,473 kg giving 1,576.3 kN) because they are internally
   consistent with the published 0.116 % comparison. Worth resolving.
4. **The archived structural solve had large deflection enabled.**
   `solve.out` line 438 reads "NONLINEAR GEOMETRIC EFFECTS . . . ON", and it
   converged in four equilibrium iterations. The study notes list enabling
   large deflection as future work. Because the archived solve (25 Jul)
   predates the deformation screenshot (27 Jul), it cannot be proven they are
   the same run, so the page claims neither that the analysis was
   geometrically nonlinear nor that enabling it is outstanding. Confirm, then
   state it: it counts in Jad's favour.
5. **Torque, power and Cp are the course's numbers.** Jad's own run monitored
   integral blade pressure, not torque. If torque is re-extracted from the
   archive, the page can drop the "supplied course result" framing.
6. **Not validated.** No matched experimental dataset exists for this
   turbine. Do not soften the verification and validation box.

## NACA 0012 Aerofoil (`src/lib/projects/naca0012-aerofoil.ts`)

| Claim | Source (in `aerospace-cfd-fsi`) |
|---|---|
| CL ≈ 1.06 vs experiment 1.07 to 1.08, 1.4 % low; thin-aerofoil 1.097 | `README.md` §1 Validation |
| Gregory & O'Reilly / Ladson comparison at matched Re and incidence | `README.md` §1 Validation |
| Mass imbalance 10⁻⁷; residuals ≈10⁻⁶; y⁺ audit; six-case verification matrix | `README.md` §1 verification list; `naca0012-airfoil/README.md` §14.2 |
| `preanalysis.py` capabilities (the Python entry in the tool list) | `README.md` §2; `tools/preanalysis.py` |
| 10°, Re 6×10⁶, 1 m chord, 51.45 m/s, 12.5c far field, ≈27,000 cells | `naca0012-airfoil/README.md` case definition and §8 |
| Wall functions inconsistent with much of the y⁺ field; drag unreliable | `naca0012-airfoil/README.md` §12.3 and §14.1 scorecard |
| Poor trailing-edge cell orthogonality and aspect ratio | `naca0012-airfoil/README.md` §14.1 scorecard |
| Domain and grid independence set out but not completed | `naca0012-airfoil/README.md` §14.2 verification matrix |
| Curve-fitting warning ("tuning inputs against a known answer") | `naca0012-airfoil/README.md` §14.1 conclusion |
| Course context (CornellX ENGR2000X, ANSYS 2026 R1, summer 2026) | `README.md` header |
| All images | `naca0012-airfoil/` figure files (mapping in `scripts/import-images.mjs`) |
| `og.png` | Regenerated by `scripts/make-og-projects.mjs`; the previous one advertised both studies |

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

## C++ Finite-Volume CFD Solver (`src/lib/projects/naca-cfd-solver.ts`)

Source files: `~/Documents/summer 2026` (working directory, shared with
unrelated ANSYS coursework) and `~/Documents/naca-cfd-solver` (the repository).
Figures generated 24 Aug 2026 into `public/images/naca-cfd-solver/`.

**Every number on the page was re-derived from the solver's output files, not
transcribed from a terminal.** The SST runs never wrote a log, so the console
figures could not be copied even if that had been acceptable. The re-derivation
integrated pressure and wall shear over the 240 wall faces directly from the
saved fields and reproduced the recorded coefficients to 5 significant figures.

| Claim | Source |
|---|---|
| Mesh V1 peak aspect ratio 539.3, non-orthogonality 81.7° | `cells.csv`, columns written by the generator itself |
| Mesh V2 peak aspect ratio 5.02, non-orthogonality 29.7°, closure 5.6×10⁻¹⁷ | `cells_v2.csv` |
| Diffusion order 1.982 → 1.9988 | `annulus_convergence.csv` |
| Convection orders 2.00 (central) and 0.95 (upwind) | `convection_diffusion_convergence.csv` |
| Geometry/operator tests (1.1×10⁻¹⁶ flux, 2.3×10⁻¹² gradient, face counts) | `naca_fvm_geometry_test.csv`, `naca_faces.csv` |
| Laplace boundary flux 1.7904, imbalance 4.6×10⁻⁷ | Re-derived from `laplace_solution.csv` + `ogrid_v2.csv`, reproducing the solver's own flux integration |
| Cavity RMSE 0.0157 / 0.0078 / 0.0033 | 100×100 from `cavity_solution.csv`; **25×25 and 50×50 re-run 24 Aug 2026** because those solutions were never saved. The re-run reproduced the recorded 50×50 values (0.00777, 0.00495) exactly, which is why the 25×25 value is trusted |
| Non-orthogonal correction, C_l,p 0.5687 → 0.5603 and C_d,p 0.1571 → 0.1605 | Re-integrated from `naca_wall_cp.csv` and `naca_wall_cp_nonorth.csv` |
| Laminar grid convergence (3,900 / 8,850 / 15,800 cells) | `run_coarse.txt`, `run_medium.txt`, `run_fine.txt` |
| Wall-resolved mesh: 240×180, 42,960 cells, 9.23×10⁻⁶ c, growth 1.064 | `ogrid_highRe.csv`, `highRe_wall_spacing.csv` |
| SST α = 0: C_l = −2.26×10⁻⁷, C_d = 0.0127, y⁺ mean 1.07 | Re-integrated from `naca_sst_solution_alpha0.csv` + `naca_sst_wall_alpha0.csv` |
| SST α = 10 first order: C_l 1.0064, C_d 0.04731 | Re-integrated from `naca_sst_first_order_solution.csv` + wall file |
| SST α = 10 second order: C_l 1.1187, C_d 0.01326 | Re-integrated from `naca_sst_second_order_solution.csv` + wall file |
| NASA reference C_l/C_d for CFL3D, FUN3D, NTS | NASA Turbulence Modeling Resource, SST validation page, 897×257 grid, verified 24 Aug 2026 |
| Ghia benchmark points | Ghia, Ghia & Shin (1982), as tabulated in `plot_cavity_validation.py` |

### Caveats specific to this project

1. **The NASA TMR moved.** `turbmodels.larc.nasa.gov` now 301-redirects site-wide
   to a NASA landing page and the case tables are gone from it. The live address
   is `https://tmbwg.github.io/turbmodels/`. The page links to the new one. Do
   not restore the old domain, it will break.
2. **The comparison is not like-for-like, and the page says so.** NASA is
   compressible at M = 0.15 against an incompressible solver; freestream
   turbulence differs by three orders of magnitude in eddy-viscosity ratio
   (0.009 against 10); their grid is roughly 5× denser. The caveat note in the
   `reference` section states all three. Do not soften it to "within a few
   percent" without restating the conditions.
3. **The second-order run is not fully converged, and this must stay stated.**
   Continuity met tolerance (4.8×10⁻⁸ against 10⁻⁷); velocity, pressure
   correction and both turbulence increments did not before the 15,000
   iteration cap, the worst being relative k at 1.4×10⁻³ against 10⁻⁵. The page
   says this in the `schemes` caveat and again in `limitations`.
4. **The α = 0 case validates symmetry only.** Its drag (0.0127) is 57 % above
   the NASA value because it was run first-order. The page states this rather
   than quoting the symmetry result alone.
5. **Field plots are rotated into the flow frame.** The solver holds the mesh
   fixed and rotates the free-stream vector, so raw output draws the aerofoil at
   zero incidence. The figures rotate coordinates by −α so the aerofoil sits at
   incidence against horizontal flow. Same data, presentation only.
6. **The wake banding in `sst-mut-ratio.png` is real.** It is O-grid
   under-resolution of the far wake, not a rendering artefact, and it is named
   both in that figure's caption and in the limitations list.
7. **No transition model exists in the source.** Confirmed by inspection, zero
   occurrences. The "fully turbulent" claim is verified, not assumed.

## Known discrepancies (do not resolve silently)

Recorded during the July 2026 repository overhaul; flagged to Jad, unresolved:

1. `thin-ply-composite-analysis`: the README says the QI vs DD difference did not
   survive Holm correction, but `results/figures/statistics/max_stress_holm_heatmap.png`
   shows dispersed-QI vs blocked-DD at p = 0.005 for max stress. The site follows
   the README wording (failure-strain framing) and shows the failure-strain heatmap.
2. `blood-transport-uav`: README says "10 flight parts";
   `analysis/data/subassembly_mass.csv` has 9 structural parts + 5 fastener line
   items. The site follows the published README (10).

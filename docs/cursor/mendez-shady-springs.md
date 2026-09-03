# Cursor task — Mendez / 3303 Shady Springs make-ready

Open this file in Cursor on `dawimberly/the-flip-fixer`. Implement into the **existing estimator**. Do not build a website. Do not change public marketing pages.

Price list: **TXSA8X Sep 2026**. Overhead & profit: **20%** on installed. Job total to match: **$45,623.31** (installed $38,019.43 + O&P $7,603.88).

---

## 1. Files to touch

- `src/data/catalog.json` — add SKUs below if missing
- `src/lib/estimator.ts` — `sampleShadySpringsJob()`, labor-only lights/fans, cheap 2¼″ base
- `src/lib/estimator-store.ts` — load that job
- `src/lib/estimate-pdf.ts` — **By trade** + **Cost per item** on **contractor and customer** PDFs
- `src/components/estimator-app.tsx` — a “Shady Springs” load button next to Sample house

Do not rewrite PDF layout (headers, colors, room tables). Add the trade sections.

---

## 2. Product rules (already decided with Dan)

- Accessories customers buy themselves (faucets, ceiling fans, light fixtures) are **labor only**.
- Default baseboard is **2¼″ MDF**, not 3¼″. Seal & paint base is **Paint**, hang is **Trim**.
- Windows live in Other / miscellaneous. Dual-pane **interior insert**. Do not cut or enlarge openings. Siding is asbestos cement board — stop-work / change order if siding is disturbed. No asbestos abatement in this estimate.
- Dining has a **sliding patio door**, insert, listed separate from windows.
- Carpet demo **only in Living Room (252 sf)**. All other living areas: LVP **over existing vinyl**. Baths are not overlay.
- Do not sand popcorn. Scrape only, then paint ceilings. Living ceiling cracks: **6 sheets 5/8 drywall (192 sf)** after popcorn comes down.
- Garage: **7×7 painted steel door** + opener if existing is dead. Roof **patch** at garage gable eave, not a reroof.
- Attic insulation is an **allowance** until depth is measured.
- Xactimate **tile install does not include** cement board or RedGard. Price those as their own lines.

---

## 3. Catalog SKUs to add

Merge by `name`. Do not duplicate.

| Category | Name | Unit | Cost |
|---|---|---|---|
| flooring | Carpet removal and haul-off | sq ft | 1.28 |
| trim/baseboards | Baseboard — 2 1/4 in MDF | linear ft | 3.85 |
| lighting | Ceiling fan (labor only, existing box, owner supplied) | each | 85 |
| lighting | Light fixture — ceiling (labor only, owner supplied) | each | 65 |
| lighting | Bathroom ventilation fan (labor only, owner supplied) | each | 95 |
| ceiling | Popcorn ceiling removal — scrape only, no sand | sq ft | 1.85 |
| ceiling | Paint ceiling — 2 coats | sq ft | 1.45 |
| ceiling | 5/8 in drywall — hung, taped, ready for texture | sq ft | 3.15 |
| windows | Vinyl window — dual pane, interior insert, do not disturb siding | each | 785 |
| windows | Vinyl window — dual pane, conventional replacement in CMU/block | each | 965 |
| doors | Vinyl sliding patio door — dual pane, interior insert, do not disturb siding | each | 2185 |
| doors | Garage door — 7x7 painted steel, single car | each | 1265 |
| doors | Garage door opener | each | 385 |
| tile/shower surround | Ceramic tile — wall, installed | sq ft | 24.50 |
| tile/shower surround | Cement board — 1/2 in shower/tub walls | sq ft | 5.45 |
| tile/shower surround | Waterproofing membrane — liquid applied (RedGard) | sq ft | 3.25 |
| tile/shower surround | Ceramic tile removal — wall | sq ft | 4.15 |
| tile/shower surround | Ceramic tile removal — floor | sq ft | 3.85 |
| tile/shower surround | Bathtub reglaze | each | 565 |
| insulation | Attic insulation — blown, allowance until depth measured | each | 1850 |
| roofing | Roof patch — missing shingles / eave at garage gable | each | 540 |
| cleanup | Debris haul-off — job | each | 385 |

Existing book prices to keep using: LVP $7.85/sf, paint drywall one coat $1.05/sf, 3¼″ base $5.15 (do not use on this job), tile floor 2x2 $22.50/sf, ¼″ CBU $4.35/sf, shower curb $98/lf, interior door $385, bath fan installed $185 if not labor-only.

---

## 4. Trade mapping (use on both PDFs)

Do **not** group by catalog category. Group by who does the work.

Order: Flooring, Tile, Drywall, Paint, Trim, Windows, Doors, Lighting, Plumbing, Exterior, Cleanup.

Rules (first match wins):

1. **Plumbing** — reglaze, tub/surround redo, alcove tub
2. **Tile** (mason) — any “tile”, RedGard / waterproofing, cement board, shower curb, grout, or category contains `tile`. This includes **tile floor**. Tile floor is **not** Flooring.
3. **Drywall** — popcorn, drywall, patch. Not paint.
4. **Paint** — paint, prime, “seal (1 coat)” (baseboard paint)
5. **Trim** — baseboard hang, casing, crown, quarter round (hang only)
6. **Windows** — window, category `windows`
7. **Doors** — sliding patio, garage door, interior door, door unit
8. **Lighting** — light, fan, category `lighting`
9. **Exterior** — roof, insulation, attic
10. **Cleanup** — haul, clean, category `cleanup`
11. **Flooring** — vinyl plank / LVP, carpet, laminate, engineered, vinyl tile, remaining `flooring`

Print two blocks on **contractor and customer**:

- **By trade** — trade | amount, then Installed, Overhead & profit
- **Cost per item** — trade | work | qty | unit | cost | amount (roll up same name + unit cost across rooms)

Copy note under By trade:

> Tile is a tile mason (floor tile, wall tile, curb, cement board, RedGard). Flooring is LVP, carpet, and other non-tile floors. Drywall is separate from paint. Trim is hang only; paint of trim is Paint.

---

## 5. Job: 3303 Shady Springs dr, San Antonio 78230

Client: William Mendez · 2103864699 · wmendez2487 · Make ready. Issued 2026-09-02. 20% O&P.

null quantity = infer from scan (floor / walls / ceiling / perimeter).

### Kitchen 15×8×8
LVP · paint 1 coat · 2¼″ base + seal/paint · 2 labor-only ceiling lights · popcorn scrape + ceiling paint · 1 insert window

### Master 10×14×8
LVP over vinyl (no carpet demo) · paint 1 coat · 2¼″ base + seal/paint · 1 interior door · popcorn + ceiling paint · 1 insert window

### Living Room 18×14×8
LVP · **Carpet removal 252 sf** · paint 1 coat · 2¼″ base + seal/paint · labor-only ceiling fan · popcorn scrape · **5/8 drywall 192 sf** · ceiling paint 2 coats · **2 insert windows**

### Master bath 5×8×8 — stall shower, 30″ opening, assume 30×36×8 until measured
Paint 1 coat · popcorn + ceiling paint · bath fan · **no tub, no 2x2 dry floor** (existing vinyl stays in dry area)

Shower package:

- Ceramic tile removal wall **68 sf**, floor **8 sf**
- ½″ CBU walls **68 sf**
- ¼″ CBU shower floor **8 sf** (flooring underlayment SKU)
- RedGard **76 sf**
- Wall tile **68 sf** @ 24.50
- Shower floor tile 2x2 **8 sf**
- Curb **2.5 lf**

### Bedroom 2 10×10×8
LVP over vinyl · paint 1 coat · 2¼″ base + seal/paint · labor-only fan · popcorn + ceiling paint · 1 insert window

### Guest Bath 7×5×8 — tub, exterior window, 4×4 floor
**LVP** (pull ceramic floor first) · paint 1 coat · popcorn + ceiling paint · bath fan · **1 insert window** · reglaze tub

Tub walls:

- Tile removal floor **35 sf**, wall **70 sf**
- ½″ CBU **70 sf**
- RedGard **70 sf**
- Wall tile **70 sf** @ 24.50

### Dining Room 12×12×8
LVP over vinyl · paint 1 coat · 2¼″ base + seal/paint · labor-only fan · popcorn + ceiling paint · **1 insert slider** (not a window unit)

### Bedroom 3 10×14×8
Same as Bedroom 2.

### Hallway by 2nd bath 7×5×8
LVP over vinyl · paint 1 coat · 2¼″ base + seal/paint · popcorn + ceiling paint

### Garage
7×7 painted steel door · opener · roof patch garage gable eave · attic insulation allowance · debris haul-off

---

## 6. Target trade totals (installed, before 20% O&P)

Use these as a check after the job loads. Off by a few dollars is fine; off by a trade is not.

| Trade | Amount |
|---|---|
| Flooring | $8,107.70 |
| Tile | $6,586.80 |
| Drywall | $3,334.90 |
| Paint | $4,829.81 |
| Trim | $1,225.68 |
| Windows | $5,495.00 |
| Doors | $3,555.00 |
| Lighting | $1,030.80 |
| Plumbing | $565.00 |
| Exterior | $2,775.00 |
| Cleanup | $385.00 |
| **Installed** | **$38,019.43** |
| **O&P 20%** | **$7,603.88** |
| **Job total** | **$45,623.31** |

---

## 7. Done when

1. Shady Springs loads in the estimator and prints contractor + customer PDFs.
2. Both PDFs have By trade and Cost per item.
3. Tile floor is under Tile, not Flooring.
4. Drywall is not mixed with Paint.
5. Carpet demo exists only on Living Room.
6. Lights and fans on this job are labor-only.
7. Grand total is $45,623.31.

Still open (do not invent): stall depth if not 36″; attic depth; tub vs refinish already locked as reglaze in bath 2 and full tile stall in bath 1.

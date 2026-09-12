export const PITCH_MULTIPLIERS: Record<string, number> = {
  "0/12": 1,
  "1/12": 1.003,
  "2/12": 1.014,
  "3/12": 1.031,
  "4/12": 1.054,
  "5/12": 1.083,
  "6/12": 1.118,
  "7/12": 1.158,
  "8/12": 1.202,
  "9/12": 1.25,
  "10/12": 1.302,
  "11/12": 1.357,
  "12/12": 1.414,
};

export const PITCHES = Object.keys(PITCH_MULTIPLIERS);

export type RoofFacet = {
  id: string;
  label: string;
  facetType: "hip" | "gable" | "valley" | "shed" | "flat" | "other";
  pitch: string;
  lengthFt: number;
  widthFt: number;
};

export function slopedAreaSqft(flatSqft: number, pitch: string) {
  return flatSqft * (PITCH_MULTIPLIERS[pitch] ?? 1);
}

export function applyWaste(sqft: number, wastePct: number) {
  return Math.round(sqft * (1 + wastePct / 100) * 10) / 10;
}

export function facetFlatSqft(facet: RoofFacet) {
  return Math.max(0, facet.lengthFt) * Math.max(0, facet.widthFt);
}

export function summarizeRoof(facets: RoofFacet[], wastePct: number) {
  const rows = facets.map((facet) => {
    const flat = facetFlatSqft(facet);
    const sloped = slopedAreaSqft(flat, facet.pitch);
    return { ...facet, flat, sloped };
  });
  const totalFlat = rows.reduce((sum, row) => sum + row.flat, 0);
  const totalSloped = rows.reduce((sum, row) => sum + row.sloped, 0);
  const pitchWeight = new Map<string, number>();
  for (const row of rows) {
    pitchWeight.set(row.pitch, (pitchWeight.get(row.pitch) ?? 0) + row.flat);
  }
  const predominantPitch =
    [...pitchWeight.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? "6/12";
  return {
    rows,
    totalFlat: Math.round(totalFlat * 10) / 10,
    totalSloped: Math.round(totalSloped * 10) / 10,
    finalWithWaste: applyWaste(totalSloped, wastePct),
    squares: Math.round((applyWaste(totalSloped, wastePct) / 100) * 100) / 100,
    predominantPitch,
  };
}

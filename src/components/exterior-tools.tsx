import { useMemo, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { AppNav } from "@/components/app-nav";
import { OpeningsTool, type OpeningLine } from "@/components/openings-tool";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PRICE_AS_OF } from "@/lib/estimator";
import {
  PITCHES,
  summarizeRoof,
  type RoofFacet,
} from "@/lib/roof-math";
import { qtyLabel } from "@/lib/utils";

const TYPES: RoofFacet["facetType"][] = ["hip", "gable", "valley", "shed", "flat", "other"];

function blankFacet(index: number): RoofFacet {
  return {
    id: crypto.randomUUID(),
    label: `F${index}`,
    facetType: "hip",
    pitch: "6/12",
    lengthFt: 20,
    widthFt: 12,
  };
}

export function ExteriorTools() {
  const [address, setAddress] = useState("");
  const [wastePct, setWastePct] = useState(12);
  const [facets, setFacets] = useState<RoofFacet[]>([blankFacet(1)]);
  const [openings, setOpenings] = useState<OpeningLine[]>([]);
  const summary = useMemo(() => summarizeRoof(facets, wastePct), [facets, wastePct]);

  function exportJson() {
    const payload = {
      property: { address },
      facets: summary.rows.map((row) => ({
        facet_id: row.label,
        facet_type: row.facetType,
        pitch: row.pitch,
        length_ft: row.lengthFt,
        width_ft: row.widthFt,
        area_sqft: Math.round(row.flat * 10) / 10,
        sloped_sqft: Math.round(row.sloped * 10) / 10,
      })),
      summary: {
        total_flat_area_sqft: summary.totalFlat,
        total_area_with_pitch_multiplier_sqft: summary.totalSloped,
        waste_factor_pct: wastePct,
        final_area_sqft_with_waste: summary.finalWithWaste,
        squares: summary.squares,
        predominant_pitch: summary.predominantPitch,
      },
      openings,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "roof_facets.json";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="app-shell min-h-dvh w-full max-w-full overflow-x-clip pb-10">
      <AppNav />
      <main className="mx-auto grid w-full min-w-0 max-w-6xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)]">
        <div className="space-y-5">
          <section className="rounded-xl bg-card px-5 py-6 shadow-border sm:px-8 sm:py-8">
            <p className="text-[11px] font-medium tracking-[0.18em] text-muted uppercase">
              Exterior tool · {PRICE_AS_OF}
            </p>
            <h1 className="mt-2 font-display text-3xl font-medium tracking-tight sm:text-4xl">Outside the house.</h1>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted sm:text-base">
              Roof planes, pitch, waste. Then the openings that punch the envelope. Aerial click-trace waits on a Maps key. This page already prices squares.
            </p>
            <div className="mt-5 space-y-1.5">
              <Label htmlFor="ext-address">Property address</Label>
              <Input
                id="ext-address"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                placeholder="123 Oak St, San Antonio, TX"
              />
            </div>
          </section>

          <section className="rounded-xl bg-card p-4 shadow-border sm:p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[11px] font-medium tracking-[0.18em] text-muted uppercase">Roof tracer</p>
                <h2 className="mt-1 font-display text-xl font-medium tracking-tight">Facets</h2>
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={() => setFacets((list) => [...list, blankFacet(list.length + 1)])}
              >
                <Plus className="size-4" />
                Add facet
              </Button>
            </div>
            <ul className="mt-5 space-y-3">
              {facets.map((facet, index) => (
                <li key={facet.id} className="rounded-lg bg-surface p-3">
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-sm font-medium text-fg">{facet.label}</p>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      disabled={facets.length <= 1}
                      onClick={() => setFacets((list) => list.filter((item) => item.id !== facet.id))}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                  <div className="grid gap-2 sm:grid-cols-2">
                    <Select
                      value={facet.facetType}
                      onValueChange={(value) =>
                        setFacets((list) =>
                          list.map((item) =>
                            item.id === facet.id ? { ...item, facetType: value as RoofFacet["facetType"] } : item,
                          ),
                        )
                      }
                    >
                      <SelectTrigger aria-label={`Facet ${index + 1} type`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {TYPES.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select
                      value={facet.pitch}
                      onValueChange={(value) =>
                        setFacets((list) =>
                          list.map((item) => (item.id === facet.id ? { ...item, pitch: value } : item)),
                        )
                      }
                    >
                      <SelectTrigger aria-label={`Facet ${index + 1} pitch`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {PITCHES.map((pitch) => (
                          <SelectItem key={pitch} value={pitch}>
                            {pitch}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      inputMode="decimal"
                      aria-label={`Facet ${index + 1} length`}
                      value={facet.lengthFt}
                      onChange={(event) =>
                        setFacets((list) =>
                          list.map((item) =>
                            item.id === facet.id ? { ...item, lengthFt: Number(event.target.value) } : item,
                          ),
                        )
                      }
                      className="font-mono tabular-nums"
                    />
                    <Input
                      inputMode="decimal"
                      aria-label={`Facet ${index + 1} width`}
                      value={facet.widthFt}
                      onChange={(event) =>
                        setFacets((list) =>
                          list.map((item) =>
                            item.id === facet.id ? { ...item, widthFt: Number(event.target.value) } : item,
                          ),
                        )
                      }
                      className="font-mono tabular-nums"
                    />
                  </div>
                  <p className="mt-2 text-xs text-muted">
                    Plan {qtyLabel(summary.rows[index]?.flat ?? 0, "sq ft")} · sloped{" "}
                    {qtyLabel(summary.rows[index]?.sloped ?? 0, "sq ft")}
                  </p>
                </li>
              ))}
            </ul>
            <div className="mt-4 space-y-1.5">
              <Label htmlFor="waste">Waste factor %</Label>
              <Input
                id="waste"
                inputMode="decimal"
                value={wastePct}
                onChange={(event) => setWastePct(Number(event.target.value))}
                className="max-w-32 font-mono tabular-nums"
              />
            </div>
          </section>

          <section className="rounded-xl bg-card p-4 shadow-border sm:p-6">
            <p className="text-[11px] font-medium tracking-[0.18em] text-muted uppercase">Windows & doors</p>
            <h2 className="mt-1 font-display text-xl font-medium tracking-tight">What punches the envelope?</h2>
            <div className="mt-5">
              <OpeningsTool surface="exterior" lines={openings} onChange={setOpenings} />
            </div>
          </section>
        </div>

        <aside className="rounded-xl bg-ink p-5 text-ink-foreground shadow-border sm:p-6 lg:sticky lg:top-24">
          <p className="text-[11px] font-medium tracking-[0.18em] text-ink-foreground/60 uppercase">The roof</p>
          <p className="mt-2 font-display text-4xl font-medium tabular-nums">{summary.squares}</p>
          <p className="mt-1 text-sm text-ink-foreground/70">squares after {wastePct}% waste</p>
          <dl className="mt-5 space-y-2 text-sm">
            <div className="flex justify-between gap-3">
              <dt className="text-ink-foreground/60">Flat</dt>
              <dd className="font-mono tabular-nums">{summary.totalFlat} sf</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-ink-foreground/60">Sloped</dt>
              <dd className="font-mono tabular-nums">{summary.totalSloped} sf</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-ink-foreground/60">With waste</dt>
              <dd className="font-mono tabular-nums">{summary.finalWithWaste} sf</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-ink-foreground/60">Pitch</dt>
              <dd className="font-mono tabular-nums">{summary.predominantPitch}</dd>
            </div>
          </dl>
          <Button type="button" className="mt-5 w-full" onClick={exportJson}>
            Download roof_facets.json
          </Button>
          <p className="mt-3 text-xs text-ink-foreground/55">
            Field-verify before you order. Same disclaimer EagleView prints in eight-point type.
          </p>
        </aside>
      </main>
    </div>
  );
}

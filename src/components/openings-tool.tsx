import { useState } from "react";
import { AppWindow, DoorOpen, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { catalog } from "@/lib/estimator";
import { money } from "@/lib/utils";

export type OpeningLine = {
  id: string;
  kind: "window" | "door";
  name: string;
  widthFt: number;
  heightFt: number;
  quantity: number;
};

type Props = {
  surface: "interior" | "exterior";
  lines: OpeningLine[];
  onChange: (lines: OpeningLine[]) => void;
};

function optionsFor(surface: "interior" | "exterior") {
  const doors = catalog.doors?.options ?? [];
  const treatments = catalog["window treatments"]?.options ?? [];
  const doorOpts =
    surface === "interior"
      ? doors.filter((item) => /interior|bifold|paint door/i.test(item.name))
      : doors.filter((item) => /entry|patio|garage|overhead|exterior|lockset/i.test(item.name));
  return {
    window: treatments.length
      ? treatments
      : [{ name: "Window unit — field measure", unit: "each", cost_per_unit: 0 }],
    door: doorOpts.length ? doorOpts : doors,
  };
}

export function OpeningsTool({ surface, lines, onChange }: Props) {
  const catalogs = optionsFor(surface);
  const [kind, setKind] = useState<"window" | "door">("window");

  function add() {
    const list = catalogs[kind];
    const first = list[0];
    onChange([
      ...lines,
      {
        id: crypto.randomUUID(),
        kind,
        name: first?.name ?? "Custom",
        widthFt: kind === "window" ? 3 : 2.5,
        heightFt: kind === "window" ? 4 : 6.67,
        quantity: 1,
      },
    ]);
  }

  function patch(id: string, next: Partial<OpeningLine>) {
    onChange(lines.map((line) => (line.id === id ? { ...line, ...next } : line)));
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end gap-2">
        <Select value={kind} onValueChange={(value) => setKind(value as "window" | "door")}>
          <SelectTrigger className="w-40" aria-label="Opening type">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="window">Window</SelectItem>
            <SelectItem value="door">Door</SelectItem>
          </SelectContent>
        </Select>
        <Button type="button" onClick={add}>
          <Plus className="size-4" />
          Add {kind}
        </Button>
      </div>
      {lines.length === 0 ? (
        <p className="text-sm text-muted">Count every opening this {surface} sees.</p>
      ) : (
        <ul className="space-y-3">
          {lines.map((line) => {
            const Icon = line.kind === "window" ? AppWindow : DoorOpen;
            const opts = catalogs[line.kind];
            const price = opts.find((item) => item.name === line.name)?.cost_per_unit ?? 0;
            return (
              <li key={line.id} className="rounded-lg bg-surface p-3">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <p className="flex items-center gap-2 text-sm font-medium text-fg">
                    <Icon className="size-4 text-muted" />
                    {line.kind === "window" ? "Window" : "Door"}
                  </p>
                  <Button type="button" variant="ghost" size="icon" onClick={() => onChange(lines.filter((item) => item.id !== line.id))}>
                    <Trash2 className="size-4" />
                  </Button>
                </div>
                <Select value={line.name} onValueChange={(name) => patch(line.id, { name })}>
                  <SelectTrigger aria-label={`${line.kind} catalog`}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {opts.map((item) => (
                      <SelectItem key={item.name} value={item.name}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  <Input
                    inputMode="decimal"
                    aria-label="Width feet"
                    value={line.widthFt}
                    onChange={(event) => patch(line.id, { widthFt: Number(event.target.value) })}
                    className="font-mono tabular-nums"
                  />
                  <Input
                    inputMode="decimal"
                    aria-label="Height feet"
                    value={line.heightFt}
                    onChange={(event) => patch(line.id, { heightFt: Number(event.target.value) })}
                    className="font-mono tabular-nums"
                  />
                  <Input
                    inputMode="numeric"
                    aria-label="Quantity"
                    value={line.quantity}
                    onChange={(event) => patch(line.id, { quantity: Number(event.target.value) })}
                    className="font-mono tabular-nums"
                  />
                </div>
                <p className="mt-2 text-xs text-muted">
                  W × H × qty · {money(price)} each
                  {price ? ` · ${money(price * (Number(line.quantity) || 0))}` : ""}
                </p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

import { sampleShadySpringsJob, estimateJob, OP_PERCENT } from "../src/lib/estimator.ts";

const state = sampleShadySpringsJob();
const job = estimateJob(state.rooms, OP_PERCENT);
for (const label of ["Kitchen", "Dining Room", "Closets (combined)"]) {
  const room = job.rooms.find((r) => r.room.label === label);
  if (!room) {
    console.log(label, "MISSING");
    continue;
  }
  const lights = room.estimate.lineItems.filter((l) => /fan|light|fixture/i.test(l.description));
  console.log(
    label,
    "floor",
    room.scan.floorArea,
    "walls",
    room.scan.wallArea,
    "ceiling lines",
    room.estimate.lineItems.filter((l) => /ceiling|popcorn|paint|lvp|baseboard|seal/i.test(l.description)).length,
    "lights",
    lights.map((l) => `${l.description} x${l.quantity}`).join(" | ") || "(none)",
    "roomTotal",
    room.estimate.grandTotal,
  );
}
console.log("job", job.grandTotal, "installed", job.materialsSubtotal, "rooms", job.rooms.length);

import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import {
  sampleShadySpringsJob,
  estimateJob,
  OP_PERCENT,
} from "../src/lib/estimator.ts";
import {
  buildEstimatePdf,
  buildCustomerPdf,
  estimatePdfFilename,
} from "../src/lib/estimate-pdf.ts";
import { tradeTotals, costPerItemRows, assignTrade } from "../src/lib/trade-groups.ts";

const outDir = join(process.env.USERPROFILE || "", "Desktop", "FLPFXR-deliverables", "mendez-estimates");

const jobState = sampleShadySpringsJob();
const job = estimateJob(jobState.rooms, OP_PERCENT);
const client = jobState.client;
const issued = new Date();

console.log("grandTotal", job.grandTotal);
console.log("installed", job.materialsSubtotal);
console.log("op", job.laborSubtotal);
console.log("--- trades (installed) ---");
for (const row of tradeTotals(job)) {
  console.log(row.trade, row.installed.toFixed(2));
}

const byTrade = new Map();
for (const line of job.completeLineItems) {
  const t = assignTrade(line);
  byTrade.set(t, (byTrade.get(t) || 0) + line.lineTotal);
}
console.log("--- raw ---");
for (const [k, v] of [...byTrade.entries()].sort()) console.log(k, v.toFixed(2));

const contractor = await buildEstimatePdf(job, client);
const customer = await buildCustomerPdf(job, client);

const contractorName = estimatePdfFilename(client, "contractor", issued);
const customerName = estimatePdfFilename(client, "customer", issued);

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, contractorName), contractor);
writeFileSync(join(outDir, customerName), customer);
console.log("wrote", outDir);
console.log("contractor", contractorName, contractor.byteLength);
console.log("customer", customerName, customer.byteLength);
console.log("costPerItem rows", costPerItemRows(job.completeLineItems).length);

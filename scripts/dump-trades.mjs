import { sampleShadySpringsJob, estimateJob, OP_PERCENT } from "../src/lib/estimator.ts";
import { assignTrade } from "../src/lib/trade-groups.ts";

const job = estimateJob(sampleShadySpringsJob().rooms, OP_PERCENT);
for (const line of job.completeLineItems) {
  console.log([assignTrade(line), line.lineTotal.toFixed(2), line.category, line.description].join("\t"));
}

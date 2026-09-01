import { createFileRoute } from "@tanstack/react-router";
import { EstimatorApp } from "@/components/estimator-app";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <EstimatorApp />;
}

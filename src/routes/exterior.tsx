import { createFileRoute } from "@tanstack/react-router";
import { ExteriorTools } from "@/components/exterior-tools";

export const Route = createFileRoute("/exterior")({ component: ExteriorPage });

function ExteriorPage() {
  return <ExteriorTools />;
}

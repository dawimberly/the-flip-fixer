import { createFileRoute } from "@tanstack/react-router";
import { InteriorTools } from "@/components/interior-tools";

export const Route = createFileRoute("/interior")({ component: InteriorPage });

function InteriorPage() {
  return <InteriorTools />;
}

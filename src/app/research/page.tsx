import type { Metadata } from "next";

import { ResearchDesk } from "@/components/ResearchDesk";
import { displayedPassages } from "@/data/derived";

export const metadata: Metadata = {
  title: "Research Desk",
  description:
    "Build a focused research set and compare contested New Testament passages across the evidence catalog.",
};

export default function ResearchPage() {
  return <ResearchDesk passages={displayedPassages} />;
}

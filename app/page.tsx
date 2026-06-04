import SignalRoot from "@/components/SignalRoot";
import HomeNav from "@/components/HomeNav";
import HomeMarketing from "@/components/sections/HomeMarketing";
import MobileBookBar from "@/components/MobileBookBar";
import SiteFooter from "@/components/SiteFooter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Felipe OS | AI Automation for Small Teams",
  description:
    "Fixed-scope AI systems that take repetitive work — support, lead follow-up, admin, reporting — off small teams. Working prototypes in weeks, not months.",
  keywords: [
    "AI automation for small business",
    "AI workflow automation",
    "AI assistant for SMB",
    "custom AI assistant",
    "customer support AI agent",
    "B2B prospecting agent",
    "RAG knowledge base",
    "retrieval augmented generation",
    "fine-tuning",
    "AI agent orchestration",
    "multi-agent systems",
    "OpenCLAW agent runtime",
    "MCP Model Context Protocol",
    "vector database embeddings",
    "API integrations",
    "business process automation",
    "agentic workflows",
    "AI consultant for agencies",
    "growth system audit",
    "MVP build",
    "Felipe OS",
    "Felipe Mejia",
  ],
};

export default function HomePage() {
  return (
    <>
      <HomeNav />
      <SignalRoot />
      <HomeMarketing />
      <SiteFooter />
      <MobileBookBar />
    </>
  );
}

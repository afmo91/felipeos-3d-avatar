"use client";

import { caseStudies, getCaseStudy } from "@/data/caseStudies";
import { getService, services } from "@/data/services";
import type { ChatAction, StageState } from "@/lib/conversation";
import publicCV from "@/data/cv/base.json";

const EMAIL = "me@felipeos.com";
const LINKEDIN = "https://www.linkedin.com/in/felipemejiaosorio/";
const GITHUB = "https://github.com/afmo91";

type Props = {
  onAction: (action: ChatAction) => void;
  stage: StageState;
};

function StageButton({
  action,
  children,
  variant = "secondary",
  onAction,
}: {
  action: ChatAction;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  onAction: (action: ChatAction) => void;
}) {
  return (
    <button
      className={
        variant === "primary"
          ? "rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-cyan-100"
          : "rounded-full border border-white/10 bg-white/[0.045] px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-cyan-300/35 hover:text-white"
      }
      onClick={() => onAction(action)}
      type="button"
    >
      {children}
    </button>
  );
}

function FooterLinks() {
  return (
    <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-white/10 pt-4 text-xs text-slate-400">
      <a className="transition hover:text-white" href={`mailto:${EMAIL}`}>
        {EMAIL}
      </a>
      <a className="transition hover:text-white" href={LINKEDIN} rel="noopener noreferrer" target="_blank">
        LinkedIn
      </a>
      <a className="transition hover:text-white" href={GITHUB} rel="noopener noreferrer" target="_blank">
        GitHub
      </a>
      <button
        className="transition hover:text-white"
        onClick={() => window.dispatchEvent(new Event("open-cookie-preferences"))}
        type="button"
      >
        Cookie preferences
      </button>
    </div>
  );
}

function IntroStage() {
  return (
    <div className="pointer-events-none flex h-full items-end justify-center p-5 pb-8 text-center md:p-8">
      <div className="max-w-xl">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-100/60">Felipe OS guide</p>
        <h1 className="mt-3 text-2xl font-semibold text-white md:text-4xl">
          Tell me what&apos;s eating your team&apos;s week.
        </h1>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-300/75 md:text-base">
          Describe a repetitive workflow and I&apos;ll turn it into a scoped AI build — services, proof and pricing, all in one conversation.
        </p>
      </div>
    </div>
  );
}

function ServicesStage({ onAction, stage }: Props) {
  const selected = getService(stage.selectedService);

  return (
    <StageScroll>
      <StageHeader
        kicker="Services"
        title="Practical AI, growth and product builds"
        copy="Focused offers for teams that need a usable system, not a slide deck."
      />

      <div className="grid gap-3 lg:grid-cols-2">
        {services.map((service) => {
          const active = service.id === selected.id;
          return (
            <button
              className={`rounded-lg border p-4 text-left transition ${
                active
                  ? "border-cyan-300/45 bg-cyan-300/[0.09]"
                  : "border-white/10 bg-white/[0.045] hover:border-white/20"
              }`}
              key={service.id}
              onClick={() =>
                onAction({
                  type: "stage",
                  label: service.title,
                  topic: "services",
                  selectedService: service.id,
                })
              }
              type="button"
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-sm font-semibold text-white">{service.title}</h3>
                <span className="rounded-full border border-amber-200/20 bg-amber-200/10 px-2 py-1 text-[0.65rem] font-medium text-amber-100">
                  {service.timeline}
                </span>
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-300/75">{service.oneLiner}</p>
              <p className="mt-2 text-xs font-semibold text-cyan-100">{service.priceFrom}</p>
            </button>
          );
        })}
      </div>

      <div className="mt-4 rounded-lg border border-white/10 bg-black/25 p-4">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-cyan-100/55">Selected offer</p>
        <div className="mt-2 flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="text-xl font-semibold text-white">{selected.title}</h3>
          <span className="text-sm font-semibold text-cyan-100">{selected.priceFrom} · {selected.timeline}</span>
        </div>
        <p className="mt-2 text-sm leading-6 text-slate-300">{selected.bestFor}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {selected.deliverables.map((deliverable) => (
            <span className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-1 text-xs text-slate-200" key={deliverable}>
              {deliverable}
            </span>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          <StageButton
            action={{ type: "start_builder", label: "Start this", selectedService: selected.id }}
            onAction={onAction}
            variant="primary"
          >
            Start this
          </StageButton>
          <StageButton
            action={{ type: "start_builder", label: "Build my plan", selectedService: selected.id }}
            onAction={onAction}
          >
            Build my plan
          </StageButton>
          <StageButton action={{ type: "book", label: "Book a call" }} onAction={onAction}>
            Book a call
          </StageButton>
        </div>
      </div>
      <FooterLinks />
    </StageScroll>
  );
}

function ProofStage({ onAction, stage }: Props) {
  const selected = getCaseStudy(stage.selectedProofCase);

  return (
    <StageScroll>
      <StageHeader
        kicker="Proof of work"
        title="Real systems, real outcomes"
        copy="Anonymized to protect clients — but the problem, system and result are real."
      />

      <div className="grid gap-3 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="grid gap-2">
          {caseStudies.map((caseStudy) => (
            <button
              className={`rounded-lg border p-3 text-left transition ${
                selected.id === caseStudy.id
                  ? "border-cyan-300/45 bg-cyan-300/[0.09]"
                  : "border-white/10 bg-white/[0.045] hover:border-white/20"
              }`}
              key={caseStudy.id}
              onClick={() =>
                onAction({
                  type: "stage",
                  label: caseStudy.title,
                  topic: "proof",
                  selectedProofCase: caseStudy.id,
                })
              }
              type="button"
            >
              <p className="text-sm font-semibold text-white">{caseStudy.title}</p>
              <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-400">{caseStudy.commercialValue}</p>
            </button>
          ))}
        </div>

        <div className="rounded-lg border border-white/10 bg-black/25 p-4">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-cyan-100/55">{selected.client}</p>
          <h3 className="mt-2 text-xl font-semibold text-white">{selected.title}</h3>
          <div className="mt-4 grid gap-3">
            {[
              ["Problem", selected.problem],
              ["System built", selected.systemBuilt],
              ["Result", selected.result],
              ["Commercial value", selected.commercialValue],
            ].map(([label, copy]) => (
              <div className="rounded-lg border border-white/10 bg-white/[0.035] p-3" key={label}>
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-amber-100/70">{label}</p>
                <p className="mt-1 text-sm leading-6 text-slate-300">{copy}</p>
              </div>
            ))}
          </div>
          <MockupFlow nodes={selected.capabilities} />
          <div className="mt-5 flex flex-wrap gap-2">
            <StageButton action={{ type: "stage", label: "Show services", topic: "services" }} onAction={onAction}>
              Show services
            </StageButton>
            <StageButton action={{ type: "book", label: "Book a call" }} onAction={onAction} variant="primary">
              Book a call
            </StageButton>
          </div>
        </div>
      </div>
      <FooterLinks />
    </StageScroll>
  );
}

function RecruitingStage({ onAction }: Props) {
  return (
    <StageScroll>
      <StageHeader
        kicker="Recruiting"
        title="Product, growth and AI systems"
        copy="Recruiter-compatible view for roles where product delivery, growth metrics and automation meet."
      />
      <MetricStrip />
      <Timeline compact />
      <div className="mt-5 flex flex-wrap gap-2">
        <StageButton action={{ type: "stage", label: "Open CV", topic: "cv" }} onAction={onAction} variant="primary">
          Open CV
        </StageButton>
        <StageButton action={{ type: "download_cv", label: "Download CV" }} onAction={onAction}>
          Download CV
        </StageButton>
      </div>
      <FooterLinks />
    </StageScroll>
  );
}

function CVStage({ onAction }: Props) {
  return (
    <StageScroll>
      <StageHeader
        kicker="Public CV"
        title={publicCV.title}
        copy={publicCV.summary[0]}
      />
      <MetricStrip />
      <Timeline />
      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {Object.entries(publicCV.skills).map(([group, values]) => (
          <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4" key={group}>
            <h3 className="text-sm font-semibold text-white">{group}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-300/75">{values.join(", ")}</p>
          </div>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        <StageButton action={{ type: "download_cv", label: "Download CV" }} onAction={onAction} variant="primary">
          Download CV
        </StageButton>
        <StageButton action={{ type: "book", label: "Book a 30-min call" }} onAction={onAction}>
          Book a 30-min call
        </StageButton>
      </div>
      <FooterLinks />
    </StageScroll>
  );
}

function SolutionStage({ onAction, stage }: Props) {
  const plan = stage.generatedPlan;

  return (
    <StageScroll>
      <StageHeader
        kicker="Solution builder"
        title={plan?.title ?? "Personalized plan preview"}
        copy={
          plan?.goal ??
          "Answer the guided questions in chat and this panel will turn them into a workflow, integrations, timeline and next step."
        }
      />

      {plan ? (
        <>
          <div className="rounded-lg border border-cyan-300/20 bg-cyan-300/[0.07] p-4">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-cyan-100/65">Workflow</p>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {plan.workflow.map((node, index) => (
                <span className="inline-flex items-center gap-2" key={`${node}-${index}`}>
                  <span className="rounded-full border border-white/10 bg-black/25 px-3 py-1.5 text-xs text-slate-100">
                    {node}
                  </span>
                  {index < plan.workflow.length - 1 ? <span className="text-cyan-100/45">→</span> : null}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-3 grid gap-3 lg:grid-cols-2">
            <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-amber-100/70">Recommended integrations</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {plan.integrations.map((integration) => (
                  <span className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-1 text-xs text-slate-200" key={integration}>
                    {integration}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-amber-100/70">MVP sprint</p>
              <div className="mt-3 grid gap-2">
                {plan.sprint.map((item) => (
                  <p className="text-sm leading-6 text-slate-300" key={item}>{item}</p>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-3 rounded-lg border border-white/10 bg-black/25 p-4">
            <p className="text-sm leading-6 text-slate-300">{plan.humanControl}</p>
            <p className="mt-2 text-sm font-semibold text-white">{plan.nextStep}</p>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <StageButton action={{ type: "save_plan", label: "Save this plan" }} onAction={onAction} variant="primary">
              Save this plan
            </StageButton>
            <StageButton action={{ type: "book", label: "Book a 30-min call" }} onAction={onAction}>
              Book a 30-min call
            </StageButton>
            <StageButton action={{ type: "adjust_plan", label: "Adjust plan" }} onAction={onAction}>
              Adjust plan
            </StageButton>
          </div>
        </>
      ) : (
        <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4 text-sm leading-6 text-slate-300">
          Start from “Build my plan” in chat. The preview is generated locally before any email is requested.
        </div>
      )}
      <FooterLinks />
    </StageScroll>
  );
}

function ContactStage({ onAction }: Props) {
  return (
    <StageScroll>
      <StageHeader
        kicker="Contact"
        title="Book a practical 30-minute call"
        copy="Pick a 30-minute slot. I'll use the call to understand your workflow, growth problem or product opportunity and suggest a practical next step."
      />
      <div className="rounded-lg border border-white/10 bg-black/25 p-5">
        <div className="flex flex-wrap gap-2">
          <StageButton action={{ type: "book", label: "Open calendar" }} onAction={onAction} variant="primary">
            Open calendar
          </StageButton>
          <StageButton action={{ type: "email", label: "Email Felipe" }} onAction={onAction}>
            Email Felipe
          </StageButton>
        </div>
        <div className="mt-5 rounded-lg border border-cyan-300/15 bg-cyan-300/[0.06] p-4">
          <p className="text-sm font-semibold text-white">30-minute discovery call · Paris working hours</p>
          <ul className="mt-3 grid gap-2 text-sm leading-6 text-slate-300">
            {["workflow/problem", "current tools", "possible system", "practical next step"].map((item) => (
              <li className="pl-3 before:-ml-3 before:pr-2 before:text-cyan-100/60 before:content-['•']" key={item}>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-5 grid gap-3 text-sm text-slate-300">
          <a className="rounded-lg border border-white/10 bg-white/[0.04] p-3 transition hover:text-white" href={`mailto:${EMAIL}`}>
            {EMAIL}
          </a>
          <a className="rounded-lg border border-white/10 bg-white/[0.04] p-3 transition hover:text-white" href={LINKEDIN} rel="noopener noreferrer" target="_blank">
            LinkedIn
          </a>
          <a className="rounded-lg border border-white/10 bg-white/[0.04] p-3 transition hover:text-white" href={GITHUB} rel="noopener noreferrer" target="_blank">
            GitHub
          </a>
        </div>
      </div>
      <FooterLinks />
    </StageScroll>
  );
}

function StageHeader({ copy, kicker, title }: { copy: string; kicker: string; title: string }) {
  return (
    <div className="mb-5 max-w-3xl">
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-100/60">{kicker}</p>
      <h2 className="mt-2 text-2xl font-semibold tracking-[0] text-white md:text-3xl">{title}</h2>
      <p className="mt-3 text-sm leading-6 text-slate-300/80 md:text-base">{copy}</p>
    </div>
  );
}

function StageScroll({ children }: { children: React.ReactNode }) {
  return (
    <div className="pointer-events-auto h-full overflow-y-auto px-4 pb-6 pt-4 [scrollbar-width:none] md:px-6 md:pb-8 md:pt-6 [&::-webkit-scrollbar]:hidden">
      <div className="mx-auto max-w-5xl">{children}</div>
    </div>
  );
}

function MetricStrip() {
  const metrics = ["12+ years", "+25% conversion", "-30% CAC", "€200K+ recovered", "€3M+ budget"];
  return (
    <div className="mb-5 grid gap-2 sm:grid-cols-2 xl:grid-cols-5">
      {metrics.map((metric) => (
        <div className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm font-semibold text-white" key={metric}>
          {metric}
        </div>
      ))}
    </div>
  );
}

function Timeline({ compact = false }: { compact?: boolean }) {
  const items = compact ? publicCV.experience.slice(0, 3) : publicCV.experience;
  return (
    <div className="grid gap-3">
      {items.map((item) => (
        <article className="rounded-lg border border-white/10 bg-white/[0.04] p-4" key={`${item.company}-${item.role}`}>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="text-base font-semibold text-white">{item.company}</h3>
              <p className="mt-1 text-sm text-cyan-100/75">{item.role}</p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {item.metrics.slice(0, 3).map((metric) => (
                <span className="rounded-full border border-white/10 bg-black/20 px-2 py-1 text-[0.68rem] text-slate-300" key={metric}>
                  {metric}
                </span>
              ))}
            </div>
          </div>
          <ul className="mt-3 grid gap-2 text-sm leading-6 text-slate-300/80">
            {item.bullets.slice(0, compact ? 2 : 4).map((bullet) => (
              <li className="pl-3 before:-ml-3 before:pr-2 before:text-cyan-100/60 before:content-['•']" key={bullet}>
                {bullet}
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}

function MockupFlow({ nodes }: { nodes: string[] }) {
  return (
    <div className="mt-4 rounded-lg border border-white/10 bg-[linear-gradient(135deg,rgba(139,92,246,0.12),rgba(20,184,166,0.08))] p-4">
      <p className="font-mono text-xs uppercase tracking-[0.16em] text-cyan-100/55">Capabilities</p>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {nodes.map((node, index) => (
          <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-black/20 p-2 text-sm text-slate-200" key={node}>
            <span className="grid h-6 w-6 place-items-center rounded-full bg-cyan-300/15 text-[0.65rem] font-bold text-cyan-100">
              {index + 1}
            </span>
            {node}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function StagePanel(props: Props) {
  if (props.stage.activeTopic === "intro") return <IntroStage />;
  if (props.stage.activeTopic === "services") return <ServicesStage {...props} />;
  if (props.stage.activeTopic === "proof") return <ProofStage {...props} />;
  if (props.stage.activeTopic === "recruiting") return <RecruitingStage {...props} />;
  if (props.stage.activeTopic === "cv") return <CVStage {...props} />;
  if (props.stage.activeTopic === "solutionBuilder") return <SolutionStage {...props} />;
  return <ContactStage {...props} />;
}

import Link from "next/link";
import { services } from "@/data/services";
import { caseStudies } from "@/data/caseStudies";
import { solutions, capabilityGroups, landingPathForSolution } from "@/data/solutions";
import { getBookingHref, getBookingTarget, hasBookingUrl } from "@/lib/booking";

const EMAIL = "me@felipeos.com";

const headlineMetrics: [string, string][] = [
  ["12+ yrs", "Product, growth & AI systems"],
  ["+25%", "Conversion lift from experimentation"],
  ["-30%", "CAC through sharper funnel work"],
  ["€200K+", "Recovered from wasted ad spend"],
  ["€3M+", "Annual ad budget operated"],
];

const processSteps: { step: string; title: string; copy: string }[] = [
  {
    step: "01",
    title: "Discovery call (30 min)",
    copy: "We map the workflow that's costing you time or money, the tools you already use, and what a win looks like in the next few weeks.",
  },
  {
    step: "02",
    title: "Fixed-scope sprint",
    copy: "I build a working prototype or audit on a fixed scope and timeline — no open-ended retainers, no surprise invoices.",
  },
  {
    step: "03",
    title: "Handoff & measure",
    copy: "You get a usable system, the integration plan, and the metrics to prove it's working. We decide together what to build next.",
  },
];

function BookButton({
  children,
  variant = "primary",
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}) {
  return (
    <a
      href={getBookingHref()}
      rel={hasBookingUrl() ? "noopener noreferrer" : undefined}
      target={getBookingTarget()}
      className={
        variant === "primary"
          ? "inline-flex min-h-[44px] items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-cyan-100"
          : "inline-flex min-h-[44px] items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-cyan-300/40 hover:text-white"
      }
    >
      {children}
    </a>
  );
}

function SectionHead({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy?: string;
}) {
  return (
    <div className="mx-auto mb-10 max-w-2xl text-center">
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-200/70">{eyebrow}</p>
      <h2 className="mt-3 text-2xl font-semibold text-white sm:text-3xl md:text-4xl">{title}</h2>
      {copy ? <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-300/80 md:text-base">{copy}</p> : null}
    </div>
  );
}

function ValueProp() {
  return (
    <section className="border-t border-white/10 px-5 py-16 md:px-10 md:py-24" id="what">
      <div className="mx-auto max-w-3xl text-center">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-200/70">
          AI automation for small teams
        </p>
        <h2 className="mt-4 text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-5xl">
          I build AI systems that take the repetitive work off your team&apos;s plate.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-300/85 md:text-lg">
          Support replies, lead follow-up, admin, reporting — the manual tasks that quietly eat your
          week. I design and ship working automations in weeks, not months, on a fixed scope and price.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <BookButton>Book a 30-min call</BookButton>
          <a
            href="#solutions"
            className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-cyan-300/40 hover:text-white"
          >
            See what I build
          </a>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section className="border-t border-white/10 px-5 py-16 md:px-10 md:py-24" id="services">
      <SectionHead
        eyebrow="Services"
        title="Practical builds, not slide decks"
        copy="Fixed-scope offers for teams that need a usable system. Each one starts with a single high-value workflow."
      />
      <p className="mx-auto mb-6 max-w-2xl text-center text-sm text-slate-400">
        Not sure which fits?{" "}
        <a href="#top" className="font-semibold text-cyan-200 underline-offset-4 hover:underline">
          Build a free plan in the chat
        </a>{" "}
        — answer a few questions and get a scoped workflow back.
      </p>
      <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2">
        {services.map((service) => (
          <article
            key={service.id}
            className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition hover:border-cyan-300/30"
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-lg font-semibold text-white">{service.title}</h3>
              <span className="whitespace-nowrap rounded-full border border-amber-200/20 bg-amber-200/10 px-2.5 py-1 text-[0.7rem] font-medium text-amber-100">
                {service.timeline}
              </span>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-300/80">{service.oneLiner}</p>
            <p className="mt-3 text-xs leading-5 text-slate-400">{service.bestFor}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {service.deliverables.map((d) => (
                <span
                  key={d}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[0.7rem] text-slate-200"
                >
                  {d}
                </span>
              ))}
            </div>
            <p className="mt-5 text-sm font-semibold text-cyan-100">{service.priceRange}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Proof() {
  // Show the three strongest, results-led cases up front.
  const featured = caseStudies.filter((c) =>
    ["growth-audit-experimentation-system", "paid-media-operating-layer", "ai-support-assistant"].includes(c.id),
  );

  return (
    <section className="border-t border-white/10 px-5 py-16 md:px-10 md:py-24" id="proof">
      <SectionHead
        eyebrow="Proof of work"
        title="Real systems, real outcomes"
        copy="Anonymized to protect clients — but the problems, systems and results are real."
      />

      <div className="mx-auto mb-12 grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {headlineMetrics.map(([value, label]) => (
          <div key={value} className="rounded-xl border border-white/10 bg-white/[0.04] p-4 text-center">
            <p className="text-xl font-bold text-white md:text-2xl">{value}</p>
            <p className="mt-1 text-[0.7rem] leading-4 text-slate-400">{label}</p>
          </div>
        ))}
      </div>

      <div className="mx-auto grid max-w-5xl gap-4 lg:grid-cols-3">
        {featured.map((c) => (
          <article key={c.id} className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-cyan-200/60">{c.client}</p>
            <h3 className="mt-2 text-base font-semibold text-white">{c.title}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-300/80">{c.problem}</p>
            <div className="mt-4 rounded-lg border border-cyan-300/20 bg-cyan-300/[0.07] p-3">
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-cyan-100/70">Result</p>
              <p className="mt-1 text-sm font-medium leading-6 text-white">{c.result}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Process() {
  return (
    <section className="border-t border-white/10 px-5 py-16 md:px-10 md:py-24" id="process">
      <SectionHead eyebrow="How we work" title="From messy workflow to working system" />
      <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-3">
        {processSteps.map((s) => (
          <article key={s.step} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <p className="font-mono text-sm font-bold text-cyan-200/80">{s.step}</p>
            <h3 className="mt-3 text-base font-semibold text-white">{s.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-300/80">{s.copy}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section className="border-t border-white/10 px-5 py-16 md:px-10 md:py-24" id="pricing">
      <SectionHead
        eyebrow="Pricing"
        title="Clear ranges, value-based"
        copy="Mid-market pricing for senior, end-to-end delivery — I compete on outcomes, not on being the cheapest. Your exact scope and price are agreed on the call."
      />
      <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-white/10">
        {services.map((service, i) => (
          <div
            key={service.id}
            className={`flex items-center justify-between gap-4 px-5 py-4 ${
              i !== 0 ? "border-t border-white/10" : ""
            } ${i % 2 === 1 ? "bg-white/[0.02]" : ""}`}
          >
            <div>
              <p className="text-sm font-semibold text-white">{service.title}</p>
              <p className="mt-0.5 text-xs text-slate-400">{service.timeline}</p>
            </div>
            <p className="whitespace-nowrap text-sm font-semibold text-cyan-100">{service.priceRange}</p>
          </div>
        ))}
      </div>
      <p className="mx-auto mt-4 max-w-3xl text-center text-xs text-slate-400">
        Specific solutions (AI assistant, support &amp; prospecting agents, RAG, OpenCLAW) are scoped individually —
        see ranges above. Optional ongoing care &amp; tuning plans from €500/mo.
      </p>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="border-t border-white/10 px-5 py-16 md:px-10 md:py-24" id="contact">
      <div className="mx-auto max-w-2xl rounded-3xl border border-cyan-300/20 bg-[linear-gradient(160deg,rgba(139,92,246,0.12),rgba(34,211,238,0.08))] p-8 text-center md:p-12">
        <h2 className="text-2xl font-semibold text-white sm:text-3xl">
          Got a workflow that&apos;s eating your week?
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-200/85 md:text-base">
          Book a free 30-minute call. Bring the messy version — we&apos;ll map it and find the first
          thing worth automating.
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <BookButton>Book a 30-min call</BookButton>
          <a
            href={`mailto:${EMAIL}?subject=${encodeURIComponent("Project enquiry")}`}
            className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-cyan-300/40 hover:text-white"
          >
            Email instead
          </a>
        </div>
        <p className="mt-6 text-xs text-slate-400">
          Prefer to explore first?{" "}
          <Link href="/portfolio" className="text-cyan-200 underline-offset-4 hover:underline">
            See the full portfolio
          </Link>
          .
        </p>
      </div>
    </section>
  );
}

function Solutions() {
  return (
    <section className="border-t border-white/10 px-5 py-16 md:px-10 md:py-24" id="solutions">
      <SectionHead
        eyebrow="What I can build for you"
        title="Ready-to-deploy AI solutions"
        copy="Concrete, productized builds — pick the outcome you need. Each is scoped to your tools and shipped end-to-end."
      />
      <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {solutions.map((s) => (
          <article
            key={s.id}
            className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition hover:border-cyan-300/30"
          >
            <h3 className="text-base font-semibold text-white">{s.title}</h3>
            <p className="mt-2 flex-1 text-sm leading-6 text-slate-300/80">{s.blurb}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {s.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-cyan-300/20 bg-cyan-300/[0.06] px-2.5 py-1 text-[0.68rem] text-cyan-100/90"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-cyan-100">{s.priceRange}</p>
              <Link
                href={landingPathForSolution(s.id)}
                className="text-xs font-semibold text-cyan-200 underline-offset-4 hover:underline"
              >
                Learn more →
              </Link>
            </div>
          </article>
        ))}
      </div>
      <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-slate-400">
        Need something else?{" "}
        <a href="#top" className="font-semibold text-cyan-200 underline-offset-4 hover:underline">
          Describe it in the chat
        </a>{" "}
        and I&apos;ll scope it with you.
      </p>
    </section>
  );
}

function Capabilities() {
  return (
    <section className="border-t border-white/10 px-5 py-16 md:px-10 md:py-24" id="capabilities">
      <SectionHead
        eyebrow="Under the hood"
        title="The AI engineering behind the work"
        copy="Not prompts in a spreadsheet — production AI systems built on a modern, well-understood stack."
      />
      <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2">
        {capabilityGroups.map((group) => (
          <div key={group.label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-cyan-200/70">{group.label}</h3>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[0.72rem] text-slate-200"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function HomeMarketing() {
  return (
    <div className="relative z-[110] bg-[#080810]">
      <ValueProp />
      <Solutions />
      <Services />
      <Proof />
      <Capabilities />
      <Process />
      <Pricing />
      <FinalCTA />
    </div>
  );
}

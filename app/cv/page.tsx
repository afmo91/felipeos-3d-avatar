import type { Metadata } from "next";
import { getBaseCV, type BaseCV } from "@/lib/cv";
import { getBookingHref, getBookingTarget, hasBookingUrl } from "@/lib/booking";
import { readActivePublicCV } from "@/lib/supabase/browser";

export const metadata: Metadata = {
  title: "CV",
  description: "Curriculum vitae for Felipe Mejia — Product Builder & AI Systems.",
};

const TEAL = "#1a5c71";
const BLUE = "#357da2";

function SectionTitle({ children }: { children: string }) {
  return (
    <h2
      className="mb-2 text-[0.8rem] font-bold uppercase tracking-[0.12em]"
      style={{ color: BLUE }}
    >
      {children}
    </h2>
  );
}

export default async function PublicCVPage() {
  const cv = (await readActivePublicCV<BaseCV>()) ?? getBaseCV();
  const competences = cv.competences ?? Object.values(cv.skills).flat();
  const education = cv.education ?? [];

  return (
    <section className="px-4 py-10 md:px-8 md:py-14">
      {/* Toolbar */}
      <div className="mx-auto mb-6 flex max-w-[900px] flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-gray-400">
          Edit content in <code className="text-gray-300">data/cv/base.json</code> — the web CV and the PDF update together.
        </p>
        <div className="flex flex-wrap gap-2">
          <a className="hub-btn-primary" download href="/api/download/cv">
            Download PDF
          </a>
          <a
            className="hub-btn-secondary"
            href={getBookingHref()}
            rel={hasBookingUrl() ? "noopener noreferrer" : undefined}
            target={getBookingTarget()}
          >
            Book a 30-min call
          </a>
        </div>
      </div>

      {/* Paper-style CV document */}
      <article
        className="mx-auto max-w-[900px] rounded-lg bg-white p-7 text-[#323232] shadow-[0_20px_60px_rgba(0,0,0,0.45)] md:p-12"
        style={{ lineHeight: 1.5 }}
      >
        {/* Header */}
        <header className="flex flex-wrap items-baseline gap-x-3 border-b-2 pb-3" style={{ borderColor: TEAL }}>
          <h1 className="text-2xl font-extrabold uppercase tracking-wide md:text-3xl" style={{ color: TEAL }}>
            {cv.name}
          </h1>
          <p className="text-base font-medium uppercase tracking-wide md:text-lg" style={{ color: BLUE }}>
            | {cv.title}
          </p>
        </header>

        <div className="mt-7 grid gap-8 md:grid-cols-[33%_1fr] md:gap-10">
          {/* Left rail */}
          <aside className="text-[0.84rem]">
            <div className="mb-7">
              <SectionTitle>Contact</SectionTitle>
              <p className="break-words">
                <a className="hover:underline" href={`mailto:${cv.contact.email}`}>
                  {cv.contact.email}
                </a>
              </p>
              <p className="break-words">
                <a className="hover:underline" href={cv.contact.linkedin.url} rel="noopener noreferrer" target="_blank">
                  {cv.contact.linkedin.url}
                </a>
              </p>
              <p className="break-words">
                <a className="hover:underline" href={cv.contact.github.url} rel="noopener noreferrer" target="_blank">
                  {cv.contact.github.url}
                </a>
              </p>
            </div>

            <div className="mb-7">
              <SectionTitle>Skills</SectionTitle>
              <ul className="space-y-1">
                {competences.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            {education.length ? (
              <div className="mb-7">
                <SectionTitle>Education</SectionTitle>
                {education.map((ed) => (
                  <div className="mb-2.5" key={`${ed.degree}-${ed.school}`}>
                    <p className="font-semibold">{ed.degree}</p>
                    <p className="text-[#606060]">{ed.school}</p>
                  </div>
                ))}
              </div>
            ) : null}

            {cv.languages?.length ? (
              <div>
                <SectionTitle>Languages</SectionTitle>
                <ul className="space-y-1">
                  {cv.languages.map((lang) => (
                    <li key={lang}>{lang}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </aside>

          {/* Right column */}
          <div className="text-[0.9rem]">
            <div className="mb-7">
              <SectionTitle>Profile</SectionTitle>
              <p>{cv.summary.join(" ")}</p>
            </div>

            <div>
              <SectionTitle>Experience</SectionTitle>
              <div className="space-y-5">
                {cv.experience.map((item) => (
                  <div key={`${item.company}-${item.role}`}>
                    <h3 className="font-bold" style={{ color: BLUE }}>
                      {item.company} — {item.role}
                    </h3>
                    {item.period ? <p className="text-[0.78rem] text-[#606060]">{item.period}</p> : null}
                    <ul className="mt-1.5 space-y-1.5">
                      {item.bullets.map((bullet) => (
                        <li className="flex gap-2" key={bullet}>
                          <span style={{ color: BLUE }}>•</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}

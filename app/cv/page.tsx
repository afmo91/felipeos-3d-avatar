import type { Metadata } from "next";
import { getBaseCV, type BaseCV } from "@/lib/cv";
import { getBookingHref, getBookingTarget, hasBookingUrl } from "@/lib/booking";
import { readActivePublicCV } from "@/lib/supabase/browser";

export const metadata: Metadata = {
  title: "Public CV",
  description: "Public interactive CV for Felipe Mejia, Product & Growth Leader and AI Systems Builder.",
};

export default async function PublicCVPage() {
  const cv = (await readActivePublicCV<BaseCV>()) ?? getBaseCV();
  const bookingHref = getBookingHref();
  const bookingTarget = getBookingTarget();

  return (
    <section className="section">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-4xl">
          <p className="eyebrow">Public CV</p>
          <h1 className="section-title">{cv.name}</h1>
          <p className="text-xl font-semibold text-white">{cv.title}</p>
          <p className="mt-5 text-lg leading-8 text-gray-300">{cv.summary[0]}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a className="hub-btn-primary" download href="/api/download/cv">
              Download CV
            </a>
            <a
              className="hub-btn-secondary"
              href={bookingHref}
              rel={hasBookingUrl() ? "noopener noreferrer" : undefined}
              target={bookingTarget}
            >
              Book a 30-min call
            </a>
          </div>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {["12+ years", "+25% conversion", "-30% CAC", "€200K+ recovered", "€3M+ budget"].map((metric) => (
            <div className="stat-card" key={metric}>
              <p className="stat-value text-2xl">{metric}</p>
              <p className="stat-label">selected signal</p>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-5">
          {cv.experience.map((item) => (
            <article className="glow-panel" key={`${item.company}-${item.role}`}>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold text-white">{item.company}</h2>
                  <p className="mt-1 text-accent2">{item.role}</p>
                </div>
                <div className="flex max-w-xl flex-wrap gap-2">
                  {item.metrics.map((metric) => (
                    <span className="result-badge" key={metric}>
                      {metric}
                    </span>
                  ))}
                </div>
              </div>
              <ul className="mt-5 grid gap-3 text-gray-300">
                {item.bullets.map((bullet) => (
                  <li className="leading-7" key={bullet}>
                    {bullet}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <section className="glow-panel">
            <h2 className="text-2xl font-semibold text-white">Skills</h2>
            <div className="mt-5 grid gap-4">
              {Object.entries(cv.skills).map(([group, values]) => (
                <div key={group}>
                  <h3 className="font-semibold text-accent2">{group}</h3>
                  <p className="mt-2 leading-7 text-gray-300">{values.join(", ")}</p>
                </div>
              ))}
            </div>
          </section>
          <section className="glow-panel">
            <h2 className="text-2xl font-semibold text-white">Tools & Languages</h2>
            <h3 className="mt-5 font-semibold text-accent2">Tools</h3>
            <p className="mt-2 leading-7 text-gray-300">{cv.tools?.join(", ")}</p>
            <h3 className="mt-5 font-semibold text-accent2">Languages</h3>
            <p className="mt-2 leading-7 text-gray-300">{cv.languages?.join(", ")}</p>
          </section>
        </div>
      </div>
    </section>
  );
}

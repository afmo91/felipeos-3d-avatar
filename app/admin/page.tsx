import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getBaseCV } from "@/lib/cv";
import { hasSupabaseServerConfig } from "@/lib/supabase/server";

export const metadata = { title: "Admin | Felipe OS" };

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login?callbackUrl=/admin");

  const cv = getBaseCV();
  const supabaseReady = hasSupabaseServerConfig();

  return (
    <div className="admin-root">
      <div style={{ margin: "0 auto", maxWidth: "64rem" }}>
        <p className="eyebrow">Protected</p>
        <h1 style={{ fontSize: "2rem", fontWeight: 800, letterSpacing: "-0.03em", marginTop: "0.75rem" }}>
          Felipe OS Admin
        </h1>
        <p style={{ color: "var(--muted)", fontSize: "0.95rem", lineHeight: 1.7, marginTop: "0.75rem" }}>
          Protected scaffold for public CV editing, tailored application versions and lead storage. Public visitors can read the CV and download the PDF without login.
        </p>

        <section className="glow-panel" style={{ marginTop: "2rem" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "space-between" }}>
            <div>
              <h2 style={{ color: "#fff", fontSize: "1.25rem", fontWeight: 700 }}>Storage status</h2>
              <p style={{ color: "var(--muted)", lineHeight: 1.7, marginTop: "0.5rem" }}>
                Supabase server configuration is {supabaseReady ? "available" : "missing"}. Lead saves fail gracefully when env vars are absent.
              </p>
            </div>
            <span
              style={{
                alignSelf: "flex-start",
                background: supabaseReady ? "rgba(52,211,153,0.12)" : "rgba(251,191,36,0.12)",
                border: `1px solid ${supabaseReady ? "rgba(52,211,153,0.3)" : "rgba(251,191,36,0.3)"}`,
                color: supabaseReady ? "#bbf7d0" : "#fde68a",
                fontSize: "0.8rem",
                padding: "0.45rem 0.75rem",
              }}
            >
              {supabaseReady ? "Connected" : "Env needed"}
            </span>
          </div>
          <div style={{ marginTop: "1.25rem" }}>
            <code style={{ color: "var(--accent2)", fontFamily: "var(--font-geist-mono)" }}>
              supabase/schema.sql
            </code>
            <p style={{ color: "var(--muted)", lineHeight: 1.7, marginTop: "0.5rem" }}>
              Defines leads, public_cv and cv_versions. Use the secret API key only from server routes.
            </p>
          </div>
        </section>

        <section className="glow-panel" style={{ marginTop: "1.25rem" }}>
          <h2 style={{ color: "#fff", fontSize: "1.25rem", fontWeight: 700 }}>Public CV source</h2>
          <p style={{ color: "var(--muted)", lineHeight: 1.7, marginTop: "0.5rem" }}>
            Current local fallback is <code>data/cv/base.json</code>. When Supabase is configured, store the same JSON shape in <code>public_cv.data</code> and keep one active row.
          </p>
          <div style={{ marginTop: "1rem", overflowX: "auto" }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Field</th>
                  <th>Current value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Name</td>
                  <td>{cv.name}</td>
                </tr>
                <tr>
                  <td>Title</td>
                  <td>{cv.title}</td>
                </tr>
                <tr>
                  <td>Roles</td>
                  <td>{cv.experience.map((item) => item.company).join(", ")}</td>
                </tr>
                <tr>
                  <td>Public PDF</td>
                  <td>
                    <a className="footer-link" download href="/api/download/cv">
                      /api/download/cv
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="glow-panel" style={{ marginTop: "1.25rem" }}>
          <h2 style={{ color: "#fff", fontSize: "1.25rem", fontWeight: 700 }}>CV versions</h2>
          <p style={{ color: "var(--muted)", lineHeight: 1.7, marginTop: "0.5rem" }}>
            Tailored versions should start from the public CV JSON, add role-specific emphasis, and remain private unless <code>is_public</code> is explicitly enabled.
          </p>
          <div style={{ marginTop: "1rem", overflowX: "auto" }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Version</th>
                  <th>Target</th>
                  <th>Storage</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Product / AI Systems", "Product, AI PM and systems roles", "cv_versions"],
                  ["Growth", "Growth product, acquisition and experimentation roles", "cv_versions"],
                  ["Consulting", "Client proposals and consulting briefs", "cv_versions"],
                ].map(([name, target, storage]) => (
                  <tr key={name}>
                    <td>{name}</td>
                    <td>{target}</td>
                    <td>{storage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="glow-panel" style={{ marginTop: "1.25rem" }}>
          <h2 style={{ color: "#fff", fontSize: "1.25rem", fontWeight: 700 }}>Lead capture</h2>
          <p style={{ color: "var(--muted)", lineHeight: 1.7, marginTop: "0.5rem" }}>
            Anonymous chats stay in localStorage only. The solution builder posts to <code>/api/leads</code> after an email is provided, then inserts into <code>leads</code>.
          </p>
        </section>
      </div>
    </div>
  );
}

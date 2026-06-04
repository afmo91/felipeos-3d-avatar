import React from "react";
import { Document, Page, StyleSheet, Text, View, renderToBuffer } from "@react-pdf/renderer";
import { getBaseCV, type BaseCV } from "@/lib/cv";
import { readActivePublicCV } from "@/lib/supabase/browser";

export const runtime = "nodejs";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    color: "#111827",
    fontFamily: "Helvetica",
    fontSize: 9.2,
    lineHeight: 1.34,
    paddingBottom: 28,
    paddingHorizontal: 34,
    paddingTop: 30,
  },
  header: {
    borderBottomColor: "#d1d5db",
    borderBottomWidth: 1,
    marginBottom: 10,
    paddingBottom: 8,
  },
  name: {
    fontSize: 20,
    fontWeight: 700,
  },
  title: {
    color: "#374151",
    fontSize: 10.5,
    marginTop: 3,
  },
  contact: {
    color: "#4b5563",
    fontSize: 8.6,
    marginTop: 5,
  },
  section: {
    marginTop: 8,
  },
  sectionTitle: {
    color: "#111827",
    fontSize: 9.4,
    fontWeight: 700,
    letterSpacing: 0.8,
    marginBottom: 4,
    textTransform: "uppercase",
  },
  summary: {
    color: "#1f2937",
  },
  roleHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  company: {
    fontSize: 10,
    fontWeight: 700,
  },
  role: {
    color: "#374151",
    fontSize: 9,
  },
  metrics: {
    color: "#4b5563",
    fontSize: 8.2,
    marginBottom: 2,
  },
  bullet: {
    marginBottom: 1.5,
    paddingLeft: 8,
  },
  compactLine: {
    color: "#1f2937",
    marginBottom: 2,
  },
});

function Section({ children, title }: { children?: React.ReactNode; title: string }) {
  return React.createElement(
    View,
    { style: styles.section },
    React.createElement(Text, { style: styles.sectionTitle }, title),
    children,
  );
}

function Bullet({ children }: { children?: string }) {
  return React.createElement(Text, { style: styles.bullet }, `• ${children}`);
}

function CVDocument({ cv }: { cv: BaseCV }) {
  return React.createElement(
    Document,
    { author: cv.name, subject: cv.title, title: "Felipe Mejia CV" },
    React.createElement(
      Page,
      { size: "A4", style: styles.page },
      React.createElement(
        View,
        { style: styles.header },
        React.createElement(Text, { style: styles.name }, cv.name),
        React.createElement(Text, { style: styles.title }, cv.title),
        React.createElement(
          Text,
          { style: styles.contact },
          `${cv.contact.email} | ${cv.contact.linkedin.url} | ${cv.contact.github.url}`,
        ),
      ),
      React.createElement(Section, { title: "Summary" }, React.createElement(Text, { style: styles.summary }, cv.summary.join(" "))),
      React.createElement(
        Section,
        { title: "Experience" },
        cv.experience.map((item) =>
          React.createElement(
            View,
            { key: `${item.company}-${item.role}`, wrap: false },
            React.createElement(
              View,
              { style: styles.roleHeader },
              React.createElement(Text, { style: styles.company }, item.company),
              React.createElement(Text, { style: styles.role }, item.role),
            ),
            React.createElement(Text, { style: styles.metrics }, item.metrics.join(" | ")),
            item.bullets.slice(0, item.company === "Adamo Telecom" ? 6 : 4).map((bullet) =>
              React.createElement(Bullet, { key: bullet }, bullet),
            ),
          ),
        ),
      ),
      React.createElement(
        Section,
        { title: "Selected Achievements" },
        (cv.selectedAchievements ?? []).slice(0, 6).map((achievement) =>
          React.createElement(Bullet, { key: achievement }, achievement),
        ),
      ),
      React.createElement(
        Section,
        { title: "Skills" },
        Object.entries(cv.skills).map(([group, values]) =>
          React.createElement(
            Text,
            { key: group, style: styles.compactLine },
            `${group}: ${values.join(", ")}`,
          ),
        ),
      ),
      React.createElement(
        Section,
        { title: "Tools & Languages" },
        React.createElement(Text, { style: styles.compactLine }, `Tools: ${(cv.tools ?? []).join(", ")}`),
        React.createElement(Text, { style: styles.compactLine }, `Languages: ${(cv.languages ?? []).join(", ")}`),
      ),
    ),
  );
}

export async function GET() {
  const cv = (await readActivePublicCV<BaseCV>()) ?? getBaseCV();
  const document = React.createElement(CVDocument, { cv }) as unknown as Parameters<typeof renderToBuffer>[0];
  const buffer = await renderToBuffer(document);
  const body = new ArrayBuffer(buffer.byteLength);
  new Uint8Array(body).set(buffer);

  return new Response(body, {
    headers: {
      "Cache-Control": "public, max-age=300",
      "Content-Disposition": 'attachment; filename="Felipe-Mejia-CV.pdf"',
      "Content-Type": "application/pdf",
    },
  });
}

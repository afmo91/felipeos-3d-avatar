import React from "react";
import { Document, Page, StyleSheet, Text, View, renderToBuffer } from "@react-pdf/renderer";
import { getBaseCV, type BaseCV } from "@/lib/cv";
import { readActivePublicCV } from "@/lib/supabase/browser";

export const runtime = "nodejs";

// Palette taken from the reference CV.
const TEAL = "#1a5c71"; // name + strong headings
const BLUE = "#357da2"; // section labels + role titles
const INK = "#323232"; // body text
const MUTE = "#606060"; // secondary text

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    color: INK,
    fontFamily: "Helvetica",
    fontSize: 9.2,
    lineHeight: 1.4,
    paddingHorizontal: 36,
    paddingVertical: 34,
  },
  header: {
    borderBottomColor: TEAL,
    borderBottomWidth: 1.5,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "baseline",
    paddingBottom: 8,
    marginBottom: 14,
  },
  name: {
    color: TEAL,
    fontFamily: "Helvetica-Bold",
    fontSize: 21,
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  title: {
    color: BLUE,
    fontSize: 12,
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  body: {
    flexDirection: "row",
  },
  left: {
    width: "33%",
    paddingRight: 16,
  },
  right: {
    width: "67%",
  },
  sectionTitle: {
    color: BLUE,
    fontFamily: "Helvetica-Bold",
    fontSize: 9.6,
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 5,
  },
  block: {
    marginBottom: 14,
  },
  contactLine: {
    color: INK,
    marginBottom: 2,
  },
  bulletRow: {
    flexDirection: "row",
    marginBottom: 2.5,
  },
  bulletDot: {
    color: BLUE,
    width: 8,
  },
  bulletText: {
    flex: 1,
    color: INK,
  },
  compItem: {
    color: INK,
    marginBottom: 3,
  },
  summary: {
    color: INK,
    lineHeight: 1.45,
  },
  job: {
    marginBottom: 11,
  },
  jobTitle: {
    color: BLUE,
    fontFamily: "Helvetica-Bold",
    fontSize: 10,
    marginBottom: 1,
  },
  jobPeriod: {
    color: MUTE,
    fontSize: 8.4,
    marginBottom: 3,
  },
  eduDegree: {
    color: INK,
    fontFamily: "Helvetica-Bold",
  },
  eduSchool: {
    color: MUTE,
    marginBottom: 6,
  },
});

const h = React.createElement;

function Section({ children, title }: { children?: React.ReactNode; title: string }) {
  return h(View, { style: styles.block }, h(Text, { style: styles.sectionTitle }, title), children);
}

function Bullet({ children }: { children?: string }) {
  return h(
    View,
    { style: styles.bulletRow },
    h(Text, { style: styles.bulletDot }, "•"),
    h(Text, { style: styles.bulletText }, children),
  );
}

function CVDocument({ cv }: { cv: BaseCV }) {
  const competences = cv.competences ?? Object.values(cv.skills).flat();
  const education = cv.education ?? [];

  return h(
    Document,
    { author: cv.name, subject: cv.title, title: `${cv.name} CV` },
    h(
      Page,
      { size: "A4", style: styles.page },
      // Header
      h(
        View,
        { style: styles.header },
        h(Text, { style: styles.name }, `${cv.name}  `),
        h(Text, { style: styles.title }, `| ${cv.title}`),
      ),
      // Two columns
      h(
        View,
        { style: styles.body },
        // Left rail
        h(
          View,
          { style: styles.left },
          h(
            Section,
            { title: "Contact" },
            h(Text, { style: styles.contactLine }, cv.contact.email),
            h(Text, { style: styles.contactLine }, cv.contact.linkedin.url),
            h(Text, { style: styles.contactLine }, cv.contact.github.url),
          ),
          h(
            Section,
            { title: "Skills" },
            competences.map((item) => h(Text, { key: item, style: styles.compItem }, item)),
          ),
          education.length
            ? h(
                Section,
                { title: "Education" },
                education.map((ed) =>
                  h(
                    View,
                    { key: `${ed.degree}-${ed.school}` },
                    h(Text, { style: styles.eduDegree }, ed.degree),
                    h(Text, { style: styles.eduSchool }, ed.school),
                  ),
                ),
              )
            : null,
          cv.languages?.length
            ? h(
                Section,
                { title: "Languages" },
                cv.languages.map((lang) => h(Text, { key: lang, style: styles.compItem }, lang)),
              )
            : null,
        ),
        // Right column
        h(
          View,
          { style: styles.right },
          h(
            Section,
            { title: "Profile" },
            h(Text, { style: styles.summary }, cv.summary.join(" ")),
          ),
          h(
            Section,
            { title: "Experience" },
            cv.experience.map((item) =>
              h(
                View,
                { key: `${item.company}-${item.role}`, style: styles.job, wrap: false },
                h(Text, { style: styles.jobTitle }, `${item.company} — ${item.role}`),
                item.period ? h(Text, { style: styles.jobPeriod }, item.period) : null,
                item.bullets.map((bullet) => h(Bullet, { key: bullet }, bullet)),
              ),
            ),
          ),
        ),
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

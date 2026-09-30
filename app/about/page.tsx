import type { Metadata } from "next";
import Link from "next/link";
import { getSiteContent } from "@/lib/content";
import { SiteFooter, SiteHeader, Timeline } from "../site-components";

export const metadata: Metadata = { title: "About" };
export default function AboutPage() {
  const { about } = getSiteContent();
  return (
    <div className="site-frame">
      <SiteHeader />
      <main className="inner-page">
        <section className="page-intro"><p className="eyebrow">{about.eyebrow}</p><h1>{about.headline}</h1><p>{about.introduction}</p></section>
        <section className="about-grid">
          <div><p className="eyebrow">{about.valuesEyebrow}</p><h2>{about.valuesTitle}</h2></div>
          <div className="prose compact-prose">{about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
        </section>
        <section className="section" aria-labelledby="about-timeline-title">
          <div className="section-heading"><div><p className="eyebrow">{about.timelineEyebrow}</p><h2 id="about-timeline-title">{about.timelineTitle}</h2></div></div>
          <Timeline />
        </section>
        <div className="back-link"><Link href="/blog">{about.blogLinkLabel} <span aria-hidden="true">→</span></Link></div>
      </main>
      <SiteFooter />
    </div>
  );
}

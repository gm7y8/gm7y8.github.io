import type { Metadata } from "next";
import Link from "next/link";
import { getSiteContent } from "@/lib/content";
import { SiteFooter, SiteHeader, Timeline } from "../site-components";

export const metadata: Metadata = { title: "About" };
export default function AboutPage() {
  const { about, certifications } = getSiteContent();
  return (
    <div className="site-frame">
      <SiteHeader />
      <main className="inner-page">
        <section className="page-intro"><p className="eyebrow">{about.eyebrow}</p><h1>{about.headline}</h1><p>{about.introduction}</p></section>
        <section className="about-grid">
          <div><p className="eyebrow">{about.valuesEyebrow}</p><h2>{about.valuesTitle}</h2></div>
          <div className="prose compact-prose">{about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
        </section>
        <section className="section" aria-labelledby="certifications-title">
          <div className="section-heading">
            <div><p className="eyebrow">{about.certificationsEyebrow}</p><h2 id="certifications-title">{about.certificationsTitle}</h2></div>
            <a className="text-link" href="https://www.linkedin.com/in/gouthammuppala/details/certifications/" target="_blank" rel="noreferrer">{about.certificationsLinkLabel} <span aria-hidden="true">↗</span></a>
          </div>
          <div className="certification-grid">
            {certifications.map((certification) => (
              <article className="certification-card" key={certification.title}>
                <h3>{certification.title}</h3>
                {(certification.issuer || certification.issued || certification.credentialId) && (
                  <div className="certification-meta">
                    {certification.issuer && <p>{certification.issuer}</p>}
                    {certification.issued && <p>Issued {certification.issued}{certification.expires && ` · Expires ${certification.expires}`}</p>}
                    {certification.credentialId && <p>Credential ID {certification.credentialId}</p>}
                  </div>
                )}
              </article>
            ))}
          </div>
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

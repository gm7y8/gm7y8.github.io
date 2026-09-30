import Link from "next/link";
import { getSiteContent } from "@/lib/content";

export function SiteHeader() {
  const { site, navigation } = getSiteContent();
  return (
    <header className="site-header">
      <Link className="wordmark" href="/" aria-label={`${site.title} home`}>
        <span className="wordmark-mark" aria-hidden="true">●</span> {site.wordmark}
      </Link>
      <nav aria-label="Primary navigation">
        <Link href="/about">{navigation.about}</Link>
        <Link href="/#journey">{navigation.timeline}</Link>
        <Link href="/blog">{navigation.blog}</Link>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  const { site, profile } = getSiteContent();
  return (
    <footer className="site-footer">
      <p>{site.footer}</p>
      <div>
        {profile.email && <a href={`mailto:${profile.email}`}>Email</a>}
        {profile.social.map((item) => <a href={item.url} rel="noreferrer" key={item.label}>{item.label}</a>)}
      </div>
    </footer>
  );
}

export function Timeline() {
  const { timeline } = getSiteContent();
  return (
    <ol className="timeline">
      {timeline.entries.map((item) => (
        <li className={`timeline-item timeline-${item.type}`} key={`${item.year}-${item.title}`}>
          <div className="timeline-year">{item.year}</div>
          <div className="timeline-node" aria-hidden="true" />
          <article className="timeline-card">
            <h3>{item.title}</h3><p>{item.description}</p>
            <div className="chips">{item.skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
            {item.url && <a className="timeline-link" href={item.url} target="_blank" rel="noreferrer">{item.linkLabel ?? "View source"} <span aria-hidden="true">↗</span></a>}
          </article>
          {item.branch && <div className="timeline-branch"><span className="branch-node" />{item.branch}</div>}
        </li>
      ))}
    </ol>
  );
}

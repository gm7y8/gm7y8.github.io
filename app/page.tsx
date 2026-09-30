import Link from "next/link";
import { getSiteContent } from "@/lib/content";
import { SiteFooter, SiteHeader, Timeline } from "./site-components";

export default function Home() {
  const { home, posts, timeline } = getSiteContent();
  const featuredPosts = posts.filter((post) => post.featured);
  return (
    <div className="site-frame">
      <SiteHeader />
      <main>
        <section className="hero" aria-labelledby="hero-title">
          <p className="eyebrow">{home.eyebrow}</p><h1 id="hero-title">{home.headline}</h1>
          <p className="hero-copy">{home.introduction}</p>
          <div className="hero-actions">
            <Link className="button button-primary" href={home.primaryAction.url}>{home.primaryAction.label}</Link>
            <Link className="button button-quiet" href={home.secondaryAction.url}>{home.secondaryAction.label} <span aria-hidden="true">→</span></Link>
          </div>
        </section>
        <section className="section" id="journey" aria-labelledby="journey-title">
          <div className="section-heading">
            <div><p className="eyebrow">{home.timelineEyebrow}</p><h2 id="journey-title">{home.timelineTitle}</h2></div>
            <div className="legend" aria-label="Timeline legend">
              <span><i className="dot dot-work" />{timeline.legend.work}</span>
              <span><i className="dot dot-note" />{timeline.legend.note}</span>
            </div>
          </div>
          <Timeline />
        </section>
        <section className="section writing" aria-labelledby="writing-title">
          <div className="section-heading">
            <div><p className="eyebrow">{home.writingEyebrow}</p><h2 id="writing-title">{home.writingTitle}</h2></div>
            <Link className="text-link" href="/blog">{home.allPostsLabel} <span aria-hidden="true">→</span></Link>
          </div>
          <div className="post-list">
            {featuredPosts.map((post) => (
              <article className="post-row" key={post.slug}>
                <div className="post-meta"><span>{post.date}</span><span className="post-tag">{post.tag}</span></div>
                <div><h3><Link href={`/blog/${post.slug}`}>{post.title}</Link></h3><p>{post.excerpt}</p></div>
                <span className="post-arrow" aria-hidden="true">↗</span>
              </article>
            ))}
          </div>
        </section>
        <section className="note-card" aria-labelledby="note-title">
          <p className="eyebrow">{home.current.eyebrow}</p><h2 id="note-title">{home.current.title}</h2>
          <p>{home.current.description}</p>
          <Link className="text-link" href="/blog">{home.current.linkLabel} <span aria-hidden="true">→</span></Link>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

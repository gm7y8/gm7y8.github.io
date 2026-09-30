import type { Metadata } from "next";
import Link from "next/link";
import { getSiteContent } from "@/lib/content";
import { SiteFooter, SiteHeader } from "../site-components";

export const metadata: Metadata = { title: "Blog", description: "Notes on design, building, and learning." };
export default function BlogPage() {
  const { blog, posts } = getSiteContent();
  return (
    <div className="site-frame">
      <SiteHeader />
      <main className="inner-page">
        <section className="page-intro blog-intro"><p className="eyebrow">{blog.eyebrow}</p><h1>{blog.title}</h1><p>{blog.description}</p></section>
        <div className="blog-index">
          {posts.map((post, index) => (
            <article className="blog-card" id={post.slug} key={post.slug}>
              <div className="blog-count">{String(index + 1).padStart(2, "0")}</div>
              <div className="blog-card-body">
                <div className="post-meta"><span>{post.date}</span><span className="post-tag">{post.tag}</span><span>{post.readingTime}</span></div>
                <h2><Link href={`/blog/${post.slug}`}>{post.title}</Link></h2><p>{post.excerpt}</p>
              </div>
              <span className="post-arrow" aria-hidden="true">↗</span>
            </article>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

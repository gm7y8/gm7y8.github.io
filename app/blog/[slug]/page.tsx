import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getNextPost, getPost, getSiteContent, type PostBlock } from "@/lib/content";
import { SiteFooter, SiteHeader } from "../../site-components";

type PageProps = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return getSiteContent().posts.map((post) => ({ slug: post.slug })); }
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = getPost((await params).slug);
  return post ? { title: post.title, description: post.description } : {};
}
function ContentBlock({ block }: { block: PostBlock }) {
  if (block.type === "heading") return <h2>{block.text}</h2>;
  if (block.type === "quote") return <blockquote>{block.text}</blockquote>;
  if (block.type === "lead") return <p className="lead">{block.text}</p>;
  if (block.type === "paragraph") return <p>{block.text}</p>;
  if (block.type === "list") return <ul>{block.items.map((item) => <li key={item}>{item}</li>)}</ul>;
  if (block.type === "richParagraph") return <p>{block.parts.map((part, index) => part.url ? <a className="prose-link" href={part.url} target="_blank" rel="noreferrer" key={`${part.url}-${index}`}>{part.text}</a> : <span key={`text-${index}`}>{part.text}</span>)}</p>;
  if (block.type === "image") return (
    <figure className="post-image">
      <Image src={block.src} alt={block.alt} width={block.width} height={block.height} />
      {block.caption && <figcaption>{block.caption}</figcaption>}
    </figure>
  );
  return null;
}
export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const { blog } = getSiteContent();
  const nextPost = getNextPost(slug);
  return (
    <div className="site-frame">
      <SiteHeader />
      <main className="article-page">
        <article>
          <header className="article-header">
            <Link className="back-link-inline" href="/blog">← {blog.backLabel}</Link>
            <div className="post-meta"><span>{post.date}</span><span className="post-tag">{post.tag}</span><span>{post.readingTime} read</span></div>
            <h1>{post.title}</h1><p className="article-deck">{post.deck}</p>
          </header>
          <div className="prose">{post.body.map((block, index) => <ContentBlock block={block} key={`${block.type}-${index}`} />)}</div>
          {post.sourceUrl && <a className="article-source" href={post.sourceUrl} target="_blank" rel="noreferrer">{post.sourceLabel ?? "View source evidence"} <span aria-hidden="true">↗</span></a>}
        </article>
        {nextPost && <nav className="article-next" aria-label="Continue reading"><span>{blog.nextLabel}</span><Link href={`/blog/${nextPost.slug}`}>{nextPost.title} →</Link></nav>}
      </main>
      <SiteFooter />
    </div>
  );
}

import { parse } from "yaml";
import { readFileSync } from "node:fs";
import { join } from "node:path";

export type TimelineType = "work" | "project" | "note";
export type TimelineEntry = { year: string; type: TimelineType; title: string; description: string; skills: string[]; branch?: string; url?: string; linkLabel?: string };
export type Certification = { title: string; issuer?: string; issued?: string; expires?: string; credentialId?: string };
export type PostBlock =
  | { type: "lead" | "paragraph" | "heading" | "quote"; text: string }
  | { type: "list"; items: string[] }
  | { type: "richParagraph"; parts: Array<{ text: string; url?: string }> }
  | { type: "image"; src: string; alt: string; caption?: string; width: number; height: number };
export type Post = { slug: string; date: string; title: string; excerpt: string; description: string; tag: string; readingTime: string; deck: string; featured: boolean; sourceUrl?: string; sourceLabel?: string; body: PostBlock[] };

export type SiteContent = {
  site: { title: string; wordmark: string; description: string; shortDescription: string; url: string; footer: string };
  navigation: { about: string; timeline: string; blog: string };
  profile: { name: string; email: string; social: Array<{ label: string; url: string }> };
  home: { eyebrow: string; headline: string; introduction: string; primaryAction: { label: string; url: string }; secondaryAction: { label: string; url: string }; timelineEyebrow: string; timelineTitle: string; writingEyebrow: string; writingTitle: string; allPostsLabel: string; current: { eyebrow: string; title: string; description: string; linkLabel: string } };
  about: { eyebrow: string; headline: string; introduction: string; valuesEyebrow: string; valuesTitle: string; paragraphs: string[]; certificationsEyebrow: string; certificationsTitle: string; certificationsLinkLabel: string; timelineEyebrow: string; timelineTitle: string; blogLinkLabel: string };
  blog: { eyebrow: string; title: string; description: string; backLabel: string; nextLabel: string };
  certifications: Certification[];
  timeline: { legend: { work: string; note: string }; entries: TimelineEntry[] };
  posts: Post[];
};

const contentPath = join(process.cwd(), "content", "site.yaml");
const content = parse(readFileSync(contentPath, "utf8")) as SiteContent;
export const getSiteContent = () => content;
export const getPost = (slug: string) => content.posts.find((post) => post.slug === slug);
export function getNextPost(slug: string) {
  const index = content.posts.findIndex((post) => post.slug === slug);
  return index < 0 || content.posts.length < 2 ? undefined : content.posts[(index + 1) % content.posts.length];
}

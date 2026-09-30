import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("exports the primary pages", async () => {
  await Promise.all([
    access(new URL("out/index.html", root)),
    access(new URL("out/about/index.html", root)),
    access(new URL("out/blog/index.html", root)),
    access(new URL("out/blog/recipe-text-classification-graph-neural-networks/index.html", root)),
    access(new URL("out/blog/garbage-harvesting-deep-learning/index.html", root)),
    access(new URL("out/blog/smooth-streaming-mpeg-dash-sdn/index.html", root)),
  ]);
});

test("exports the custom domain and YAML content", async () => {
  const [cname, homepage] = await Promise.all([
    readFile(new URL("out/CNAME", root), "utf8"),
    readFile(new URL("out/index.html", root), "utf8"),
  ]);
  assert.equal(cname.trim(), "g24a.info");
  assert.match(homepage, /I build data systems and explore what comes next in AI/);
  assert.match(homepage, /https:\/\/g24a\.info/);
});

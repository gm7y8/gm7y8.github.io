import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("exports the primary pages", async () => {
  await Promise.all([
    access(new URL("out/index.html", root)),
    access(new URL("out/about/index.html", root)),
    access(new URL("out/blog/index.html", root)),
    access(new URL("out/blog/how-a-quantum-computer-could-break-rsa/index.html", root)),
    access(new URL("out/blog/recipe-text-classification-graph-neural-networks/index.html", root)),
    access(new URL("out/blog/garbage-harvesting-deep-learning/index.html", root)),
    access(new URL("out/blog/smooth-streaming-mpeg-dash-sdn/index.html", root)),
    access(new URL("out/blog/handmeup-hackprinceton/index.html", root)),
    access(new URL("out/blog/outbreak-monitor-techweek-kc/index.html", root)),
    access(new URL("out/blog/dream-home-hack-k-state/index.html", root)),
  ]);
});

test("exports the GitHub Pages URL and YAML content", async () => {
  const [homepage, about] = await Promise.all([
    readFile(new URL("out/index.html", root), "utf8"),
    readFile(new URL("out/about/index.html", root), "utf8"),
  ]);
  assert.match(homepage, /I build data systems and explore what comes next in AI/);
  assert.match(homepage, /https:\/\/gm7y8\.github\.io/);
  assert.match(about, /Neural Networks and Deep Learning/);
  assert.match(about, /Oracle PL\/SQL Developer Certified Associate/);
  assert.match(about, /Prometheus Certified Associate/);
  assert.match(about, /Certified Kubernetes Application Developer/);
  assert.match(about, /LF-pripf1jvla/);
  const quantumPost = await readFile(new URL("out/blog/how-a-quantum-computer-could-break-rsa/index.html", root), "utf8");
  assert.match(quantumPost, /How a Quantum Computer Could Break RSA/);
  assert.match(quantumPost, /Read Shor’s paper/);
  assert.match(quantumPost, /shors-algorithm-rsa-flowchart\.png/);
  assert.match(quantumPost, /Flowchart showing how a quantum computer/);
});

test("does not export references to the retired custom domain", async () => {
  const out = new URL("out/", root);
  const files = (await readdir(out, { recursive: true })).filter((file) => file.endsWith(".html"));
  for (const file of files) {
    const html = await readFile(new URL(file, out), "utf8");
    assert.doesNotMatch(html, /g24a\.info/, file);
  }
});

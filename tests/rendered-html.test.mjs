import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the research expansion preview", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /Oldest &amp; Best/);
  assert.match(html, /publication total: 51/);
  assert.match(html, /Browse 21 new passages/);
  assert.match(html, /Twenty-one new evidence records/);
});

test("ships all researched passage records and social metadata", async () => {
  const [page, layout] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
  ]);

  assert.equal((page.match(/\n    slug: "/g) ?? []).length, 21);
  assert.match(page, /Revelation 16:5/);
  assert.match(page, /Ephesians 3:9/);
  assert.match(page, /Source-checked/);
  assert.match(layout, /images: \[\{ url: "\/og\.png"/);
});

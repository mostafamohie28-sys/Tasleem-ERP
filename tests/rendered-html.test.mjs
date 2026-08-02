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

test("server-renders the Tasleem login shell", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Tasleem ERP — نموذج التصميم<\/title>/i);
  assert.match(html, /class="login-shell"/);
  assert.match(html, /منظومة التشغيل/);
  assert.match(html, /دخول إلى مساحة العمل/);
  assert.match(html, /tasleem-brand-board\.png/);
  assert.doesNotMatch(html, /Your site is taking shape|Building your site/);
});

test("keeps the accounting decision and mobile-navigation contracts in source", async () => {
  const [page, css, layout, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /finalShippingPayer/);
  assert.match(page, /function AlertsScreen/);
  assert.match(page, /اعتماد محاسب التشغيل لمتحمّل الشحن/);
  assert.match(page, /مرجع الراسل غير مسجل/);
  assert.match(page, /courierCommissionSnapshot/);
  assert.match(page, /captureCourierCommissionSnapshot/);
  assert.match(page, /الحساب لن يُغلق كصفر/);
  assert.match(page, /commissionDeferred/);
  assert.match(page, /tasleem-control-center-v2/);
  assert.match(css, /courier-payer-review/);
  assert.match(css, /courier-commission-gap/);
  assert.match(css, /@media \(max-width:\s*1120px\)[\s\S]*?\.sidebar\s*\{[\s\S]*?z-index:\s*75/);
  assert.match(layout, /Tasleem ERP/);
  assert.match(packageJson, /"build":\s*"vinext build"/);
});

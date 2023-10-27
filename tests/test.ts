import { expect, test } from "@playwright/test";

test("front page has a link to /new", async ({ page }) => {
  await page.goto("/");

  await page.click('a[href="/new"]');
  await page.waitForURL((url) => url.pathname === "/new");

  expect(true).toBe(true);
});

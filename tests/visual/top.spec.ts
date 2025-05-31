import { test, expect } from "@playwright/test";
import { TOP_PAGE_URL } from "../constant";

test("top page test", async ({ page }) => {
  await page.goto(TOP_PAGE_URL);
  await expect(page).toHaveScreenshot({
    fullPage: true,
    maxDiffPixels: 100,
  });
});

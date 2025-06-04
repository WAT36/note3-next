import { test, expect } from "@playwright/test";
import { TOP_PAGE_URL } from "../constant";

test("posts page test", async ({ page }) => {
  await page.goto(TOP_PAGE_URL + "/posts/index.html");
  await expect(page).toHaveScreenshot({
    fullPage: true,
    maxDiffPixels: 100,
  });
});

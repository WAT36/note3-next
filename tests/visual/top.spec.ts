import { test, expect } from "@playwright/test";
import { TOP_PAGE_URL } from "../constant";
import { doLogin } from "../login";

test("top page test", async ({ page }) => {
  await doLogin({ page, pageUrl: TOP_PAGE_URL });
  await expect(page).toHaveScreenshot({
    fullPage: true,
    maxDiffPixels: 100,
  });
});

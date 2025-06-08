import { test, expect } from "@playwright/test";
import { TOP_PAGE_URL } from "../constant";
import { doLogin } from "../login";

test("about page test", async ({ page }) => {
  await doLogin({ page, pageUrl: TOP_PAGE_URL + "/about/index.html" });
  await expect(page).toHaveScreenshot({
    fullPage: true,
    maxDiffPixels: 100,
  });
});

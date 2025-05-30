import { test, expect } from "@playwright/test";
import * as dotenv from "dotenv";
dotenv.config();

test("home example test", async ({ page }) => {
  await page.goto(process.env.PLAYWRIGHT_TEST_ROOTPAGE);
  await expect(page).toHaveScreenshot({
    fullPage: true,
    maxDiffPixels: 100,
  });
});

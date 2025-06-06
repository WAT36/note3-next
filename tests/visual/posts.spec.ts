import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import { test, expect } from "@playwright/test";
import { TOP_PAGE_URL } from "../constant";

test("posts page test", async ({ page }) => {
  await page.goto(TOP_PAGE_URL + "/posts/index.html");
  await expect(page).toHaveScreenshot({
    fullPage: true,
    maxDiffPixels: 100,
  });
});

test.describe("posts all article page test", () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const postsPath = path.resolve(__dirname, "../../_posts");
  const allEntries = fs.readdirSync(postsPath, { withFileTypes: true });

  const posts = allEntries
    .filter((entry) => entry.isFile())
    .map((file) => file.name);

  posts.map(async (post) => {
    test("posts (" + post.replace(".md", "") + ") test", async ({ page }) => {
      await page.goto(
        TOP_PAGE_URL + "/posts/" + post.replace(".md", "") + "/index.html",
        {
          timeout: 50000,
          waitUntil: "domcontentloaded",
        }
      );
      await expect(page).toHaveScreenshot(post.replace(".md", "") + ".png", {
        timeout: 50000,
        fullPage: true,
        maxDiffPixels: 100,
      });
    });
  });
});

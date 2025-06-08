import { expect, Page } from "@playwright/test";
import { LOGIN_PASSWORD, LOGIN_USERNAME } from "./constant";

type LoginTestProps = {
  page: Page;
  pageUrl: string;
};

export const doLogin = async (props: LoginTestProps) => {
  const { page, pageUrl } = props;
  await page.goto(pageUrl, {
    timeout: 30000,
    waitUntil: "domcontentloaded",
  });

  // Hosted UIのログイン画面にリダイレクトされたことを確認
  await expect(page).toHaveURL(/\/login/);

  // ログインフォームに入力
  const usernameInput = page.locator("#signInFormUsername").nth(1);
  await usernameInput.waitFor({ state: "visible" });
  await usernameInput.fill(LOGIN_USERNAME);

  const passwordInput = page.locator("#signInFormPassword").nth(1);
  await passwordInput.waitFor({ state: "visible" });
  await passwordInput.fill(LOGIN_PASSWORD);

  const button = page.locator('input[name="signInSubmitButton"]').nth(1);
  await button.waitFor({ state: "visible" });
  await button.click();

  // 記事ページに戻るのを待つ
  await page.waitForURL(pageUrl);
};

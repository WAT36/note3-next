import { join } from "path";

import { Administrator } from "../interfaces/author";

export const EXAMPLE_PATH = "blog-starter";
export const CMS_NAME = "Markdown";
export const HOME_OG_IMAGE_URL =
  "https://og-image.vercel.app/Next.js%20Blog%20Starter%20Example.png?theme=light&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg";
export const TITLE = "WAT Note(III).";
export const ADMINISTRATOR: Administrator = {
  name: "Tatsuroh Wakasugi",
  nickname: "WAT",
};

export const NOTES_DIR = join(process.cwd(), "_notes");

export const DIR_NAME = {
  "notes/container": "コンテナ",
  "notes/frontend": "フロントエンド",
  "notes/programming": "プログラミング",

  "frontend/001_html": "HTML",
};
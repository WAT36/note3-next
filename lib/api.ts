import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

const postsDirectory = join(process.cwd(), "_posts");

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  type Items = {
    [key: string]: string;
  };

  const items: Items = {};

  // .mdでdraft: trueとなっているものは作成しない（非表示）
  if (data["draft"] === true) {
    return null;
  }

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = realSlug;
    }
    if (field === "content") {
      items[field] = content;
    }

    if (typeof data[field] !== "undefined") {
      items[field] = data[field];
    }
  });

  return items;
}

export function getAllPosts(fields: string[] = []) {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    .filter((item) => {
      return item;
    })
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}

export async function getAuthTokens(code: string) {
  const congitoDomain = process.env.COGNITO_DOMAIN;
  const redirectUri = process.env.REDIRECT_URI;
  const clientId = process.env.CLIENT_ID;
  const clientSecret = process.env.CLIENT_SECRET;

  let props = {};
  if (
    localStorage.getItem("accessToken") &&
    localStorage.getItem("idToken") &&
    localStorage.getItem("refreshToken")
  ) {
    return {
      access_token: localStorage.getItem("accessToken"),
      id_token: localStorage.getItem("idToken"),
      refresh_token: localStorage.getItem("refreshToken"),
    };
  } else {
    const headers: HeadersInit = {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(`${clientId}:${clientSecret}`).toString("base64"),
    };
    const request: RequestInit = {
      method: "POST",
      headers: headers,
      body:
        `grant_type=authorization_code&client_id=${clientId}&redirect_uri=${redirectUri}&code=` +
        code,
    };
    const response = await fetch(
      `https://${congitoDomain}/oauth2/token`,
      request
    );
    try {
      const json = await response.json();
      console.log(json);
      if ("error" in json) {
        props = {
          error: json.error,
        };
      } else {
        const access_token = json.access_token;
        const id_token = json.id_token;
        const refresh_token = json.refresh_token;
        localStorage.setItem("accessToken", access_token);
        localStorage.setItem("idToken", id_token);
        localStorage.setItem("refreshToken", refresh_token);
        props = {
          access_token,
          id_token,
          refresh_token,
        };
      }
      return props;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}

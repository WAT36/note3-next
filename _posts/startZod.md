---
title: "Zod事始め"
excerpt: ""
coverImage: ""
date: "2026-04-09T23:15:46.000Z"
updatedAt: "2026-04-09T23:15:46.000Z"
tag: []
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
---

TypeScript を使っていると、「型があるから安全」と思いがちです。しかし TypeScript の型はあくまで **コンパイル時** のチェックであり、**ランタイム**（実行時）には一切存在しません。

例えば API レスポンスやフォーム入力など、**外部から入ってくるデータ** が本当に期待した型と一致しているかは、TypeScript だけでは保証できません。

そこで登場するのが **Zod** です。

---

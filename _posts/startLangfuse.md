---
title: "Langfuseを使ってみる"
excerpt: ""
coverImage: ""
date: "2026-06-03T23:25:59.000Z"
updatedAt: "2026-06-03T23:25:59.000Z"
tag: ["AI"]
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
---

前回の記事では、AWS Lambda から Amazon Bedrock の基盤モデル（Nova）を呼び出す最小構成を Terraform で構築しました。動くものはできましたが、運用フェーズに入ると次のような疑問が必ず出てきます。

- どんなプロンプトが投げられて、モデルは何を返したのか？
- 1 リクエストあたり何トークン消費していて、コストはいくらなのか？
- レイテンシは？エラーはどのくらいの頻度で起きているのか？

これらに答えるのが **LLM オブザーバビリティ** です。本記事では、前回の構成に **Langfuse**[^1] を導入して、Bedrock の呼び出しを「見える化」していきます。

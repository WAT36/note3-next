---
title: "GraphQLについて(その２) ~AWS AppSyncによる実践~"
excerpt: "AWS AppSyncを利用してGraphQLを立てるハンズオン"
coverImage: ""
date: "2025-07-02T23:54:58.000Z"
updatedAt: "2025-07-02T23:54:58.000Z"
tag: ["AWS", "API", "GraphQL"]
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
---

前回の記事では GraphQL の特徴等についてを記載した。

今回は、GraphQL を実際に使うハンズオンを利用し、実践する。

GraphQL を使うために、今回は AWS AppSync を使ってみる。

# AWS AppSync とは

AWS AppSync は完全マネージドの GraphQL サービスで、インフラ管理が不要です。リクエスト課金（最初の 12 か月は毎月 25 万クエリまで無料）があり、低トラフィックならほぼコストゼロで運用可能です。

---
title: "Algoliaを利用しこのブログに全文検索を行えるようにした"
excerpt: "全文検索サービス「Algolia」の導入と利用"
coverImage: ""
date: "2023-10-04T23:01:58.000Z"
updatedAt: "2023-10-04T23:01:58.000Z"
tag: []
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
---

このブログにも検索機能が欲しい！

先代である二代目のブログには、Algolia（全文検索サービス）とデータを連携して検索が行えるプラグインがあり、それを利用して記事検索が行えるようになっていました。

しかし残念ながら Nextjs には無いようで。。(探せばあるかも知れんけど)

今回は Algolia でのアカウント作成とデータ投入、そして実際に検索を行う所までをやってみました

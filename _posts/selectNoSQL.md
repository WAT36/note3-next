---
title: "RDBとNoSQL、システム要件に応じた最適なデータベースの選び方"
excerpt: "システム要件に合わせたデータベース(RDB,NoSQL)の選び方。"
coverImage: ""
date: "2025-01-17T14:13:42.000Z"
updatedAt: "2025-01-17T14:13:42.000Z"
tag: []
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
---

過去に AWS 上で個人開発をやっていた時に、データベースを RDS（リレーショナルデータベース:RDB）か DynamoDB（NoSQL）のどちらにすべきかで迷った事があった。当時はとにかく節約したかった面から安易に DynamoDB を選択したのだが、開発を進めていくうちにシステムと性質上合わないことが分かって DB を RDS にリプレース・・という面倒な事態に出くわしてしまった。

その復習がてら、今回は開発するシステムの性質から、利用するデータベースとして RDB と NoSQL のどちらが向いてるか・向いてないかをまとめてみようと思う。

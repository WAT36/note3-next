---
title: 'S3(静的Webホスティング)をHTTPS化する'
excerpt: 'S3に立てたWebサイトをHTTPS化する手順'
coverImage: ''
date: '2023-02-16T22:29:57.000Z'
updatedAt: '2023-02-16T22:29:57.000Z'
tag: ["AWS","S3","ACM","CloudFront","HTTPS"]
author:
  name: Tatsuroh Wakasugi
  picture: '/assets/blog/authors/WAT.jpg'
ogImage:
  url: ''
---

前述の S3に立てた静的Webサイト だが、通常ではHTTPでの表示となっている。

これをHTTPS化する手順をここに留めておく。

# 大まかな手順

手順としては以下の通り。なおS3での静的Webホスティングは既に行われている前提である。
- ACMで証明書を作成する
- CloudFrontでディストリビューションを作成する
- Route53で独自ドメイン設定


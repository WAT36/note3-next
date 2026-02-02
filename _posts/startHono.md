---
title: 'Honoを使ってみた'
excerpt: ''
coverImage: ''
date: '2026-02-01T12:39:52.000Z'
updatedAt: '2026-02-01T12:39:52.000Z'
tag: ["API"]
author:
  name: Tatsuroh Wakasugi
  picture: '/assets/blog/authors/WAT.jpg'
ogImage:
  url: ''
---

「Hono」というWebフレームワークをご存知でしょうか。名前の通り日本語の「炎」に由来するこのフレームワークは、現在急速に注目を集めている次世代のJavaScript/TypeScriptフレームワークです。今回はそれについて書いていきます。

# Honoとは何か？

Honoは、Web標準に基づいて構築された小型でシンプル、かつ超高速なWebフレームワークです。Cloudflare Workersをはじめ、Deno、Bun、Vercel、AWS Lambda、Node.jsなど、あらゆるJavaScriptランタイムで動作します。

特徴としては以下のようなものがあります。

- 超高速

HonoのルーターであるRegExpRouterは非常に高速で、線形ループを使用していません。従来のルーターが全てのURLパターンに対して網羅的に探索していたのに対し、Honoでは大きな1つの正規表現にまとめることで探索回数を大幅に削減しています。

- 超軽量

hono/tinyプリセットは12KB未満で、Honoには依存関係がなく、Web標準APIのみを使用しています。この軽量性により、起動が速く、メモリ使用量も少なくなっています。

- マルチランタイム対応

Honoの最大の特徴の1つが、複数のランタイムで同じコードが動作することです。以下の環境で動作します：

- Node.js
- Deno
- Bun
- Cloudflare Workers
- AWS Lambda / Lambda@Edge
- Fastly Compute
- Vercel
- その他のエッジ環境

**「一度書けば、どこでも動く」** というのがHonoの哲学です。

- バッテリー同梱

Honoには組み込みミドルウェア、カスタムミドルウェア、サードパーティミドルウェア、ヘルパーが含まれています。認証、CORS、ログ、キャッシュなど、Webアプリケーション開発に必要な機能が最初から揃っています。

# Honoが適している用途

- REST APIやGraphQL APIの構築
- エッジコンピューティングを活用したアプリケーション
- サーバーレス関数（AWS Lambda、Cloudflare Workersなど）
- マイクロサービス
- リアルタイム性が求められるアプリケーション
- 軽量で高速なプロキシサーバー
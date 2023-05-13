---
title: "NestJSに入門してみた"
excerpt: "NestJSプロジェクトを作成し簡単なAPIを起動させてみた"
coverImage: "/assets/posts/nestjsFirstStep/nestjsFirstStep.png"
date: "2023-04-23T23:24:57.000Z"
updatedAt: "2023-04-23T23:24:57.000Z"
tag: []
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
---

個人的に作成している別アプリケーションで、これまで DB へのアクセス等を行う API などは特にフレームワークなど利用してこなかったのだが、

今回 Node.js でのバックエンドアプリケーションを構築することができるフレームワークとして " **NestJS** " というものがあると聞いたので、これを機に導入・入門する事にしてみた。

# NestJS とは

NestJS とは Node.js のサーバーサイドアプリケーションを構築するためのフレームワークであり、Typescript で作製されている。

API サーバーの開発や、アクセスの制御、CLI アプリケーション、GraphQL 等への対応など様々な機能を有している。

# NestJS の導入

## インストール・プロジェクト作成

NestJS を使用する為には、NestCLI を使いプロジェクトを構築するか、スタータープロジェクトをクローンする必要がある。ここでは NestCLI を利用して行う。

NestCLI を使う場合、以下のコマンドを入力し、NestJS をインストール、プロジェクトを作成する。

すると新しいプロジェクトのディレクトリができ、初期のコア Nest ファイルとサポート・モジュールが作成され、プロジェクトのテンプレートが作成される。

```shell
npm i -g @nestjs/cli
nest new (NestJSプロジェクト名)
```

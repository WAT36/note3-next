---
title: 'NestJSに入門してみた'
excerpt: 'NestJSプロジェクトを作成し簡単なAPIを起動させてみた'
coverImage: ''
date: '2023-04-23T23:24:57.000Z'
updatedAt: '2023-04-23T23:24:57.000Z'
tag: []
author:
  name: Tatsuroh Wakasugi
  picture: '/assets/blog/authors/WAT.jpg'
ogImage:
  url: ''
---

個人的に作成している別アプリケーションで、これまでDBへのアクセス等を行うAPIなどは特にフレームワークなど利用してこなかったのだが、

今回Node.jsでのバックエンドアプリケーションを構築することができるフレームワークとして " **NestJS** " というものがあると聞いたので、これを機に導入・入門する事にしてみた。

# NestJSとは

NestJSとはNode.jsのサーバーサイドアプリケーションを構築するためのフレームワークであり、Typescriptで作製されている。

APIサーバーの開発や、アクセスの制御、CLIアプリケーション、GraphQL等への対応など様々な機能を有している。


# NestJSの導入

## インストール

Nestを使用する為には、NestCLIを使いプロジェクトを構築するか、スタータープロジェクトをクローンする必要がある。（結果は変わらない）

NestCLIを使う場合、以下のコマンドを入力する。新しいプロジェクトのディレクトリができ、初期のコアNestファイルとサポート・モジュールが作成され、プロジェクトのテンプレートが作成される。NestCLIによる手法は初心者におすすめで、このガイドで言うとそのまま「First Steps」の項目に繋がる。

```shell
npm i -g @nestjs/cli
nest new (project-name)
```

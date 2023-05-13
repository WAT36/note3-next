---
title: "NestJSに入門してみた"
excerpt: "NestJSプロジェクトを作成し簡単なAPIを起動させてみた"
coverImage: "/assets/posts/nestjsFirstStep/nestjsLogo.png"
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

実行終了後、project ディレクトリ、node モジュールといくつかの基本的なファイル数点の入った src/ディレクトリが作成される。

ファイルの概要は以下の通り。

- src
  - app.controller.ts
  - app.controller.spec.ts
  - app.module.ts
  - app.service.ts
  - main.ts

|                        |                                                                            |
| :--------------------- | :------------------------------------------------------------------------- |
| app.controller.ts      | 簡便なシングルルート用コントローラ                                         |
| app.controller.spec.ts | ユニットテスト用コントローラ                                               |
| app.module.ts          | アプリケーションのルートモジュール                                         |
| app.service.ts         | シングルメソッドの簡便なサービス                                           |
| main.ts                | NestFactory 機能を使い Nest アプリケーションインスタンスを作る為のファイル |

インストールが完了すれば、以下のコマンドで HTTP リクエストを待つアプリケーションを起動できる。

```shell
npm run start
```

このコマンドを使用すれば、`src/main.ts`で定義されたポートで待つ HTTP サーバーアプリケーションが起動する。ブラウザが開き`http://localhost:3000/`を表示する。`Hello world`が見えるはずだ。

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

個人で作成しているアプリで、これまで DB へのアクセス等を行う API などは特にフレームワークを利用してこなかったのだが、

今回 Node.js でのバックエンドアプリケーションを構築することができるフレームワークとして " **NestJS** " というものがあると聞いたので、これを機に実践・入門する事にしてみた。

# NestJS とは

NestJS とは Node.js のサーバーサイドアプリケーションを構築するためのフレームワークであり、Typescript で作成されている。

API サーバーの開発や、アクセスの制御、CLI アプリケーション、GraphQL 等への対応など様々な機能を有している。

# NestJS の導入

## インストール・プロジェクト作成

NestJS を使用する為には、NestCLI を使いプロジェクトを構築するか、スタータープロジェクトをクローンする必要がある。ここでは NestCLI を利用して行う。

NestCLI を使う場合、まずは以下のコマンドを入力し、NestJS をインストールする。

```shell
npm i -g @nestjs/cli
```

次に、以下コマンドで NestJS プロジェクトを作成する。

```shell
nest new (NestJSプロジェクト名)
```

実行終了後、指定したプロジェクト名のディレクトリ、node モジュールといくつかの基本的なファイル数点の入った src/ディレクトリが作成される。

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

初期状態でこのコマンドを使用すれば、`src/main.ts`で定義されたポートで待つ HTTP サーバーアプリケーションが起動する。

ブラウザを開き`http://localhost:3000/`を表示すると、Hello World が表示されるはず。

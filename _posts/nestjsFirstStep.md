---
title: "NestJSに入門してみた"
excerpt: "NestJSプロジェクトを作成し簡単なAPIを起動させてみた"
coverImage: "/assets/posts/nestjsFirstStep/nestjsLogo.png"
date: "2023-04-23T23:24:57.000Z"
updatedAt: '2025-10-02T00:31:47.000Z'
tag: ["バックエンド"]
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

| ファイル名             | 意味                                                                       |
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

# NestJS の構成要素

NestJS は主に以下の要素からなる。

- Service
- Controller
- Module

細かい要素はこれ以外にも存在するが、基本的にはこれらの 3 つの要素を使って、1 つの機能を作成する。

以下にそれぞれ記載する。

## Service（Provider）

Service は具体的な処理、ビジネスロジックを定義するクラスである。NestJS では具体的な処理を行うクラスは Provider とも呼ばれ、Service はここに含まれる。

大体は Controller から利用され、エンドポイントごとの具体的な処理を書く。

Service(Provider)を実装するには、クラスに `@Injectable` デコレーターを宣言する。

例

```typescript
import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHello(): string {
    return "Hello World!";
  }
}
```

## Controller

Controller は、クライアントからの応答を受理し、レスポンスを返す役割を持つクラスである。

クライアントからの応答を受けるエンドポイントを設け、それ毎に処理を割り振り、得た結果をクライアントに返す、ルーティングのような機能を持つ。

Controller を定義するには、`@Controller` デコレーターを利用し、パス及び利用する Service 等を記述する。

例

```typescript
import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
```

この例だと getHello を実行したい場合は GET メソッドでパス'/'にリクエストを送ると実行される。

パスを変えたい場合、例えば'/app/hello'で getHello を実行したい場合は、@Controller('/app')、@Get('/hello')と指定するなどする。

別の HTTP メソッドを利用したい場合は、それに対応するデコレータがあるのでそちらを利用する。

## Module

Module は、利用する Controller,Service,ライブラリ類をまとめて登録するクラスである。

各アプリケーションは、少なくとも 1 つのモジュールを持っている。

Module を定義するには、`@Module` デコレーターを利用し、その中で関連する Controller,Service 等を記述する。

例

```typescript
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { QuizModule } from "./quiz/quiz.module";

@Module({
  imports: [XXXModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

@Module デコレーター内に記述するプロパティは以下の通り。

| プロパティ名 | 説明                                                                                                                               |
| :----------- | :--------------------------------------------------------------------------------------------------------------------------------- |
| providers    | Nest のインジェクタによってインスタンス化され、少なくともこのモジュールで共有される可能性のあるプロパイダ(サービス)一覧            |
| controllers  | インスタンス化された、このモジュールで宣言されるコントローラ一覧                                                                   |
| imports      | このモジュールで必要なプロパイダ(サービス)をエクスポートしているモジュールの一覧                                                   |
| exports      | このモジュールをインポートしている別のモジュールで使用されるプロバイダ(サービス)一覧（このモジュールが提供しているプロバイダ一覧） |

# NestJS での機能開発

実際に NestJS で API・機能開発を行うには、src フォルダ下で機能ごとのフォルダを作成し、その中でそれぞれの機能用の Service,Controller,Module ファイルを作成する。

そして、アプリケーションのルートモジュール（src/app.module.ts）で、作成した機能のモジュールをインポートする。

例えば、aaa という機能を作りたい場合は、src フォルダ下で aaa というフォルダを作成し、そのフォルダ下で Service,Controller,Module ファイルを作成する。

その後、app.module.ts の import に、作成した aaa の Module を追記する。

(新機能作成の一例)

![](/assets/posts/nestjsFirstStep/makeNewFunc.png)

---

他機能についても今後書き記していきたい。

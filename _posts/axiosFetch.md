---
title: "(Javascript)axiosとFetchの使い分け"
excerpt: "axiosとFetchの違いについて"
coverImage: "/assets/posts/axiosFetch/axiosVsFetch.png"
date: "2025-04-23T23:30:29.000Z"
updatedAt: "2025-04-23T23:30:29.000Z"
tag: []
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
---

最近だが JavaScript で非同期通信を扱うことが多い。

その際使うことになるのは **Fetch API** と **Axios** が挙げられると思う。

しかし、両者の違い及びどちらを使った方が良いかが長らくわかっていなかったため、

それぞれの特徴と違いを調べてみた。

# **Fetch API**

## **特徴**

- 組み込み API
  ブラウザ環境（および一部のサーバサイド環境）に標準実装されており、追加のインストールなしで利用できる。
- Promise ベース
  fetch() は Promise を返すので、then/catch もしくは async/await で扱います。
- レスポンスのハンドリング
  Fetch ではレスポンスデータを JSON やテキストに変換する際に、response.json() や response.text() といったメソッドを呼び出す必要があります。
- エラーハンドリング
  Fetch の場合、ステータスコードが 4xx や 5xx であっても reject にはならず、通信そのものが失敗したとき（ネットワークエラーなど）にのみ reject となります。ステータスコードのチェックは自分で行う必要があります。

以下に簡単な例を記載します。

```jsx
// Fetch API を利用する例
// JSONPlaceholder というテスト用の公開APIからデータを取得してみます。
fetch("https://jsonplaceholder.typicode.com/posts/1")
  .then((response) => {
    // 4xx / 5xx でも .catch にはいかないので、ここでチェックが必要
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    // レスポンスを JSON としてパース
    return response.json();
  })
  .then((data) => {
    console.log("Fetch で取得したデータ:", data);
  })
  .catch((error) => {
    // ネットワークエラーなどのみ .catch で捕捉される
    console.error("Fetch でエラーが発生:", error);
  });
```

**ポイント**

- fetch はデフォルトでステータスコードを考慮したエラーを出してくれません。response.ok や response.status で自前チェックを行う必要があります。
- response.json() を呼び出すまでは JSON にパースされないので、明示的にパース処理を入れます。

**こんなときに便利**

- 追加ライブラリの依存を増やしたくないとき
- ブラウザ組み込みのシンプルな HTTP リクエスト手段を使いたいとき
- Node.js 環境であれば、node-fetch 等のポリフィルを導入して統一的に利用したいとき

# **Axios**

**特徴**

- 外部ライブラリ
  npm や yarn でインストールして使用します。axios をインポートして利用。
- Promise ベース
  Fetch と同様に Promise に対応し、then/catch または async/await で扱います。
- デフォルトの変換処理
  JSON レスポンスを自動的にパースしてくれるため、response.data にパース後のオブジェクトが格納されます。Fetch のように .json() を呼び出す必要はありません。
- ステータスコードでのエラーハンドリング
  ステータスコードが 4xx や 5xx の場合、自動的にエラーとして reject が返ります。したがって、サーバエラーなどを簡単に then/catch で処理可能です。
- 機能が豊富
  - リクエストやレスポンスの インターセプター（共通処理やヘッダ付加などをリクエストごとに書かずにまとめて行える）
  - タイムアウト設定
  - リクエストキャンセル
  - リクエスト/レスポンスの変換機能（トランスフォーマー）
-
- 幅広い環境で動作
  ブラウザだけでなく、Node.js 環境でも利用可能であり、環境差異を抽象化できます。

以下に簡単な例を記載します。

```jsx
// axios を利用する例
// 同じく JSONPlaceholder というテスト用の公開APIからデータを取得してみます。
import axios from "axios";

axios
  .get("https://jsonplaceholder.typicode.com/posts/1")
  .then((response) => {
    // レスポンスデータは response.data に既にパースされた状態で入っている
    console.log("Axios で取得したデータ:", response.data);
  })
  .catch((error) => {
    // ステータスコードが 4xx や 5xx の場合もここに入る
    if (error.response) {
      // サーバーがステータスコードを返したとき
      console.error("Axios でHTTPエラーが発生:", error.response.status);
    } else {
      // ネットワークエラーなど
      console.error("Axios でネットワークエラーが発生:", error.message);
    }
  });
```

**ポイント**

- axios.get は 4xx / 5xx の場合も自動的に catch が呼ばれるので、エラー処理が書きやすいです。
- response.data にパース済みのデータが入ります。
- 追加機能として、リクエストやレスポンスのインターセプター、リクエストキャンセルなどが利用可能です（上記コードには含まれていません）。

**こんなときに便利**

- ネットワークリクエストの機能を手厚くサポートしてほしいとき
- レスポンスやエラー処理を簡素化したいとき
- リクエストやレスポンスの共通処理をまとめて管理したいとき
- Node.js とブラウザの両方で同一のコードをなるべく楽に書きたいとき

---

まとめとしては

- シンプルに最低限の HTTP 通信を行いたい場合や追加ライブラリを増やしたくない場合は Fetch API で十分です。
- インターセプターや高度なエラーハンドリングなど機能が必要な場合や、より安定した書き方をしたい場合は Axios が便利です。

利用する場面や目的に応じて使い分けるのが一般的です。

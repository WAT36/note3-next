---
title: "(Javascript)axiosとFetchの使い分け"
excerpt: "axiosとFetchの違いについて"
coverImage: "/assets/posts/axiosFetch/axiosVsFetch.png"
date: "2025-04-26T06:39:42.000Z"
updatedAt: "2025-04-26T06:39:42.000Z"
tag: ["Javascript", "通信"]
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
---

最近だが JavaScript で非同期通信を扱うことが多い。

その際使うことになるのは **Fetch API** と **Axios** が挙げられると思う。

しかし、両者の違い及びどちらを使った方が良いかが長らくわかっていなかったため、今回それぞれの特徴と違いを調べてみた。

# **Fetch API**

まずは Fetch API について。以下に特徴を述べる。

## **特徴**

- 組み込み API  
  ブラウザ環境（および一部のサーバサイド環境）に標準実装されており、追加のインストールなしで利用できる。
- Promise ベース  
  fetch() は Promise を返すので、then/catch もしくは async/await で扱う。
- レスポンスのハンドリング  
  Fetch ではレスポンスデータを JSON やテキストに変換する際に、response.json() や response.text() といったメソッドを呼び出す必要がある。
- エラーハンドリング  
  Fetch の場合、ステータスコードが 4xx や 5xx であっても reject にはならず、通信そのものが失敗したとき（ネットワークエラーなど）にのみ reject となる。ステータスコードのチェックは自分で行う必要がある。

以下に簡単な例を記載する。

```jsx
// Fetch API を利用する例
// JSONPlaceholder というテスト用の公開APIからデータを取得
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

## **ポイント**

- fetch はデフォルトでステータスコードを考慮したエラーを出してくれないため、response.ok や response.status で自前チェックを行う必要がある。
- response.json() を呼び出すまでは JSON にパースされないので、明示的にパース処理を入れる必要がある。

## **こんなときに便利**

- 追加ライブラリの依存を増やしたくないとき
- ブラウザ組み込みのシンプルな HTTP リクエスト手段を使いたいとき
- Node.js 環境であれば、node-fetch 等のポリフィルを導入して統一的に利用したいとき

# **Axios**

次に Axios についてを述べる。

## **特徴**

- 外部ライブラリ  
  npm や yarn でインストールして使用する。（axios をインポートして利用）
- Promise ベース  
  Fetch と同様に Promise に対応し、then/catch または async/await で扱う。
- デフォルトの変換処理  
  JSON レスポンスを自動的にパースしてくれるため、response.data にパース後のオブジェクトが格納される。Fetch のように .json() を呼び出す必要はない。
- ステータスコードでのエラーハンドリング  
  ステータスコードが 4xx や 5xx の場合、自動的にエラーとして reject が返る。したがって、サーバエラーなどを簡単に then/catch で処理可能になる。
- 機能が豊富
  - リクエストやレスポンスの インターセプター（共通処理やヘッダ付加などをリクエストごとに書かずにまとめて行える）
  - タイムアウト設定
  - リクエストキャンセル
  - リクエスト/レスポンスの変換機能（トランスフォーマー）
- 幅広い環境で動作  
  ブラウザだけでなく、Node.js 環境でも利用可能であり、環境差異を抽象化できる。

以下に簡単な例を記載する。

```jsx
// axios を利用する例
// 同じく JSONPlaceholder というテスト用の公開APIからデータを取得
import axios from "axios";

axios
  .get("https://jsonplaceholder.typicode.com/posts/1")
  .then((response) => {
    // レスポンスデータは response.data に既にパースされた状態で入る
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

## **ポイント**

- axios.get は 4xx / 5xx の場合も自動的に catch が呼ばれるので、エラー処理が書きやすくなる。
- response.data にパース済みのデータが入る。
- 追加機能として、リクエストやレスポンスのインターセプター、リクエストキャンセルなどが利用可能（上記コードには含まれていません）。

## **こんなときに便利**

- ネットワークリクエストの機能を手厚くサポートしたいとき
- レスポンスやエラー処理を簡素化したいとき
- リクエストやレスポンスの共通処理をまとめて管理したいとき
- Node.js とブラウザの両方で同一のコードをなるべく楽に書きたいとき

---

調査してみて意外とこれまで知らなかったことが多くあったため、今後は利用する場面や目的に応じて使い分けていきたい。

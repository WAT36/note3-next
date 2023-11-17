---
title: "Algoliaを利用しこのブログに全文検索を行えるようにした"
excerpt: "全文検索サービス「Algolia」の導入と利用"
coverImage: "/assets/posts/algolia/algoliaLogo.png"
date: "2023-10-04T23:01:58.000Z"
updatedAt: "2023-10-04T23:01:58.000Z"
tag: []
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
---

このブログにも検索機能が欲しい！

以前（2 代目）のブログでは、Algolia（全文検索サービス）とデータを連携して検索が行えるプラグインを使用して、記事を検索できましたが、残念ながら Next.js には手ごろなモジュールが見当たりませんでした。（よく探せばどこかにあるかもしれませんが）

今回は、Algolia でのアカウント作成からデータの投入、そして実際の検索までを試してみたいと思います。

# 全文検索とは

まず全文検索とは何かについて述べたいと思います。

全文検索は、コンピュータにおいて入力条件に基づいて複数の文書から一致する情報を見つけることを指します。

通常、文字列を検索するだけであれば、例えば Linux では grep、SQL では LIKE 文などで検索することができます。しかし、データが増えると複雑になり、処理時間が膨大になってデータの取得に時間がかかってしまうこと、また指定された条件に完全に一致しなくてもある程度類似した情報を取得したい場合などもあります。

全文検索は、大容量のデータから条件に一致するデータを高速に取得する技術を指すこともあります。

たとえば、Google 検索でもキーワードを入力して検索ボタンをクリックすると、すぐに検索結果が表示されます。これにも全文検索の技術が使用されています。

では、自分の用意したデータに対して全文検索を行うにはどうすればよいでしょうか？

全文検索を実行できるツールとしては、ElasticSearch などが有名ですが、今回は Algolia という全文検索サービスを試してみることにしました。

# Algolia とは

Algolia[^1] は、以下の特徴を持った全文検索 API サービスです。

- 検索 API サービスを SaaS として提供
- 遅延がほとんどない、非常に高速でリアルタイムな検索機能を提供
- 世界各地にデータセンターを設けており、利用時のスケーラビリティ、検索対象データの同期も行っている
- 検索ロジックをカスタマイズでき、検索結果を最適化できる
- 開発者向けに API が提供されており、多くのプログラミング言語による利用が可能

利用するには Algolia の公式ページ[^1]から、アカウントを作成します。

では、実際にアカウントを作成してみましょう。

# Algolia を使ってみる

Algolia の[公式ウェブサイト](https://www.algolia.com/)[^1]にアクセスし、アカウントを作成（サインアップ）します。

![](/assets/posts/algolia/algoliaSignup.png)

入力したメールアドレスに確認メールが届くので、それを確認します。その後ログインするとダッシュボードが表示されます。

![](/assets/posts/algolia/algoliaDashboard.png)

これでアカウント作成は完了です。次に、アプリケーションを作成しましょう。

# アプリケーションの作成

次に、Algolia 上でアプリケーションを作成します。

Algolia でのアプリケーションとは、言うなれば Algolia でのプロジェクトのようなものです。このアプリケーションの単位で検索データや API を管理します。

Application の欄から「Create Application」を押下します。

![](/assets/posts/algolia/createApplication1.png)

その後、アプリケーション名を入力します。

![](/assets/posts/algolia/createApplication2.png)

次に、データセンターを選択します。

無料版では制限があり、選択できるデータセンターが制限されているようです。ここでは US West を選択しました。

![](/assets/posts/algolia/selectDatacenter.png)

最後にサマリーが表示されるので、確認します。

![](/assets/posts/algolia/summary.png)

"Create Application"をクリックするとアプリケーションが作成されます。

その後、作成されたアプリケーションのダッシュボードが表示されます。

![](/assets/posts/algolia/applicationDashboard.png)

# インデックスの作成

Algolia では、検索対象データの保存単位（データベースのようなもの）を「インデックス」と呼びます。

インデックスは、先ほど作成したアプリケーション内で定義します。ここでは、実際にインデックスを作成してみます。

アプリケーションのダッシュボードから Data Sources > Indices をクリックし、インデックスのページへ行きます。

![](/assets/posts/algolia/createIndex1.png)

"Create Index"をクリックし、インデックス名を入力すると、インデックスが作成されます。

![](/assets/posts/algolia/createIndex2.png)

# インデックスにデータを投入する

インデックスが作成されたら、データを投入できるようになります。

データの投入方法はいくつかあります。

Algolia のダッシュボードからデータを入力する方法もありますが、今回は API を使用してデータを投入する方法を試してみます。

インデックスに登録する検索データ（レコードと呼ばれる）は以下のような形式です（公式ページ[^2]からの引用）。

```
{
  "title": "Blackberry and blueberry pie",
  "description": "A delicious pie recipe that combines blueberries and blackberries.",
  "image": "https://yourdomain.com/blackberry-blueberry-pie.jpg",
  "likes": 1128,
  "sales": 284,
  "categories": ["pie", "dessert", "sweet"],
  "gluten_free": false
}
```

まずは上記のようなデータを用意します。どういったキーや値を登録したいかは各自で定義して下さい。

そして、これらのデータを Algolia (の API)に送信して登録します。

API 経由でデータを投入するには、必要なパラメータ[^3]があります。

- インデックス名

データを投入するインデックスの名前を使用します。

- アプリケーション ID

アプリケーションを作成するとアプリケーションの ID も発行されます。こちらを使用します。

- API キー

API キーを作成して使用します。API キーは Algolia に API を使用してデータを登録・利用するためのキーです。 API キーの作成についてはこちらの公式ページ[^4]を参照してください。

API キーにはさまざまな種類がありますが、Admin API キーは使用しないように注意してください。 API キーを作成するには、ダッシュボードから API Keys にアクセスします。 Search 用の API キーは通常デフォルトで設定されています。

![](/assets/posts/algolia/createApiKey1.png)

次に、API Keys > All API Leys > New API Keys をクリックし、新しいキーの情報を入力します。

![](/assets/posts/algolia/createApiKey2.png)

API キーの名前とどのインデックスに対して使用するかを指定し、最後の権限設定では必要最小限の権限を指定します。 今回はレコードの追加のみなので、「addObjects」だけを指定します。

![](/assets/posts/algolia/createApiKey3.png)

最後に、「Create」をクリックして作成します。

![](/assets/posts/algolia/createApiKey4.png)

この「addObjects」の権限を持つ API キーの値を使用します。

次に、コードを作成してデータを投入します。 ここでは JavaScript を使用します。 公式ページ[^3]に示されている通りに以下のように実行します。

```javascript
// for the default version
import algoliasearch from "algoliasearch";

// ************* 値を書き換えて利用 ************
const client = algoliasearch("(アプリケーションID)", "(APIキー)");
const index = client.initIndex("(インデックス名)");
// *************

// 送るデータ（の例）
const records = [{ name: "Tom Cruise" }, { name: "Scarlett Johansson" }];
// データ送信
index.saveObjects(records, { autoGenerateObjectIDIfNotExist: true });
```

これでデータを登録できました！

![](/assets/posts/algolia/createApiKey5.png)

# Algolia からデータを取得するためのクエリを送信する

Algolia にデータを登録できましたが、これらに対して検索クエリを入力して実際に検索結果を取得するにはどうすればよいでしょうか？ 検索方法について説明します。

Algolia には外部から検索を行うための検索用 API[^5]があり、こちらを利用してみます。

curl コマンドを利用し、API に直でリクエストを送る例を以下に記載します。

```bash
curl -X GET \
     -H "X-Algolia-API-Key: {API_KEY}" \
     -H "X-Algolia-Application-Id: {APPLICATION_ID}" \
    "https://${APPLICATION_ID}-dsn.algolia.net/1/indexes/imdb?query={クエリ}%20clo&hitsPerPage=2&getRankingInfo=1"
```

{API_KEY}には作成した API キー（検索のみ行う場合は、API キーの章で述べたデフォルトである Search API を利用すれば良い）を、{APPLICATION_ID}にはアプリケーション ID を代入してください。

同様に Postman などでも上記のような GET リクエストを設定して実行すると、結果が返ってきます。

![](/assets/posts/algolia/searchResult.png)

検索結果は基本 JSON のようなオブジェクト形式で返され、自分で用意したデータのうち投げ出したクエリに該当するものが得られます。

より高度な検索の方法やもう少し詳細な検索データの取得を行いたい、と言う場合はリクエストデータ等に文法的に手を加える事で行えますが、それについてはまた別の記事で書こうと思います（書けるようにしたい・・）

# InstantSearch

Algolia はフロントエンドのフレームワーク向けに、検索用の UI コンポーネントライブラリを提供しています。

名前を InstantSearch[^6]といいます。ここでは React での導入例をお出しします。

まずは必要モジュールをインストールします。

```bash
npm install algoliasearch react-instantsearch
```

その後、React アプリケーション内で以下のように InstantSearch モジュールを利用します。（公式ページからの引用[^7][^8]）

```javascript
import React from "react";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch } from "react-instantsearch";

const searchClient = algoliasearch("YourApplicationID", "YourSearchOnlyAPIKey");

function App() {
  return (
    <InstantSearch searchClient={searchClient} indexName="instant_search">
      {/* Widgets */}
    </InstantSearch>
  );
}
```

(YourApplicationID にはアプリケーション ID を、YourSearchOnlyAPIKey には検索用の API キーを、indexName にはインデックス名を代入)

他、応用例として、例えば検索結果を表示させたい場合は、以下のように利用します。（公式ページからの引用[^7]）

```javascript
import algoliasearch from "algoliasearch/lite";
import { InstantSearch, SearchBox, Hits } from "react-instantsearch";

const searchClient = algoliasearch("YourApplicationID", "YourSearchOnlyAPIKey");

function Hit({ hit }) {
  return (
    <article>
      <p>{hit.categories[0]}</p>
      <h1>{hit.name}</h1>
      <p>${hit.price}</p>
    </article>
  );
}

function App() {
  return (
    <InstantSearch searchClient={searchClient} indexName="instant_search">
      <SearchBox />
      <Hits hitComponent={Hit} />
    </InstantSearch>
  );
}
```

他モジュール、細かい応用例などもありますが、そちらは公式ページをご参照ください。

---

とりあえず今回はここまで。結構範囲が広いので、もう少し調べて別記事にお書きしたいと思います。。

---

[^1]: [Algolia(公式ページ)](https://www.algolia.com/)
[^2]: [Prepare your records for indexing(公式ページ)](https://www.algolia.com/doc/guides/sending-and-managing-data/prepare-your-data/#algolia-records)
[^3]: [Importing with the API(公式ページ)](https://www.algolia.com/doc/guides/sending-and-managing-data/send-and-update-your-data/how-to/importing-with-the-api/)
[^4]: [API keys(公式ページ)](https://www.algolia.com/doc/guides/security/api-keys/)
[^5]: [Search API(公式ページ)](https://www.algolia.com/doc/rest-api/search/)
[^6]: [What is React InstantSearch?(公式ページ)](https://www.algolia.com/doc/guides/building-search-ui/what-is-instantsearch/react/)
[^7]: [Getting started with React InstantSearch(公式ページ)](https://www.algolia.com/doc/guides/building-search-ui/getting-started/react/)
[^8]: [How to install React InstantSearch(公式ページ)](https://www.algolia.com/doc/guides/building-search-ui/installation/react/)

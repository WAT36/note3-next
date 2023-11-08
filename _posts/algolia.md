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

以前（2 代目）のブログでは、Algolia（全文検索サービス）とデータを連携して検索が可能なプラグインを使用して、記事を検索できましたが、残念ながら Next.js には手ごろな代替プラグインが見当たりませんでした。（もしかしたら見つかるかもしれませんが）

今回は、Algolia でのアカウント作成からデータの投入、そして実際の検索までを試してみたいと思います。

# 全文検索とは

それに先立って、まず全文検索とは何かについて説明したいと思います。

全文検索は、コンピュータにおいて入力条件に基づいて複数の文書から一致する情報を見つけることを指します。

通常、文字列を検索するだけであれば、Linux では grep、SQL では LIKE 文などを使用して情報を見つけることができます。しかし、データが増えると処理が複雑になり、指定された条件に完全に一致しなくても関連する情報を取得する必要がある場合があります。

全文検索は、大容量のデータから条件に一致するデータを高速に取得する技術を指すこともあります。

たとえば、Google 検索でもキーワードを入力して検索ボタンをクリックすると、すぐに検索結果が表示されますが、これにも全文検索の技術が使用されています。

では、自分の用意したデータに対して全文検索を行うにはどうすればよいでしょうか？

全文検索を実行できるツールとしては、ElasticSearch などが有名ですが、今回は Algolia という全文検索サービスを試してみることにしました。

# Algolia とは

Algolia は、以下の特徴を持った全文検索 API サービスです。

- 検索 API サービスを SaaS として提供
- 遅延がほとんどない、非常に高速でリアルタイムな検索機能を提供
- 世界各地にデータセンターを設けており、利用時のスケーラビリティ、検索対象データの同期も行っている
- 検索ロジックをカスタマイズでき、検索結果を最適化できる
- 開発者向けに API が提供されており、多くの言語から利用が可能

公式ページは以下です。

https://www.algolia.com/

ここから、実際にアカウントを作成し、Algolia を利用してみましょう。

# Algolia を使ってみる

Algolia の公式ウェブサイトにアクセスし、アカウントを作成（サインアップ）します。

![](/assets/posts/algolia/algoliaSignup.png)

サインアップし、ログインするとダッシュボードが表示されます。

![](/assets/posts/algolia/algoliaDashboard.png)

# アプリケーションの作成

まずは、Algolia 上でアプリケーションを作成します。

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

ここでは、インデックスを作成します。

![](/assets/posts/algolia/createIndex1.png)

"Create Index"をクリックし、インデックス名を入力すると、インデックスが作成されます。

![](/assets/posts/algolia/createIndex2.png)

# インデックスにデータを投入する

インデックスが作成されたら、データを投入できるようになります。

データの投入方法はいくつかあります。

Algolia のウェブ画面からデータを入力する方法もありますが、今回は API を使用してデータを投入する方法を試してみます。

詳細は以下の公式ページを参照してください。

https://www.algolia.com/doc/guides/sending-and-managing-data/prepare-your-data/#algolia-records

インデックスに登録する検索データ（レコードと呼ばれる）は以下の形式です（公式ページからの引用）。

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

まずは上記のようなデータを用意します。そして、これらのデータを Algolia に送信して登録します。

詳細な手順については公式ページを参照してください。

https://www.algolia.com/doc/guides/sending-and-managing-data/send-and-update-your-data/

https://www.algolia.com/doc/guides/sending-and-managing-data/send-and-update-your-data/how-to/importing-with-the-api/

API 経由でデータを投入するには、必要なパラメータがあります。

- インデックス名

データを投入するインデックスの名前を使用します。

- アプリケーション ID

アプリケーションを作成する際に作成したアプリケーションの ID を使用します。

- API キー

API キーを作成して使用します。API キーは Algolia に API を使用してデータを登録・利用するためのキーです。 API キーの作成については以下の公式ページを参照してください。

https://www.algolia.com/doc/guides/security/api-keys/

API キーにはさまざまな種類がありますが、Admin API キーは使用しないように注意してください。 API キーを作成するには、ダッシュボードから API Keys にアクセスします。 Search 用の API キーは通常デフォルトで設定されています。

![](/assets/posts/algolia/createApiKey1.png)

Search 用の API Key はデフォルトであることが多いです。

次に

次に、API Keys > All API Leys > New API Keys をクリックし、新しいキーの情報を入力します。

![](/assets/posts/algolia/createApiKey2.png)

API キーの名前とどのインデックスに対して使用するかを指定し、最後の権限設定では必要最小限の権限を指定します。 今回はレコードの追加のみなので、「addObjects」だけを指定します。

![](/assets/posts/algolia/createApiKey3.png)

最後に、「Create」をクリックして作成します。

![](/assets/posts/algolia/createApiKey4.png)

この「addObjects」の権限を持つ API キーの値を使用します。

次に、コードを作成してデータを投入します。 ここでは JavaScript を使用します。 公式ページに示されている通りに以下のように実行します。

```javascript
// for the default version
const algoliasearch = require("algoliasearch");

// for the default version
import algoliasearch from "algoliasearch";

// for the search only version
import algoliasearch from "algoliasearch/lite";

// or just use algoliasearch if you are using a <script> tag
// if you are using AMD module loader, algoliasearch will not be defined in window,
// but in the AMD modules of the page

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

curl コマンドを利用し、API に直でリクエストを送るには以下の通りです。

```bash
curl -X GET \
     -H "X-Algolia-API-Key: ${API_KEY}" \
     -H "X-Algolia-Application-Id: ${APPLICATION_ID}" \
    "https://${APPLICATION_ID}-dsn.algolia.net/1/indexes/imdb?query=george%20clo&hitsPerPage=2&getRankingInfo=1"
```

するとデータが得られる。

参考：https://www.algolia.com/doc/rest-api/search/

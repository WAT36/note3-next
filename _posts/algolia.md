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

先代である二代目のブログには、Algolia（全文検索サービス）とデータを連携して検索が行えるプラグインがあり、それを利用して記事検索が行えるようになっていました。

しかし残念ながら Nextjs には無いようで。。(探せばあるかも知れんけど)

今回は Algolia でのアカウント作成とデータ投入、そして実際に検索を行う所までをやってみた。

# 全文検索とは

その前にまず全文検索とは何か？という事について書きたい。

全文検索とは、コンピュータにおいて、入力した条件をもとに複数の文書からマッチした情報を探し当てることである。**（定義はどこからか持ってきた方が良いか？？）**

ただ単に文字列などを検索するなら、Linux だと grep、SQL ならば LIKE 文などを用いれば探し当てられるが、データが多くなると処理量も膨大になったり、また指定した入力条件に合致しなくても意味的に似ている物も取得したい、というような場合もあると思う。

全文検索はこういった大容量のデータからでも条件に合ったデータを高速に取ってくる技術の事も指す。**（そう？？なんかいい言い回しないかね）**

例えば Google 検索でもキーワードを入力して検索ボタンを押すとすぐに検索結果が返ってくるだろう。あれも全文検索の技術が使われている。**（その通りなんだがなんか言い回しが）**

あるデータに対して全文検索を行うようにするにはどうすればよいか？

全文検索が行えるツールには ElasticSearch などが有名ではあるが、

今回は全文検索を行えるサービスを提供している Algolia を利用してみることにした。

# Algolia とは

Algolia とは全文検索サービスを提供している SaaS サービスである。

https://www.algolia.com/

# Algolia を使ってみる

Algolia の公式ページへいき、アカウントを作成（サインアップ）する。

サインアップし、ログインするとダッシュボードが表示される。

# アプリケーションの作成

まずは Algolia 上でアプリケーションの作成を行う。

Application の欄から「Create Application」を押下する。

![](/assets/posts/algolia/createApplication1.png)

アプリケーション名を入力します

![](/assets/posts/algolia/createApplication2.png)

データセンターを選択します。

無料版だと制限があり、選択できるデータセンターに限りがあるようです。

![](/assets/posts/algolia/selectDatacenter.png)

最後にサマリーが出てきます

![](/assets/posts/algolia/summary.png)

Create Application を押すと作成されます。

作成されたアプリケーションのダッシュボードが表示されます。

![](/assets/posts/algolia/applicationDashboard.png)

# インデックスを作成する

algolia では検索対象データの保管単位(データベースのようなもの)を「インデックス」と呼んでいます。

ここでは、インデックスを作成してみます。

![](/assets/posts/algolia/createIndex1.png)

Create Index からインデックス名を入力するとインデックスが作成されます。

![](/assets/posts/algolia/createIndex2.png)

# インデックスにデータを投入する

インデックスが作成されると、それに対してデータを投入できるようになります。

投入方法はいくらかあります。

Algolia の Web 画面上から入力する方法もありますが、

今回は API を利用してデータを投入する方法で行います。

公式ページを参考に行います

https://www.algolia.com/doc/guides/sending-and-managing-data/prepare-your-data/#algolia-records

インデックスに登録する検索データ（レコードと呼ぶ）は以下のような形式です。（公式ページより）

そのためまずは上記のようなデータを用意します。

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

次にこれらのデータを Algolia に送って登録します。

https://www.algolia.com/doc/guides/sending-and-managing-data/send-and-update-your-data/

https://www.algolia.com/doc/guides/sending-and-managing-data/send-and-update-your-data/how-to/importing-with-the-api/

API 経由でデータを投入するには、必要なパラメータがあります。

- インデックス名

データを投入するインデックスの名前を使います。

- アプリケーション ID

先述の「アプリケーションを作成する」で作成したアプリケーションの ID を利用します。

- API キー

API キーを作成して利用します。API キーは algolia に API を利用してデータを登録・利用するために使うキー項目です。

作成には以下を参照ください。

https://www.algolia.com/doc/guides/security/api-keys/

API キーにはいろいろ種類がありますが、Admin API キーは利用しないように注意ください。

作るには、ダッシュボードから API Keys へ行きます

![](/assets/posts/algolia/createApiKey1.png)

Search 用の API Key はデフォルトであることが多いです。

次に

API Keys ＞ All API Leys ＞ New API Keys

![](/assets/posts/algolia/createApiKey2.png)

すると新たに作成するキーの情報入力ダイアログが出ます。

API キーの名前とどのインデックスに対してかをまず指定し、

最後の権限設定は必要最小限の権限を指定するようにしましょう。

今回はレコードを追加するだけなので「addObjects」のみを指定します。

![](/assets/posts/algolia/createApiKey3.png)

最後に「Create」を押下して作成します

![](/assets/posts/algolia/createApiKey4.png)

この addObjects の権限を持つ API キーの値を利用します。

次にコードを作成しデータを投入します。

ここでは javascript を利用します。

公式ページにある通り、以下のように行い実行します。

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

するとデータ登録できました！

![](/assets/posts/algolia/createApiKey5.png)

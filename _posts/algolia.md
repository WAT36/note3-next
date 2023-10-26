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

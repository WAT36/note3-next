---
title: "PlanetScaleを利用してみた"
excerpt: "サーバレスDBサービス「PlanetScale」について"
coverImage: "/assets/posts/planetScaleDB/planetscaleLogo.png"
date: "2023-04-15T00:26:15.000Z"
updatedAt: "2023-04-15T00:26:15.000Z"
tag: ["データベース"]
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
draft: false
---

データを扱うアプリケーションやサービスにおいて、データベースは必要不可欠な存在である。

データベースを自前で用意しても良いが、運用や管理が大変でもある。

そのコストを補う点として、現在ではサーバーレスなデータベースサービスというのもあり、こちらを利用するという点もあるが、利用料が高い物が多く、なかなか手が出しにくいという点もある。

そこで比較的低コストで扱えるサーバーレス DB サービスとして、「PlanetScale」というサービスがあると聞いたので、今回利用してみることにした。

# PlanetScale とは

https://planetscale.com/

PlanetScale とは PlanetScale Inc.が提供しているサーバレスな MySQL DB のサービスである。

DB を自前で用意・管理したくない時に、DB だけ間借りしたい時などに重宝するだろう。

無料プランなども提供されており、利用量によってはコストを大きく抑えることも可能である。

公式サイトにもあるが、Youtube,Slack などの多くの著名なサービスからの利用実績もある。

# 利用登録（サインアップ）、概要紹介

利用するには、まず公式サイトからアカウント登録（サインアップ）を行う。

![](/assets/posts/planetScaleDB/signUp.png)

メールアドレス等を入力すると登録メールが行くので、そこから verification を行う。すると公式サイトへ行き PlanetScale の説明が始まる。一個一個見ていく。

![](/assets/posts/planetScaleDB/welcome.png)

PlanetScale はサーバレスなデータベースであること、

![](/assets/posts/planetScaleDB/serverlessDB.png)

データベースに Git のようなブランチ管理機能を搭載していること、

![](/assets/posts/planetScaleDB/branchingFeature.png)

それもありスキーマ変更が容易に行えること、

![](/assets/posts/planetScaleDB/nonBlockingSchemaChange.png)

プルリクエストみたいな「デプロイリクエスト」で異なるブランチへの反映・デプロイの管理が行えること、

![](/assets/posts/planetScaleDB/deployRequest.png)

![](/assets/posts/planetScaleDB/deployQueue.png)

データベースへの読み取り・書き込みトラフィック量を確認できることなど。

![](/assets/posts/planetScaleDB/ioTraffic.png)

その後最初のデータベースを作成するように出るので、DB 名を入力し、またリージョン(DB を作成する場所)も選択して作成する。

![](/assets/posts/planetScaleDB/createDB.png)

すると DB が作られ、DB の設定画面へ遷移する。

![](/assets/posts/planetScaleDB/dbConfig.png)

なお後述もするが、無料プランでは DB は 1 つまでしか作成できない模様。

![](/assets/posts/planetScaleDB/oneFreeDB.png)

# データベースにスキーマを設定する

次に、作成したデータベースにスキーマ（テーブル定義）を設定する方法について。

先程の DB 作成後の画面から「Console」を選択。

![](/assets/posts/planetScaleDB/console.png)

ここでブランチを指定して「Connect」

するとコンソール画面へ行く

ここで、作成したいテーブルを作成する SQL 文を実際に書いて実行してみる。

![](/assets/posts/planetScaleDB/createTable.png)

実行し SHOW TABLES して確認してみると、作成されていることが確認できる。

コンソール上でだが、これでスキーマ設定が行える。

# ブランチを本番設定・保護化する

本番環境としたいブランチに対して、誤ってテーブル削除などできないようにブランチを本番設定(Promote to Production)することができる。

後述するがスキーマの Deploy Request を送る際、この本番化設定が必要になるのでここで設定する。

コンソール上から設定したいブランチの「Overview」を表示すると Promote to Production（まだ設定してない場合）があるのでそれをクリック

または「Branches」から本番化設定したいブランチの詳細を開くと Promote to Production が出るのでクリック

![](/assets/posts/planetScaleDB/promoteToProduction.png)

すると本番ブランチ設定される。

![](/assets/posts/planetScaleDB/productionBranch.png)

# データベースへの接続情報を確認する

データベースに接続する際に必要なユーザ名・アドレスなどの接続情報は、ブランチのコンソール画面にある「Connect」をクリックする

![](/assets/posts/planetScaleDB/connect.png)

すると、接続情報が出てくる。なお利用する言語別に形式が用意されているので、各々の環境に応じて選択し利用する。

![](/assets/posts/planetScaleDB/password.png)

なお、データベースへの接続に利用するパスワードは、初期表示時にしか表示されないので、必ず何処かにメモしておく。

（次回以降の表示時には、伏せられて表示されないので注意する）

# ブランチ間でのマージリクエスト（Deploy Request）

先述のとおり PlanetScale では Git のようなブランチ管理でスキーマ情報を管理している。

このブランチ機能によりあるブランチで変更したスキーマ情報を本番ブランチに反映させることができる。この機能を **Deploy Request** と呼んでいる。

行うにはまず、本ブランチで「Safe migrations」を設定する必要がある。（これは前述の本番化設定で行ってるので割愛する）

設定後、他ブランチから本ブランチへの Deploy Request を作成してみよう。

コンソール画面から元ブランチのページへ行くと、本ブランチとの変更分(diff)が表示される。

![](/assets/posts/planetScaleDB/schemaDiff.png)

この右部分に「Create Deploy Request」がある。本ブランチ(Deploy to)とコメント（あれば）を入力して、よければ Create Deploy Request を押下する。

すると Deploy Request の詳細・差分が表示される

![](/assets/posts/planetScaleDB/deployRequestDetail.png)

ここでテーブルがデプロイできない状態だとエラーが出る。その場合は修正等行う。

OK なら「Deploy Changes」するとデプロイが行われる

![](/assets/posts/planetScaleDB/deployRequestResult.png)

---

# 料金

https://planetscale.com/docs/concepts/billing

料金はプラン分けされており、無料プランと有料プラン、またエンタープライズ版も存在する。

無料プランではブランチは開発用と本番用の 2 つのみしか作成できず、また **DB も 1 つまでしか作れない** という制約がある。また書き込み・読み込み量にも有料プランと差がある。

---

# バックアップ

https://planetscale.com/docs/concepts/back-up-and-restore

PlanetScale ではバックアップも自動で取得してくれる。

![](/assets/posts/planetScaleDB/backup.png)

DB のページから「Branch」のセクションに行くと、ブランチごとのバックアップデータが閲覧できる。バックアップスケジュールもここで設定できる。

---

この他にも様々な機能等があるが、追々紹介等できればと思う。

今後利用していきたい。

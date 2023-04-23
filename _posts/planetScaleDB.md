---
title: 'PlanetScaleを利用してみた'
excerpt: 'サーバレスDBサービス「PlanetScale」について'
coverImage: ''
date: '2023-04-15T00:26:15.000Z'
updatedAt: '2023-04-15T00:26:15.000Z'
tag: ["DB","サーバレス"]
author:
  name: Tatsuroh Wakasugi
  picture: '/assets/blog/authors/WAT.jpg'
ogImage:
  url: ''
draft: false
---

データを扱うアプリケーションやサービスにおいて、データベースは必要不可欠な存在である。

データベースを自前で用意しても良いが、運用や管理が大変でもある。

そのコストを補う点として、現在ではサーバーレスなデータベースサービスというのもあり、こちらを利用するという点もあるが、利用料が高い物が多く、なかなか手が出しにくいという点もある。

そこで比較的低コストで扱えるサーバーレスDBサービスとして、「PlanetScale」というサービスがあると聞いたので、今回利用してみることにした。

# PlanetScaleとは

https://planetscale.com/

PlanetScaleとはPlanetScale Inc.が提供しているサーバレスなMySQL DBのサービスである。

DBを自前で用意・管理したくない時に、DBだけ間借りしたい時などに重宝するだろう。

無料プランなども提供されており、利用量によってはコストを大きく抑えることも可能である。

公式サイトにもあるが、Youtube,Slackなどの多くの著名なサービスからの利用実績もある。

# 利用登録（サインアップ）、概要紹介

利用するには、まず公式サイトからアカウント登録（サインアップ）を行う。

![](/assets/posts/planetScaleDB/signUp.png)

メールアドレス等を入力すると登録メールが行くので、そこからverificationを行う。すると公式サイトへ行きPlanetScaleの説明が始まる。一個一個見ていく。

![](/assets/posts/planetScaleDB/welcome.png)

PlanetScaleはサーバレスなデータベースであること、

![](/assets/posts/planetScaleDB/serverlessDB.png)

データベースにGitのようなブランチ管理機能を搭載していること、

![](/assets/posts/planetScaleDB/branchingFeature.png)

それもありスキーマ変更が容易に行えること（ロックを行わなくて良いので）

![](/assets/posts/planetScaleDB/nonBlockingSchemaChange.png)

プルリクエストみたいな「デプロイリクエスト」でブランチへの反映・デプロイの管理が行えること

![](/assets/posts/planetScaleDB/deployRequest.png)

![](/assets/posts/planetScaleDB/deployQueue.png)

データベースへの読み取り・書き込みトラフィック量を確認できることなど。

![](/assets/posts/planetScaleDB/ioTraffic.png)


その後最初のデータベースを作成するように出るので、DB名を入力し、またリージョン(DBを作成する場所)も選択して作成する。

![](/assets/posts/planetScaleDB/createDB.png)

するとDBが作られ、DBの設定画面へ遷移する。

![](/assets/posts/planetScaleDB/dbConfig.png)

なお後述もするが、無料プランではDBは1つまでしか作られない模様。

![](/assets/posts/planetScaleDB/oneFreeDB.png)


# データベースにスキーマを設定する

次に、作成したデータベースにスキーマ（テーブル定義）を設定する方法について。

先程のDB作成後の画面から「Console」を選択。

![](/assets/posts/planetScaleDB/console.png)

ここでブランチを指定して「Connect」

するとコンソール画面へ行く

ここで、作成したいテーブルを作成するSQL文を実際に書いて実行してみる。

![](/assets/posts/planetScaleDB/createTable.png)

実行しSHOW TABLESして確認してみると、作成されていることが確認できる。

コンソール上でだが、これでスキーマ設定が行える。

# ブランチを本番設定・保護化する

本番環境としたいブランチに対して、誤ってテーブル削除などできないようにブランチを本番設定(Promote to Production)することができる。

後述するがスキーマのDeploy Requestを送る際、この本番化設定が必要になるのでここで設定する。

コンソール上から設定したいブランチの「Overview」を表示するとPromote to Production（まだ設定してない場合）があるのでそれをクリック

または「Branches」から本番化設定したいブランチの詳細を開くとPromote to Productionが出るのでクリック

![](/assets/posts/planetScaleDB/promoteToProduction.png)

すると本番ブランチ設定される。

![](/assets/posts/planetScaleDB/productionBranch.png)


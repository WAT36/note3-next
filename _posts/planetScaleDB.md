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


その後最初nのデータベースを作成するように出るので、DB名を入力し、またリージョン(DBを作成する場所)も選択して作成する。

![](/assets/posts/planetScaleDB/createDB.png)

するとDBが作られる。

なお後述もするが、無料プランではDBは1つまでしか作られない模様。

![](/assets/posts/planetScaleDB/oneFreeDB.png)


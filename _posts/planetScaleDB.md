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
draft: true
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



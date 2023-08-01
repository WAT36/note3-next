---
title: "CloudFormation(CDK)を導入してみた"
excerpt: "CDKを導入したのでその方法を書く"
coverImage: ""
date: "2023-07-30T23:48:18.000Z"
updatedAt: "2023-07-30T23:48:18.000Z"
tag: []
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
---

近年はサーバーなどのインフラサービスを全てコードで管理する IaC(Infrastructure as Code)が流行っている。

IaC のサービスは Terraform などがあるが、今回私は AWS 上でいろいろサービスを構築していることから、AWS 上で AWS サービスをコードで構築・管理できる「CloudFormation」を利用してみる事にした。

# CloudFormation とは

CloudFormation は AWS サービスの一つで、AWS 上のサービスやインフラリソースをコードベースで管理し、デプロイを実行する事でそのコードで定義した通りのインフラリソースを AWS 上にデプロイしてくれるサービスである。

CloudFormation で使われるコードは、JSON または YAML 形式である。

直接書いても良いが、大体は CDK を利用した方が使いやすい。その CDK についてを以下に述べる。

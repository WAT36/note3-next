---
title: "CloudFormation(CDK)の設定方法"
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

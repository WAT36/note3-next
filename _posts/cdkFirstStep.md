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

IaC が行えるサービスは Terraform などがあるが、今回私は AWS 上でいろいろサービスを構築していることから、AWS 上で AWS サービスをコードで構築・管理できる「CloudFormation」を利用してみる事にした。

# CloudFormation とは

CloudFormation は AWS サービスの一つで、AWS 上のサービスやインフラリソースをコードベースで管理し、デプロイを実行する事でそのコードで定義した通りのインフラリソースを AWS 上にデプロイしてくれるサービスである。

CloudFormation で使われるコードは、JSON または YAML 形式である。

直接書いても良いが、大体は AWS CDK を利用した方が使いやすい。その AWS CDK についてを以下に述べる。

# AWS CDK とは

<!-- 説明文見直して欲しい -->

AWS CDK (AWS Cloud Development Kit) は、主要なプログラミング言語を利用して CloudFormation テンプレートを作成し、AWS 上にサービス等をデプロイできるフレームワークである。

利用できる言語には、TypeScript, Python, Javascript, Java, C#/.NET, Go 言語等がある。

AWS CDK を利用してできたコードにより、CloudFormation 用のテンプレートが生成され、更にそれをデプロイすることで AWS 上にサービスをデプロイできる。

# CDK の設定方法

実際に CDK を利用する方法を述べる。

なお、使用する言語はここでは Typescript とする。

## AWS CLI

まずは AWS CLI をインストールし、CloudFormation が実行できる IAM ユーザでログインする。

<!-- インストール方法書く？ >

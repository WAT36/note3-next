---
title: "Terraformを始めてみた"
excerpt: ""
coverImage: ""
date: "2025-02-22T12:53:29.000Z"
updatedAt: "2025-02-22T12:53:29.000Z"
tag: []
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
---

最近クラウドに関しては AWS を利用しており、以前の記事でも書いた IaC(Infrastructure as Code)として CloudFormation を主に利用してインフラ構築をよく行なっている。

これとは別に、汎用的に IaC が行えるツールとして Terraform について、前から気になっていたのもあり今回試しに利用してみることにした。

# Terraform とは

Terraform[^1]は、HashiCorp 社が開発したオープンソースのインフラストラクチャ管理ツールです。クラウドリソースをコードで定義し、自動的に構築できる「Infrastructure as Code（IaC）」を実現します。

Terraform の主な特徴として、以下の 3 つが挙げられます：

1. 複数のプロバイダーに対応
   AWS だけでなく、GCP、Azure、その他多くのクラウドプロバイダーに対応しています。マルチクラウド環境でも同じ書き方でインフラを定義できます。
2. HCL（HashiCorp Configuration Language）
   Terraform は独自の設定言語である HCL を使用します。JSON に似た書き方ですが、より人間が読みやすい形式で、変数やモジュールなどの機能も備えています。
3. べき等性の保証
   Terraform は「べき等性」を保証する強力な状態管理機能を備えています。
   Terraform は現在の状態と理想の状態を比較し、必要な変更のみを実行します。これにより、安全で予測可能なインフラ変更が可能になります。

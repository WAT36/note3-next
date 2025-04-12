---
title: "Terraform入門：AWSにS3バケットを構築してみる"
excerpt: "Terraformの基本を、AWS S3バケット作成を通じて学ぶ入門記事"
coverImage: "/assets/posts/terraformIntro/terraformLogo.png"
date: "2025-03-09T00:54:29.000Z"
updatedAt: "2025-04-12T20:58:11.000Z"
tag: ["Terraform", "IaC", "AWS"]
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
---

最近クラウドに関しては AWS を利用しており、以前の記事でも書いた IaC(Infrastructure as Code)として CloudFormation を主に利用してインフラ構築をよく行なっている。

これとは別に、汎用的に IaC が行えるツールとして Terraform について、前から気になっていたのもあり今回試しに利用してみることにした。

# Terraform とは

Terraform[^1]は、HashiCorp 社が開発したオープンソースのインフラストラクチャ管理ツールである。クラウドリソースをコードで定義し、自動的に構築できる「Infrastructure as Code (IaC)」を実現する。

Terraform の主な特徴として、以下の 3 つが挙げられる。

1. 複数のプロバイダーに対応  
   AWS だけでなく、GCP、Azure、その他多くのクラウドプロバイダーに対応しており、マルチクラウド環境でも同じ書き方でインフラを定義することが可能。
2. HCL(HashiCorp Configuration Language)  
   Terraform は独自の設定言語である HCL を使用する。JSON に似た書き方だが、より人間が読みやすい形式で、変数やモジュールなどの機能も備えている。
3. べき等性の保証  
   Terraform は「べき等性」を保証する強力な状態管理機能を備えている。
   Terraform は現在の状態と理想の状態を比較し、必要な変更のみを実行する。これにより、安全で予測可能なインフラ変更が可能となる。

---

[^1]: [Terraform(公式ページ)](https://www.terraform.io/)

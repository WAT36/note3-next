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

# 環境構築

Terraform を使用するための環境構築を行ってみる。

## Terraform のインストール

macOS の場合では、homebrew を利用して以下のようにインストールする。

```bash
brew install terraform
```

他 OS の場合はここでは割愛するが、公式ページのインストール[^2]の欄にあるのでそちらをご参考のこと。

インストール後、次のコマンドで正しくインストールされたか確認します。

```bash
terraform --version
```

バージョンが出力されれば、インストールは行えています。

# 実践ハンズオン：Terraform で AWS S3 バケットを作成する

準備が整ったところで、今回は実際に Terraform を使って AWS リソースを作成してみましょう。今回は基本的な S3 バケットの作成を通じて、Terraform の使い方を学びます。

なお、Terraform で AWS リソースを作成するには、CDK と同じく AWS CLI やアカウントの設定が必要なので注意しましょう。設定方法は以前の CDK の記事に記載しているので、そちらを参照してください。

## 1. プロジェクトの準備

まず、作業用のディレクトリを作成します。

```bash
mkdir terraform-aws-practice
cd terraform-aws-practice
```

ディレクトリ名は何でも構いません。

## 2. Terraform の初期化

作業用ディレクトリに移動した後、最初に設定ファイル `main.tf` を作ります。

```bash
touch main.tf
```

このファイルを開いて、AWS S3 バケットを作成する Terraform コードを書きます。

```
provider "aws" {
  region = "ap-northeast-1"  # 利用したいAWSリージョン
}

resource "aws_s3_bucket" "my_bucket" {
  bucket = "my-unique-bucket-name-12345"  # グローバルに一意な名前を指定
  acl    = "private"  # バケットのアクセス制御(private, public-read など)

  tags = {
    Name        = "MyS3Bucket"
    Environment = "Dev"
  }
}
```

**ポイント**

- `provider "aws"` で AWS プロバイダーを指定
- `aws_s3_bucket` リソースを定義し、`bucket` でバケット名を指定
- `acl` でアクセス制御を設定(デフォルトは `"private"`)
- `tags` でタグを設定(任意)

---

[^1]: [Terraform(公式ページ)](https://www.terraform.io/)
[^2]: [Install Terraform(公式ページ)](https://developer.hashicorp.com/terraform/install)

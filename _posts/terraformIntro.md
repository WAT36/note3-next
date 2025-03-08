---
title: "Terraform入門：AWSにS3バケットを構築してみる"
excerpt: "Terraformの基本を、AWS S3バケット作成を通じて学ぶ入門記事"
coverImage: "/assets/posts/terraformIntro/terraformLogo.png"
date: "2025-03-09T00:53:29.000Z"
updatedAt: "2025-03-09T00:53:29.000Z"
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

```hcl
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

## 3. Terraform の初期設定

main.tf を作成後に、Terraform の初期設定を行います。

```bash
terraform init
```

このコマンドは以下の処理を行います：

- 必要なプロバイダーのダウンロード  
  `provider "aws"` などで指定された**プロバイダーのプラグイン** をダウンロードし、`.terraform/` ディレクトリに保存します。HashiCorp の Terraform Registry からプロバイダープラグインをダウンロードします。
  Terraform が使用する**プラグインのバージョンを固定** するための `terraform.lock.hcl` を作成します。
  これにより、異なる環境(例: チーム開発)でも**同じバージョンのプラグイン**を使うことが保証されます。
- バックエンドの初期化  
  後述しますが、terraform では現在デプロイされているリソースの情報を保存・管理に`terraform.tfstate`というファイルを利用しています。
  デフォルトではローカル環境(`local`)に保存しますが、クラウドなどリモート環境に保存することもできます。
  例えば`backend "s3"` や `backend "remote"` が設定されている場合、そのストレージの接続を初期化します。

例: 以下のような設定値で `terraform init` を実行すると、リモートバックエンドの設定が有効化され、ローカルの `terraform.tfstate` ではなく S3 上に保存されるようになります。

```hcl
terraform {
  backend "s3" {
    bucket = "my-terraform-state-bucket"
    key    = "terraform.tfstate"
    region = "ap-northeast-1"
  }
}
```

- 作業ディレクトリの準備  
  `.terraform/` というフォルダを作成し、プロバイダーのプラグインや設定情報を格納します。**これを GitHub にアップロードする必要はありません** (`.gitignore` に追加推奨)。

## **4. 設定の確認**

次に、`main.tf`により作成されるリソースを確認します。

```bash
terraform plan
```

このコマンドにより、現在の `.tf` ファイル(例: `main.tf`)の内容を解析し、どのリソースを作成・変更・削除する必要があるかを判定します。

その後、**現在の状態 (`terraform.tfstate`)** と **コード (`.tf` ファイル)** を比較し、**どのリソースが変更されるかを決定** します。

変更がない場合は `"No changes. Your infrastructure matches the configuration."` と表示されます。

初回の場合、問題なければ以下のような出力が得られるはずです。

```bash
Terraform used the selected providers to generate the following execution plan. Resource actions are indicated with the following symbols:
  + create

Terraform will perform the following actions:

  # aws_s3_bucket.my_bucket will be created
  + resource "aws_s3_bucket" "my_bucket" {
      + acceleration_status         = (known after apply)
      + acl                         = "private"
      + arn                         = (known after apply)
      + bucket                      = "my-terraform-testbucket"
      + bucket_domain_name          = (known after apply)
      + bucket_prefix               = (known after apply)
      + bucket_regional_domain_name = (known after apply)
      + force_destroy               = false
      + hosted_zone_id              = (known after apply)
      + id                          = (known after apply)
      + object_lock_enabled         = (known after apply)
      + policy                      = (known after apply)
      + region                      = (known after apply)
      + request_payer               = (known after apply)
      + tags                        = {
          + "Environment" = "Dev"
          + "Name"        = "MyS3Bucket"
        }
      + tags_all                    = {
          + "Environment" = "Dev"
          + "Name"        = "MyS3Bucket"
        }
      + website_domain              = (known after apply)
      + website_endpoint            = (known after apply)
    }

```

## **5. リソース作成**

では、実際に S3 バケットを作成します。

```bash
terraform apply -auto-approve
```

`-auto-approve` を付けると確認なしで適用されます。(本番環境など重要なリソースを扱うときは誤操作リスクが高まるので、注意してご利用ください)

`terraform apply`コマンドでは、現在の `.tf` ファイル(例: `main.tf`)の内容をもとにリソースの作成を行います。

(厳密には、作成前に先述の`terraform plan`コマンドを実行して現状との差分を確認し、その結果を出力してリソースの作成を行うかの選択を求められます。それでも OK な場合にリソースが作成されます。—auto-approve オプションをつけることでこの選択は求められずにリソース作成が行われます。)

また、変更が完了すると `terraform.tfstate` ファイルが更新(ない場合は作成)され、Terraform が管理するリソースの最新情報が保存されます。

(この`terraform.tfstate`ファイルも、**GitHub にアップロードする必要はありません**(`.gitignore` に追加推奨)。)

これにより、次回の `terraform plan` 実行時に、新しい `terraform.tfstate` と `.tf` の差分が比較されます。

## **6. 作成したリソースの確認**

作成された S3 バケットを確認します。

```bash
aws s3 ls
```

問題なければ、S3 バケットが作成されているはずです！

## **7: バケットを削除(不要になった場合)**

Terraform で作成した S3 バケットを削除するには、以下を実行します。

```bash
terraform destroy -auto-approve
```

`terraform destroy` は `terraform plan` を内部的に実行し、Terraform が管理するすべてのリソースを削除する計画を作成します。

デフォルトでは、削除前に確認メッセージが表示されますが、同じく-auto-approve オプションをつけると確認なしで削除が行われます。

完了すると、`terraform.tfstate` からリソース情報が削除されます。

## 補足：.gitignore

これまで手順の中でも何個か出て言及しましたが、Terraform の設定・実行で作成されるファイルの中には機密情報が含まれるものもあるため、git などを利用して管理する場合はこれらを git 等のリポジトリに push しないようにする必要があります。

そのためには.gitignore ファイルに git の管理から除くファイルを記載しておくのが便利です。

参考までに、Terraform を利用する上での.gitignore ファイルの例を以下に記載しておきます。

```
.terraform/
terraform.tfstate
terraform.tfstate.backup
*.tfvars
```

# おわりに

今回は Terraform を導入し、簡単な例として AWS に S3 バケットを作ってみました。

これ以外にも Terraform では多彩な AWS のリソースを作成可能ですし、AWS 以外のクラウドに対してもリソース作成が可能です。

今回は簡単な例でそこまでの例を出せてはいませんが、今後 Terraform の方にも慣れていきたく、別の例も載せていければと思っています。

---

[^1]: [Terraform(公式ページ)](https://www.terraform.io/)
[^2]: [Install Terraform(公式ページ)](https://developer.hashicorp.com/terraform/install)

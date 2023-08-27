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

​
近年はサーバーなどのインフラサービスを全てコードで管理する IaC(Infrastructure as Code)が流行っている。
​
IaC が行えるサービスは Terraform などがあるが、今回私は AWS 上でいろいろサービスを構築していることから、AWS 上で AWS サービスをコードで構築・管理できる「CloudFormation」を利用してみる事にした。
​

# CloudFormation とは

​
CloudFormation は AWS サービスの一つで、AWS 上のサービスやインフラリソースをコードベースで管理し、デプロイを実行する事でそのコードで定義した通りのインフラリソースを AWS 上にデプロイしてくれるサービスである。
​
CloudFormation で使われるコードは、JSON または YAML 形式である。
​
直接書いても良いが、大体は AWS CDK を利用した方が使いやすい。その AWS CDK についてを以下に述べる。
​

# AWS CDK とは

​

<!-- 説明文見直して欲しい -->

​
AWS CDK (AWS Cloud Development Kit) は、主要なプログラミング言語を利用して CloudFormation テンプレートを作成し、AWS 上にサービス等をデプロイできるフレームワークである。
​
利用できる言語には、TypeScript, Python, Javascript, Java, C#/.NET, Go 言語等がある。
​
AWS CDK を利用してできたコードにより、CloudFormation 用のテンプレートが生成され、更にそれをデプロイすることで AWS 上にサービスをデプロイできる。
​

# CDK の設定方法

​
実際に CDK を利用する方法を述べる。
​
なお、使用する環境はここでは以下の通りとする。
​

- 言語： Typescript
- 環境： Linux(Mac OS X)
  ​

## AWS CLI のインストール

​
まずは AWS CLI をインストールし、CloudFormation が実行できる IAM ユーザでログインする様に設定します。
​
AWS CLI とは自分のコマンドライン上から、AWS のサービスやリソースを制御・操作できるコマンドラインインターフェースです。
​
インストールするには下記のような、curl を利用してインストールします。
​

```
$ curl "https://awscli.amazonaws.com/AWSCLIV2.pkg" -o "AWSCLIV2.pkg"
$ sudo installer -pkg ./AWSCLIV2.pkg -target /
```

​
実行後、AWS CLI がインストールされたことを aws コマンドを実行する事で確認します。

```
$ aws --version
```

​
他環境でのインストール方法については、以下の公式ページを参考にしてください。
​
[AWS CLI の最新バージョンを使用してインストールまたは更新を行う(公式ページ)](https://docs.aws.amazon.com/ja_jp/cli/latest/userguide/getting-started-install.html)
​​

## AWS CLI での IAM ユーザー設定

​
AWS CLI では AWS にログインするユーザー（IAM ユーザー）の情報を利用してログインし、AWS の操作を行います。
​
そのためまず、AWS 上で AWS CLI が利用するための IAM ユーザーを作成します。
​
AWS マネジメントコンソールから IAM のコンソールに行き、ユーザーの作成を行います。
​
所属するグループに関しては各自の環境に応じて設定してください。
​
ロールやポリシーに関しては、アクセス許可の所で設定します。
​
最小権限が望ましいので、CDK を利用するにあたり必要最低限な許可を付与してください。
​
​<!-- 設定方法を図示する？ -->
​<!-- どのロールを使うか描いた方がいい？ Fullでやる？ -->

​<!-- キーが必要になるのでコンソール上でユーザ作成するとこをやる -->
​
IAM ユーザーを作成した後、ユーザーのアクセスキーとシークレットアクセスキーをダウンロードできるので、設定のためにダウンロードします。
​
その後、自分のローカルの aws クレデンシャルファイルに、ユーザ名とアクセスキーの情報を設定します。

ローカルのホームディレクトリ上に `.aws/credentials` ファイルを作成します（既にある場合はそれを利用します）

credentials ファイルの中身は以下のようにします。XX にはダウンロードしたキーの値を設定します。

複数のアカウントのデータを設定したい場合は、default の部分を他のユーザ名にして登録します。

```
[default]
aws_access_key_id=XXXXXXXXXXXXXXXXXXXX
aws_secret_access_key=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
region=ap-northeast-1
output=json

# 他のユーザも登録したいとき
[(ユーザ名)]
aws_access_key_id=XXXXXXXXXXXXXXXXXXXX
aws_secret_access_key=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
region=ap-northeast-1
output=json
```

aws cli を利用する時は、credentials に記載されているユーザデータが利用されます。

現在どのユーザデータを利用しているかは、 `aws configure list` コマンドで確認できます。

```
$ aws configure list
      Name                    Value             Type    Location
      ----                    -----             ----    --------
   profile                <not set>             None    None
access_key     ******************** shared-credentials-file
secret_key     ******************** shared-credentials-file
    region           ap-northeast-1      config-file    ~/.aws/config
```

ユーザーを変えるには、環境変数`AWS_PROFILE`に credentials で設定したユーザ名を設定することで、ユーザーの切り替えを行えます。

```
$ export AWS_PROFILE=(ユーザ名)
```

## AWS CDK のインストール

​ ではここから、CDK のインストールを行なっていきます。

まずは npm を利用して、aws-cdk をグローバルにインストールします。

```
npm install -g aws-cdk
```

​
実行後、正しくインストールされているかを確認するため、以下のコマンドを実行して cdk のバージョン番号を確認します。
​

```
npx cdk --version
2.84.0 (build f7c792f)
```

​

## CDK プロジェクトの作成

​
次に、CDK 用のフォルダを作成し、移動する
​

```bash
mkdir cdk用プロジェクト名
cd cdk用プロジェクト名
```

​
その後、そこで CDK プロジェクトを作成する（typescript）
​

```bash
npx cdk init app --language typescript
```

​

## 作成されるファイルについて

​
cdk プロジェクト作成時に作成される最初のファイルについてを示す。
​

### **lib/(アプリ名)-stack.ts**

​

- メインスタックを定義するところ
- 基本的にこのファイルを編集していきます
  ​

### **lib/(アプリ名).ts**

​

- アプリのエントリーポイントで、スタックファイルをロードするところ

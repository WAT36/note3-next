---
title: "CloudFormation(CDK)を導入してみた"
excerpt: "CDKを導入したのでその方法を書く"
coverImage: "/assets/posts/cdkFirstStep/cdkLogo.png"
date: "2023-07-30T23:48:18.000Z"
updatedAt: "2025-05-30T22:39:37.000Z"
tag: ["AWS", "IaC"]
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
---

​
近年はサーバーなどのインフラサービスを全てコードで管理する IaC(Infrastructure as Code)が流行っている。
​

IaC が行えるサービスは Terraform などがあるが、今回自分は AWS 上でいろいろサービスを構築していることから、AWS サービスをコードで構築・管理できる「CloudFormation」を利用してみた。
​

# CloudFormation とは

​
CloudFormation は AWS サービスの一つで、AWS 上のサービスやインフラリソースをコードベースで管理し、デプロイを実行する事でそのコードで定義した通りのインフラリソースを AWS 上にデプロイしてくれるサービスである。
​

CloudFormation で使われるコードは、JSON または YAML 形式である。

![](/assets/posts/cdkFirstStep/cloudFormation.png)

​
直接 JSON や YAML 形式で書いても良いが、AWS CDK というライブラリを利用すると、主だったプログラミング言語で CloudFormation に対応するコードが記述できる。その AWS CDK についてを以下に述べる。
​

# AWS CDK とは

​
AWS CDK (AWS Cloud Development Kit) は、主要なプログラミング言語で記述されたコードを CloudFormation テンプレートに変換し、AWS 上にサービス等をデプロイできるフレームワークである。

​
利用できる言語には、TypeScript, Python, Javascript, Java, C#/.NET, Go 言語等がある。

​
AWS CDK を利用して作成されたコードにより、CloudFormation 用のテンプレートが生成される。更にそれをデプロイすることで AWS 上にサービスをデプロイできる。
​

![](/assets/posts/cdkFirstStep/cdkDeployFlow.png)

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
まずは AWS CLI をインストールし、CloudFormation が実行できる IAM ユーザでログインする様に設定する。
​

AWS CLI とは自分のコマンドライン上から、AWS のサービスやリソースを制御・操作できるコマンドラインインターフェースである。

​
インストールするには下記のような、curl を利用してインストールする。
​

```bash
$ curl "https://awscli.amazonaws.com/AWSCLIV2.pkg" -o "AWSCLIV2.pkg"
$ sudo installer -pkg ./AWSCLIV2.pkg -target /
```

​
実行後、AWS CLI がインストールされたことを aws コマンドを実行する事で確認する。

```bash
$ aws --version
```

​
他環境でのインストール方法については、以下の公式ページを参考のこと。

​
[AWS CLI の最新バージョンを使用してインストールまたは更新を行う(公式ページ)](https://docs.aws.amazon.com/ja_jp/cli/latest/userguide/getting-started-install.html)
​​

## AWS CLI での IAM ユーザー設定

​
AWS CLI では AWS にログインするユーザー（IAM ユーザー）の情報を利用してログインし、AWS の操作を行う。

​
そのためまず、AWS 上で AWS CLI が利用するための IAM ユーザーを作成する。

​
AWS マネジメントコンソールから IAM のコンソールに行き、ユーザーの作成を行う。

![](/assets/posts/cdkFirstStep/iamUserOnConsole.png)

![](/assets/posts/cdkFirstStep/iamUserName.png)

​
作成したユーザーに所属させたい IAM グループがある場合は、各自の環境に応じて設定すること。

​
IAM グループではなくロールやポリシーをアタッチする場合は、「ポリシーを直接アタッチする」所で設定する。

今回は説明用として AdministratorAccess を利用する。しかし、最小権限で行うのが望ましいので、CDK の運用時にはこのポリシーではなく必要最低限な許可を付与すること。

![](/assets/posts/cdkFirstStep/iamAdministratorAccess.png)

​
IAM ユーザーを作成した後、ユーザーの詳細ページにあるセキュリティ認証情報＞アクセスキー　からアクセスキーとシークレットアクセスキーを作成し、ダウンロードする。

![](/assets/posts/cdkFirstStep/iamAccessKey.png)

​
その後、自分のローカルの aws クレデンシャルファイルに、ユーザ名とアクセスキーの情報を設定する。

ローカルのホームディレクトリ上に `.aws/credentials` ファイルを作成する（既にある場合はそれを利用する）

credentials ファイルの中身は以下のようにする。XX にはダウンロードしたキーの値を設定する。

複数のアカウントのデータを設定したい場合は、default の部分を他のユーザ名にして登録する。

```plaintext
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

aws cli を利用する時は、credentials に記載されているユーザデータが利用される。

現在どのユーザデータを利用しているかは、 `aws configure list` コマンドで確認できる。

```bash
$ aws configure list
      Name                    Value             Type    Location
      ----                    -----             ----    --------
   profile                <not set>             None    None
access_key     ******************** shared-credentials-file
secret_key     ******************** shared-credentials-file
    region           ap-northeast-1      config-file    ~/.aws/config
```

ユーザーを変えるには、環境変数`AWS_PROFILE`に credentials で設定したユーザ名を設定することで、ユーザーの切り替えを行える。

```bash
$ export AWS_PROFILE=(ユーザ名)
```

## AWS CDK のインストールとブートストラップ

​ ここから、CDK のインストールを行なっていく。

まずは npm を利用して、aws-cdk をグローバルインストールする。

```bash
$ npm install -g aws-cdk
```

​
実行後、正しくインストールされているかを確認するため、以下のコマンドを実行して cdk のバージョン番号を確認する。
​

```bash
$ npx cdk --version
2.84.0 (build f7c792f)
```

その後、最初の設定として **ブートストラップ** を行う。

ブートストラップとは、CDK でのデプロイ時に利用する、専用の S3 バケットとその他のコンテナ類を作成する作業である。

ブートストラップの実行には以下のコマンドで行う。

```bash
$ npx cdk bootstrap aws://(アカウント番号)/(リージョン名)
```

なお、アカウント番号が不明な場合は、以下の aws コマンドで確認できる。

```bash
$ aws sts get-caller-identity
{
    "UserId": "(ユーザID)",
    "Account": "(アカウント番号)",
    "Arn": "arn:aws:iam::(アカウント番号):user/(IAMユーザ名)"
}
```

## CDK プロジェクトの作成

次に、CDK のプロジェクトを作成する。

CDK のプロジェクト用のフォルダを作成し、移動する。
​

```bash
$ mkdir (cdk用プロジェクト名)
$ cd (cdk用プロジェクト名)
```

今回の例では、プロジェクト名を"cdk-test"としてやっていく。
​
その後、そこで CDK プロジェクトを作成するコマンドを実行する。

```bash
$ npx cdk init app --language typescript
```

ここで指定している"app"は CDK 作成時のテンプレートの名前である。

デフォルトでは app が使用される。

```plaintext
Available templates:
* app: Template for a CDK Application
   └─ cdk init app --language=typescript
* lib: Template for a CDK Construct Library
   └─ cdk init lib --language=typescript
* sample-app: Example CDK Application with some constructs
   └─ cdk init sample-app --language=typescript
```

これにより CDK プロジェクトが作成される。

次にどのようなファイルが作成されるかを見ていく。

## 作成されるファイルについて

​
cdk プロジェクト作成時に作成される最初のファイルについてを見ていく。

上記の cdk init コマンドを実行すると、以下のファイル群が作成される。
​![](/assets/posts/cdkFirstStep/cdkFiles.png)

このうち、重要なファイルについてを以下に記す。

### **bin/(プロジェクト名).ts**

​bin フォルダに`(プロジェクト名).ts`というファイルが作成される。（今回の例だと cdk-test.ts）
​![](/assets/posts/cdkFirstStep/bin-cdk-test-ts.png)

このファイルは CDK プロジェクトのエントリーポイントで、CDK コマンドでのデプロイ時に真っ先に実行される。

初期状態で画像のようにコメントが記載されており、ここの通りで利用するにはアカウント、リージョンを指定して行う。（大体環境変数や.env ファイルに指定する形で`{ account: '123456789012', region: 'us-east-1' }`のように）

このファイルから、後述するスタックごとのファイルをロードし、スタックの内容に応じて AWS へリソースのデプロイを行う。

### **lib/(プロジェクト名)-stack.ts**

lib フォルダに`(プロジェクト名)-stack.ts`というファイルが作成される。 (今回の例だと cdk-test-stack.ts)
​![](/assets/posts/cdkFirstStep/lib-cdk-test-stack-ts.png)

このファイルは CDK で使われる一つのスタックの定義ファイルとして利用し、デプロイすると作成される AWS のリソースやサービスを定義する。

上記の bin/(プロジェクト名).ts 内でこのファイルで定義されているスタックのクラスを利用しており、CDK でのデプロイを行うことでこのスタックに書かれている内容に基づいたリソースがデプロイされる。

## 別スタックを作成したい時

上記の lib/(プロジェクト名)-stack.ts とは別のスタックを定義したい時は、別スタック用のファイルを作成し、その中に同様にして別スタックを示すクラスを作成する。

そして、bin/(プロジェクト名).ts 内で、そのスタックのクラスを利用するように書き換える。

# CDK の利用方法

では、実際に CDK を使ってデプロイ等を行なってみよう。

ここでは例として、S3 バケットを作成する。

## コードの定義

デプロイに利用するスタック内に、S3 バケットを作成するコードを記述します。

先程の lib/cdk-test-stack.ts を利用します。

```typescript
import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as s3 from "aws-cdk-lib/aws-s3";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CdkTestStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'CdkTestQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });

    // S3 Bucket
    const s3Bucket = new s3.Bucket(this, "CdkTestS3Bucket", {
      bucketName: "cdktests-bucket",
    });
  }
}
```

そして、このスタックを cdk コマンドを使いデプロイします。

スタック名は bin/cdk-test.ts 内で'CdkTestStack'としているので、それを利用します。

```bash
$ cdk deploy CdkTestStack
```

すると設定した AWS アカウントでスタックがデプロイされ、定義している S3 バケットが作られます。
​![](/assets/posts/cdkFirstStep/cdkS3BucketCreated.png)

## cdk コマンド

インストールした cdk コマンドには色々なコマンドがある。

以下にいくつか紹介する。

### CDK プロジェクト作成

`cdk init [テンプレート] --language (言語名)`

先ほども利用した、CDK プロジェクトを作成するコマンドである。

テンプレートは app, lib, sample-app のいずれかを指定する。cdk アプリケーションを作成したい場合は app を利用する。デフォルトでは app になっている。

### ブートストラップ

`cdk bootstrap`

こちらも先ほど利用した、CDK のブートストラップを行うコマンドである。

### アプリ内のスタック一覧表示

`cdk ls`

こちらは今 CDK プロジェクト内にどのスタックが存在するかを出力してくれます。

### AWS CloudFormation テンプレートの作成

`cdk synth (スタック名)`

こちらは今あるスタックのコードを元に、CloudFormation テンプレートを作成して出力する。

自身の書いたスタックのコードが正しいリソースとしてデプロイされるか確認したいときに利用できる。

### 差分確認

`cdk diff (スタック名)`

こちらは現在のローカル上のスタックのコードの内容と、今 AWS 上にデプロイされているスタックとのリソース内容とでの差異を出力する。

デプロイする前に確認の意味でやっておくと良い。

### スタックのデプロイ

`cdk deploy (スタック名)`

こちらは具体的に AWS へスタックをデプロイするコマンドである。

実行するとデプロイが進み、リソースが作成・更新されます。

### **アプリの削除**

`cdk destroy`

こちらはデプロイされているスタックを削除するコマンドです。

---

いくつか代表的なものとして述べましたが、この他にも cdk コマンドは存在する。

cdk コマンドの詳細については、以下の公式ページを参照されたし。

[AWS CDK ツールキット (cdk コマンド) (公式ページ)](https://docs.aws.amazon.com/ja_jp/cdk/v2/guide/cli.html)

## CDK 公式レファレンス

ここで使用した S3 を作るコードは、CDK のライブラリで定義されており、他のリソースやサービスを作成することももちろん可能である。

CDK のライブラリの全容については、以下の公式レファレンスを参考のこと。

[AWS CDK Reference Documentation](https://docs.aws.amazon.com/cdk/api/v2/)

# 参考ページ

- [AWS CDK の開始方法(公式ページ)](https://docs.aws.amazon.com/ja_jp/cdk/v2/guide/getting_started.html)
- [ブートストラッピング(公式ページ)](https://docs.aws.amazon.com/ja_jp/cdk/v2/guide/bootstrapping.html)
- [スタック(公式ページ)](https://docs.aws.amazon.com/ja_jp/cdk/v2/guide/stacks.html)
- [AWS CDK Reference Documentation](https://docs.aws.amazon.com/cdk/api/v2/)

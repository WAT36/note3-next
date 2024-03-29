---
title: 'S3の静的webサイトホスティング'
excerpt: 'AWS S3で低コストでサイトを公開する'
coverImage: '/assets/posts/s3StaticHost/coverImage.png'
date: '2023-02-04T15:31:15.000Z'
tag: ["AWS","S3"]
author:
  name: Tatsuroh Wakasugi
  picture: '/assets/blog/authors/WAT.jpg'
ogImage:
  url: ''
draft: false
---

この３代目ブログをどこで立てて公開すべきか？と考えた時,  
先代まではGithub Pagesを使っていたが

量多くなりそうだしちょっと新しい試みをしたいと言う事で
AWS S3の静的サイトホスティングでやる事にしてみた。

その手順を記しておく。

# S3と静的サイトホスティングとは

S3とは高容量・耐久性に優れたAWSのオブジェクトストレージサービスであり、ユーザーは好きなオブジェクト、ファイル等を保管できる。

そしてこのS3に静的コンテンツを保管する事で、静的なWebサイトを作り公開することができる。これがS3で行う静的Webサイトホスティングである。

# 設定手順

実際にS3で静的Webサイトホスティングを行う手順についてを示す。

## 利用するファイル例

今回は公開用の例として、以下のindex.htmlと、エラー発生時に表示する用のerror.htmlを利用する。


- index.html

```html
<html>
<head>
<meta charset="utf-8">
<title>S3 静的ホスティング用</title>
</head>
<body>
Hello! S3!
</body>
</html>
```


- error.html

```html
<html>
<head>
<meta charset="utf-8">
<title>S3 404 Not Found</title>
</head>
<body>
エラー：存在しないページです。
</body>
</html>
```

今回はこれらのファイルを利用して、静的ホスティングを行う。


## S3バケットの作成

まずは今回Webサイトを公開する用のバケットを新規作成する。

AWSマネジメントコンソールに入り、S3のセクションへと行く。

そこで、バケットを新規作成する。

バケット名を入力し、

![](/assets/posts/s3StaticHost/s3_001.png)

パブリックアクセスのブロックをオフにする。

![](/assets/posts/s3StaticHost/s3_002.png)

暗号化を設定して、最後に「バケットを作成」を押下する。

![](/assets/posts/s3StaticHost/s3_003.png)

すると、バケットが新規作成される。

![](/assets/posts/s3StaticHost/s3_004.png)

## 静的Webサイトホスティングの設定

次に作成したバケットに対し、静的Webサイトホスティングの設定を行う。

S3コンソールから作成したバケットを開いて、「プロパティ」を押下する。

![](/assets/posts/s3StaticHost/s3_005.png)

その中に、「静的ウェブサイトホスティング」と言う項目があり、デフォルトでは無効になっているので、ここの「編集」ボタンを押下する。

![](/assets/posts/s3StaticHost/s3_006.png)

その後、編集項目が何個かあるので、以下で設定する。

- 静的ウェブサイトホスティング：  ここは「有効にする」
- ホスティングタイプ：  バケットで公開するので、ここは「静的ウェブサイトをホストする」
- インデックスドキュメント：　公開するWebサイトの全体的なトップページ。ここは初めに例で示した「index.html」を指定する
- エラードキュメント：  エラーページ用のファイル。ここも例で示した「error.html」を指定。

設定が終わったら、「変更の保存」を押して保存する。

すると、静的ウェブサイトホスティングが有効化される。

コンソール上の、静的ウェブサイトホスティングの項目にURLが表示され、これがウェブサイトのURLになる。

![](/assets/posts/s3StaticHost/s3_007.png)

## バケットポリシーの設定

次に、バケットポリシーを設定して、バケット内のサイトにアクセス許可を行う。

同様に、S3コンソールから「アクセス許可」のタブを開く。

そこの「バケットポリシー」の欄を編集して、以下の内容を設定する。

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": [
                "s3:GetObject"
            ],
            "Resource": [
                "arn:aws:s3:::バケット名/*"
            ]
        }
    ]
}
```

![](/assets/posts/s3StaticHost/s3_010.png)

エラー等なければバケットポリシーが正常に設定される。

## ファイルのアップロード

現在はindex.html、error.htmlがまだバケットにないので、サイトは表示されない。

そのため、この２ファイルをバケットにアップロードする。

![](/assets/posts/s3StaticHost/s3_008.png)

![](/assets/posts/s3StaticHost/s3_009.png)

## サイトにアクセスして確認

最後に、ウェブサイトのURLにアクセスして、正常に表示されるか確認する。

すると、表示された。

![](/assets/posts/s3StaticHost/s3_011.png)

また、このURL下で存在しないURLにアクセスすると

![](/assets/posts/s3StaticHost/s3_012.png)

エラーページが表示された。


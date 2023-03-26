---
title: 'S3静的ホスティングサイト + Cognito認証'
excerpt: 'S3での静的Webホスティングで立てたサイトにCognitoによる認証を付ける'
coverImage: '/assets/posts/s3HostingCognito/loginUI.png'
date: '2023-02-16T22:29:57.000Z'
updatedAt: '2023-02-16T22:29:57.000Z'
tag: ["AWS","S3","Cognito"]
author:
  name: Tatsuroh Wakasugi
  picture: '/assets/blog/authors/WAT.jpg'
ogImage:
  url: ''
draft: false
---

先程は S3の静的Webサイトホスティング で立てたWebサイトに、 Route53,ACM,Cloudfrontを利用してHTTPS化設定を行った。

今回は、Cognito による認証を付け加えて、静的Webサイトを限られたユーザしか閲覧できないようにしてみよう。

# S3パブリックアクセスを無効・OACの設定をする

Cognitoの設定の前に、デフォルトの状態だとS3上の静的Webホスティングサイトが誰でも見える状態なので、まずS3のパブリックアクセスを無効化させる。

1. コンソールからS3へ行き、該当のバケットへ
2. アクセス許可　からブロックパブリックアクセス　を参照し、「パブリックアクセスをすべてブロック」をオンにする

![](/assets/posts/s3HostingCognito/s3BlockPublicAccess.png)

3. S3バケットポリシーを更新し、OACを適用する。

S3の対象バケットに行って、バケットポリシーを以下で更新する。（これにより、静的WebサイトへのアクセスがCloudfront経由になるように限定される。S3に直接アクセスすると認証エラーとなる。）

```json
{
    "Version": "2008-10-17",
    "Id": "PolicyForCloudFrontPrivateContent",
    "Statement": [
        {
            "Sid": "AllowCloudFrontServicePrincipal",
            "Effect": "Allow",
            "Principal": {
                "Service": "cloudfront.amazonaws.com"
            },
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::<バケット名>/*",
            "Condition": {
                "StringEquals": {
                  "AWS:SourceArn": "arn:aws:cloudfront::<アカウントID>:distribution/<ディストリビューションID>"
                }
            }
        }
    ]
}
```

# Cognito

次に認証基盤となる、Cognitoの設定を行う。

## ユーザープールの作成

まずは、閲覧できるユーザーの管理を行うユーザープールを作成する。
今回は、ユーザーの登録は管理側で行うものとし、サインアップは行えないようにする。

1. Cognitoコンソールへ行く。リージョンは各自置きたい場所にする
2. まずは「ユーザープールの作成」へ

![](/assets/posts/s3HostingCognito/cognitoConsole.png)

3. プロバイダーのタイプは「Cognitoユーザープール」を選択
4. サインインオプションはユーザー名だけにする
5. ユーザー名の要件は任意のユーザー名でサインインすることを許可とし、大文字小文字区別にもチェックを入れる
6. その後「次へ」

（4.,5.は各自必要に応じて設定）

![](/assets/posts/s3HostingCognito/signinExperience.png)

7. パスワードポリシーはCognitoのデフォルト
8. MFAは今回はなし
9. ユーザアカウントの復旧：　セルフサービスのアカウントの復旧：　今回は無効（パスワード忘れたら管理側で設定する）
10. その後「次へ」

(7.,8.,9. は各自必要に応じて設定)

![](/assets/posts/s3HostingCognito/securityConfig.png)

11. セルフサービスのサインアップ の 自己登録の有効化　はなし。 (管理者のみにユーザーの作成を許可する形にする)
12. 属性検証とユーザーアカウントの確認
 - Cognito が検証と確認のためにメッセージを自動的に送信することを許可 今回はなし
13. その後「次へ」

(11.,12. は各自必要に応じて設定)

![](/assets/posts/s3HostingCognito/signupExperience.png)

14. Eメールプロバイダー　Cognitoから送信で
15. 送信元アドレスはとりあえずデフォルト
16. その後「次へ」

(14.,15. は各自必要に応じて設定)

![](/assets/posts/s3HostingCognito/emailConfig.png)

17. ユーザープール名 を入力する
18. ホストされた認証ページ　CognitoのホストされたUIを必要　にチェックを入れる
19. Cognitoドメイン　を各自入力する
19. 最初のアプリケーションクライアント　はパブリッククライアント　
20. アプリケーションクライアント名を入力
21. クライアントシークレットを生成しない　を設定
22. 許可されているコールバックURL　には認証後表示するページのURL　を入力
22. その後「次へ」

(17.,~21. は各自必要に応じて設定)

![](/assets/posts/s3HostingCognito/applicationIntegration.png)

23. 最後の 確認及び作成 セクションで設定事項を確認
24. 良ければユーザープールの作成　へ

これで、ユーザープールが作成される。

## ユーザープールによる認証

次に、静的Webサイトにアクセスした時に、Cognitoユーザープールによる認証画面を出させるように設定する。

1. ユーザープールが作成されたらそのユーザープールを開き　アプリケーションの統合＞アプリクライアントと分析＞アプリケーションクライアント名 から、作成されたアプリケーションクライアントを開く

![](/assets/posts/s3HostingCognito/appClient.png)

2. その中の「ホストされたUI」で、編集ボタンを押下

![](/assets/posts/s3HostingCognito/hostedUIConfig.png)

3. 「許可されているサインアウトURL」はサインアウト後に遷移する先のURLがあればHTTPSで設定する。（各自の環境に合わせて設定する）
4. IDプロバイダー　でCognitoユーザープールを選択
5. OAuth2.0許可タイプ　は暗黙的な付与を設定する
6. OpenID接続スコープ　はOpenIDを設定する
7. その後「変更の保存」

9. そのあと、以下にアクセスして、ログイン画面が出てくるか確認する

```
(CognitoドメインのURL)/login?response_type=token&client_id=(アプリクライアント ID)&redirect_uri=(3.のコールバック URL)
```

表示されれば認証は行えている。

## IDプールの作成

次にIDプールの作成を行う。認証が通ったユーザーに対し、S3への読み取り権限を行えるロールを付与する。

1. Cognitoのコンソールから
2. 「フェデレーティッドID」から「新しいIDプールの作成」へ行く
3. IDプール名を入力
4. 「認証されてないID」の「認証されてないIDに対してアクセスを有効にする」はオフにする
5. 「認証プロバイダー」には、作成したCognitoユーザープールIDとアプリクライアントIDを入力する。
6. その後「プールの作成」

![](/assets/posts/s3HostingCognito/idPool.png)

7. すると認証成功時に付与されるIAMロールの設定画面が表示される
8. ここには、対象バケットが見れるようなIAMロールを指定する。新しく作成する場合、インラインで以下を設定する。

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": "s3:ListBucket",
            "Resource": "arn:aws:s3:::(バケット名)"
        },
        {
            "Effect": "Allow",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::(バケット名)/*"
        }
    ]
}
```

9. 入力したら「許可」を押す


## ログインユーザーの作成

その後、認証用のユーザーを作成する。
今回はログインユーザーの登録は管理者側だけで行えるようにしたため、こちら側からコンソール上での登録を行ってみる。

1. コンソールで、該当のユーザープールを開き、ユーザー＞ユーザーの作成　を押下

![](/assets/posts/s3HostingCognito/user.png)

2. ユーザー名　でユーザー名を入力する。
3. 仮パスワード　で、仮パスワードを入力する
4. 確認したら「ユーザーの作成」

![](/assets/posts/s3HostingCognito/createUser.png)

5. すると、ユーザーが作成される

# 認証をトライ

1. では、静的WebサイトのURL(先程のコールバックURL)に行き、Cognito UI画面からユーザ名とパスワードを入力して認証
2. 仮パスワード入力後、本パスワードに変更するよう求められるので入力
3. すると入れる　はず！




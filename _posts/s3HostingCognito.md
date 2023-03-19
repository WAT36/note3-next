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

# Cognito

まずは認証基盤となる、Cognitoの設定を行う。

## ユーザープールの作成

まずは、閲覧できるユーザーの管理を行うユーザープールを作成する。
今回は、ユーザーの登録は管理側で行うものとし、サインアップは行えないようにする。

1. Cognitoコンソールへ行く
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
19. 最初のアプリケーションクライアント　はパブリッククライアント　
20. アプリケーションクライアント名を入力
21. クライアントシークレットを生成しない　を設定
22. その後「次へ」

(17.,~21. は各自必要に応じて設定)

![](/assets/posts/s3HostingCognito/applicationIntegration.png)

23. 最後の 確認及び作成 セクションで設定事項を確認
24. 良ければユーザープールの作成　へ
25. ユーザープールが作成される


- ユーザープールが作成されたらそのユーザープールを開き　アプリケーションの統合＞アプリクライアントと分析＞アプリケーションクライアント名へ
- アプリケーションクライアント名　を入力
- ホストされたUI　で編集
- IDプロバイダー　でCognitoユーザープールを選択
- "コールバック URL"、"サインアウト URL" を HTTPS で設定する。ここではコールバックURLは S3 バケットにある index.html の オブジェクト URL 、サインアウトURLはgoogleなどを入れる。
- ↑ **（S3の静的webホスティングでHTTPS化しておく必要がある！！）** 
- OAuth2.0許可タイプ　は暗黙的な付与
- OpenID接続スコープ　はOpenIDを入れる
- で変更の保存

- アプリケーションの統合＞ドメイン名　でCognitoドメインの作成　をする、名前も入力する

- そのあと、以下にアクセスして、ログイン画面が出てくるか確認する
(CognitoドメインのURL)/login?response_type=token&client_id=(アプリクライアント ID)&redirect_uri=(コールバック URL)

そのあと、認証用のユーザーを作成する。

- コンソールで、該当のユーザープールから「ユーザーの作成」
- ユーザー名　でユーザー名を入力する。
- 仮パスワードの設定、入力する
- で確定

- 作成後、先ほどのログインURLに行き、ユーザ名とパスワードを入力
- 仮パスワード入力後、本パスワードに変更するよう求められるので入力（この時Emailも求められたが、、設定ミスったか）
- すると入れる　はず

## S3パブリックアクセスを無効にする

今のこの状態だとS3が誰でも見える状態なので、認証されたユーザ以外見れないようにまずS3のパブリックアクセスを無効化させる。

- コンソールからS3へ行き、g該当のバケットへ
- アクセス許可　からブロックパブリックアクセス　を参照し、パブリックアクセスをオンにする

- バケットポリシーで、トップページだけアクセス可能にし他はできないようにする（以下のような設定）

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::(バケット名)/index.html"
        }
    ]
}
```

また、S3でCORSの設定に以下のJSONを設定する。

```json
[
    {
        "AllowedHeaders": [
            "*"
        ],
        "AllowedMethods": [
            "GET",
            "HEAD"
        ],
        "AllowedOrigins": [
            "*"
        ],
        "ExposeHeaders": []
    }
]
```


## IDプールの作成

次にIDプールの作成を行う。認証gが通ったユーザーに対し、S3への読み取り権限を行えるロールを付与する。

- AWSマネジメントコンソールからCognitoへ
- 「IDプールの作成」へ行く
- IDプール名を入力
- 「認証されてないID」の「認証されてないIDに対してアクセスを有効にする」をオンにする
- 「認証プロバイダー」には、作成したCognitoユーザープールIDとアプリクライアントIDを入力する。
- で「プールの作成」
- すると認証成功時に付与されるIAMロールの設定画面がでる
- ここで、対象バケットが見れるようなIAMロールを指定する。新しく作成する場合、インラインで以下

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

- 入力したら許可

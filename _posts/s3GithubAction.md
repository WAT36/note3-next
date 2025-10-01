---
title: "Github ActionでNext.jsのコードをS3に上げる"
excerpt: "Githubにpushしたら自動でS3にデプロイされる"
coverImage: "/assets/posts/s3GithubAction/github_actions.png"
date: "2023-02-21T22:50:12.000Z"
updatedAt: '2025-09-30T23:06:24.000Z'
tag: ["AWS", "CI/CD"]
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
draft: false
---

自分の Github 上のレポジトリ にある Next.js のコード類を AWS S3 に上げるなどしたい時はどうすれば良いか。

今回はその方法を実践してみた。

# Github でリポジトリとコードを用意する

まずは自分の Github アカウントで、Github が S3 にアップロードするためのリポジトリ及びコードを用意しておく。

# ビルド設定

package.json で、以下のスクリプトを追加する。

```json
  "scripts": {
    //・・・
    "export": "next build && next export",
    //・・・
  },
```

これにより、ビルド時に next.js のコードが out ディレクトリ に出力される。

しかし、`next export`コマンドを実行した時、`next/image`ライブラリをインポートしている箇所があると動作しないので、コード中からは削除しておく。（HTML の img 要素に置き換える）

# コードを上げるための S3 を用意する

自分の AWS 上で、コードを保管するための S3 バケットを用意する。

この方法については、前述までの記事を参照。

# IAM ユーザを作成する

次に、対象バケットにアクセスするための IAM ユーザを作成する。

IAM ユーザのコンソールに行き、ユーザの作成へ行く。

1. まずはユーザー名を入力

![](/assets/posts/s3GithubAction/iamUser.png)

2. 次の「許可を設定」で、「ポリシーを直接アタッチ」を選択

~~3. アタッチする許可ポリシーは、「S3FullAccess」を選択する~~

※修正(2024/6/27) S3FullAccess は権限が広く望ましくないので、以下に変更 3. 「ポリシーの作成」を押下

- ポリシーエディタを JSON にして、以下のように記述し、「次へ」

(※Sid の欄は名前は何でも良い。(S3 バケット名)の箇所は適宜書き換えること)

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "VisualEditor0",
      "Effect": "Allow",
      "Action": "s3:PutObject",
      "Resource": "arn:aws:s3:::(S3バケット名)/*"
    },
    {
      "Sid": "VisualEditor1",
      "Effect": "Allow",
      "Action": "s3:ListBucket",
      "Resource": "arn:aws:s3:::(S3バケット名)"
    },
    {
      "Sid": "VisualEditor2",
      "Effect": "Allow",
      "Action": "s3:DeleteObject",
      "Resource": "arn:aws:s3:::(S3バケット名)/*"
    }
  ]
}
```

- ポリシー名を入力して「ポリシーの作成」
- IAM ポリシーが作成される。
- 元の IAM ユーザー作成の画面に戻って、「許可ポリシー」の欄から先ほど作成した IAM ポリシーを指定する。

4. 「次へ」

![](/assets/posts/s3GithubAction/iamUser.png)

5. 設定事項を確認し「ユーザーの作成」
6. するとユーザーが作成される。ユーザー一覧から作成したユーザーをクリックして詳細を表示する。
7. 「セキュリティ認証情報」タブを開く

![](/assets/posts/s3GithubAction/createdIamUser.png)

8. アクセスキーから「アクセスキーを作成」
9. 最初の「主要なベストプラクティスと代替案にアクセスする」では「**その他**」を選択
10. 「説明タグを設定」で説明を入力し、「アクセスキーを作成」
11. するとアクセスキーとシークレットアクセスキーが作成、表示されるので、どこかにメモしておく。（この画面を逃すと確認できないので必ず記憶しておくこと）

- 「.csv ファイルをダウンロード」でダウンロードしておくのが良い

# Github 側での設定(環境変数の登録)

自分の Github に、作成した IAM ユーザーのアクセスキーを登録する。

1. Github の該当するレポジトリのページ＞ Settings ＞ Secrets and Variables ＞ Actions 　へ行く
2. 「New Repository Secrets」を押下
3. その後に IAM ユーザのアクセスキー、シークレットアクセスキーをそれぞれ登録

- アクセスキーの名前は「AWS_ACCESS_KEY_ID」
- シークレットアクセスキーの名前は「AWS_SECRET_ACCESS_KEY」　などの名前で登録する。（次節で使用）

# Workflow の作成

最後に、workflow の作成を行う。

- Github の該当するレポジトリのページ＞ Actions
- 「set up a workflow yourself」を押下
- ファイル名を適当に設定して、コードを以下のように設定

```yaml
name: Build React on S3
on:
  push:
    branches:
      - main
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@main # リポジトリをチェックアウト

      - name: Install Dependencies
        run: npm install

      - name: Build and Export
        run: npm run export

      - name: Deploy # S3にデプロイ
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        run: aws s3 sync --region ap-northeast-1 ./out s3://(バケット名) --delete
```

- 作成が終わったら「Start Commit」を押下すると、上記のファイルが github に入る。
- 対象のブランチに push すると、上記コードのアクション(S3 にデプロイ)
- レポジトリ の「Action」タブから実行状況を確認できる。

![](/assets/posts/s3GithubAction/result.png)

完了後、S3 の静的 Web サイトに行ってみよう。push した内容が反映されていれば OK。

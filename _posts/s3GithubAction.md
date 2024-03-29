---
title: 'Github ActionでNext.jsのコードをS3に上げる'
excerpt: 'Githubにpushしたら自動でS3にデプロイされる'
coverImage: '/assets/posts/s3GithubAction/github_actions.png'
date: '2023-02-21T22:50:12.000Z'
updatedAt: '2023-02-21T22:50:12.000Z'
tag: ["AWS","S3","Github","Github Action","CI/CD","Next.js"]
author:
  name: Tatsuroh Wakasugi
  picture: '/assets/blog/authors/WAT.jpg'
ogImage:
  url: ''
draft: false
---

自分のGithub上のレポジトリ にあるNext.jsのコード類をAWS S3に上げるなどしたい時はどうすれば良いか。

今回はその方法を実践してみた。

# Githubでリポジトリとコードを用意する

まずは自分のGithubアカウントで、GithubがS3にアップロードするためのリポジトリ及びコードを用意しておく。

# ビルド設定

package.jsonで、以下のスクリプトを追加する。

```json
  "scripts": {
    //・・・
    "export": "next build && next export",
    //・・・
  },
```

これにより、ビルド時にnext.jsのコードがoutディレクトリ に出力される。

しかし、`next export`コマンドを実行した時、`next/image`ライブラリをインポートしている箇所があると動作しないので、コード中からは削除しておく。（HTMLのimg要素に置き換える）

# コードを上げるためのS3を用意する

自分のAWS上で、コードを保管するためのS3バケットを用意する。

この方法については、前述までの記事を参照。

# IAMユーザを作成する

次に、対象バケットにアクセスするためのIAMユーザを作成する。

IAMユーザのコンソールに行き、ユーザの作成へ行く。

1. まずはユーザー名を入力

![](/assets/posts/s3GithubAction/iamUser.png)

2. 次の「許可を設定」で、「ポリシーを直接アタッチ」を選択
3. アタッチする許可ポリシーは、「S3FullAccess」を選択する
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
  - 「.csvファイルをダウンロード」でダウンロードしておくのが良い

# Github側での設定(環境変数の登録)

自分のGithubに、作成したIAMユーザーのアクセスキーを登録する。

1. Githubの該当するレポジトリのページ＞Settings＞Secrets and Variables＞Actions　へ行く
2. 「New Repository Secrets」を押下
3. その後にIAMユーザのアクセスキー、シークレットアクセスキーをそれぞれ登録
  - アクセスキーの名前は「AWS_ACCESS_KEY_ID」
  - シークレットアクセスキーの名前は「AWS_SECRET_ACCESS_KEY」　などの名前で登録する。（次節で使用）


# Workflowの作成

最後に、workflowの作成を行う。

- Githubの該当するレポジトリのページ＞Actions
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
        uses: actions/checkout@main  # リポジトリをチェックアウト

      - name: Install Dependencies
        run: npm install

      - name: Build and Export
        run: npm run export

      - name: Deploy  # S3にデプロイ 
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        run: 
          aws s3 sync --region ap-northeast-1 ./out s3://(バケット名) --delete
```

- 作成が終わったら「Start Commit」を押下すると、上記のファイルがgithubに入る。
- 対象のブランチにpushすると、上記コードのアクション(S3にデプロイ)
- レポジトリ の「Action」タブから実行状況を確認できる。

![](/assets/posts/s3GithubAction/result.png)

完了後、S3の静的Webサイトに行ってみよう。pushした内容が反映されていればOK。
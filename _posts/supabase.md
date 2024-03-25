---
title: "supabaseのDBを利用してみた"
excerpt: "PlanetScaleDBからsupabaseへと変えてみた"
coverImage: ""
date: "2024-03-21T23:10:23.000Z"
updatedAt: "2024-03-21T23:10:23.000Z"
tag: []
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
---

以前の記事でも記載した、別の個人用サービスでの DB で利用していた PlanetScale が

まさかの無料プランがなくなり完全有料化に・・

というわけで、代替 DB を探していたところ

supabase を使ってみようかという事で

そちらでの DB 作成についての記録を残しておいた。

# supabase とは

https://supabase.com/

自分は詳しくないが Firebase の代替として書かれている BaaS(Backend as a Service)である。

PlanetScale と同じくサーバーレスなデータベースサービスを提供し、加えて認証、エッジファンクションの機能も提供している。

なお、利用しているデータベースは PostgreSQL である。

![](/assets/posts/supabase/price.png)

# 利用登録（サインアップ）

利用するには、まず公式サイトからアカウント登録（サインアップ）を行う。

![](/assets/posts/supabase/top.png)

画面に従いサインアップを行い、ログインすると、ダッシュボード画面が開かれる。

![](/assets/posts/supabase/dashboard.png)

New Project のボタンを押してプロジェクトを作成します。

プロジェクト名と DB のパスワードを設定します。

リージョンはなるべく近いところにしましょう。（私の場合は Tokyo です）

![](/assets/posts/supabase/newProject.png)

Create new Project を押すとプロジェクトが作成されます。

![](/assets/posts/supabase/project.png)

# DB を作成する

プロジェクトが作成されたので、DB を作成してみましょう。

サイドバーに「Table Editor」および「SQL Editor」という欄があり、そこから作成することができます。

Table Editor では GUI ベースで、列定義などを１つ１つ画面上で設定することでテーブルを作成することができます。

![](/assets/posts/supabase/newTable.png)

SQL Editor では、テーブル作成の SQL がある場合それを利用してテーブルを作成することができます。DDL がある場合は有用です。

# データの入力

テーブルが作成されたのでデータを入れてみましょう。

データの入力は先ほどの Table Editor から１個１個入れることもできます。

また、DML がある場合は先ほどの SQL Editor から入れることもできます。

![](/assets/posts/supabase/tableEditor.png)

# 外部からのアクセス

自分のローカル環境やアプリからなど、外部からこの DB に接続する時の設定をみましょう。

まず、ダッシュボードに行って右上の Connect を押します。

![](/assets/posts/supabase/connect.png)

すると接続情報が表示されます。各環境に応じた接続情報が書いてあるので、これをアプリ側などで利用してください。

![](/assets/posts/supabase/connectionString.png)

# あとがき

supabase で DB を作成し、この後にそれまで使っていた Planetscale からデータを引き抜いて、 supabase へと移しかえた。

supabase には通常の DB に加え認証用の機能も提供しているようなので、そちらにおいても今後触れて行きたいと思っている。

しかし、Planetscale が有料化されたという事は、今後 supabase においても同様のことが起こりうるといっても過言ではない気がする（他のサーバレス DB サービスにおいても同様）ので、、また注意が必要になる。

---
title: "supabaseのDBを利用してみた"
excerpt: "PlanetScaleDBからsupabaseへと変えてみた"
coverImage: "/assets/posts/supabase/supabaseLogo.png"
date: "2024-03-21T23:10:23.000Z"
updatedAt: "2024-03-21T23:10:23.000Z"
tag: ["データベース"]
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
---

以前の記事でも書いた、別の個人用サービスで利用していた PlanetScale が

まさかの無料プランがなくなり完全有料化に・・

https://planetscale.com/blog/planetscale-forever

というわけで、代替 DB を探していたところ

supabase を使ってみようかという事で

そちらでの DB 作成についての記録することにした。

# supabase とは

https://supabase.com/

supabase とは DB などを提供している BaaS(Backend as a Service)である。Firebase の代替サービスとして位置付けられている。

PlanetScale と同じくサーバーレスなデータベースサービスを提供し、加えて認証、エッジファンクションの機能も提供している。

なお、利用・提供しているデータベースは PostgreSQL である。

料金プランは、現時点(2024/3)では有料版の他に無料(Free)プランも存在する。

![](/assets/posts/supabase/price.png)

実際に利用してみよう。(Free プラン)

# 利用登録（サインアップ） ~ プロジェクト・DB を作成する

利用するには、まず公式サイトからアカウント登録（サインアップ）を行う。

![](/assets/posts/supabase/top.png)

画面に従いサインアップを行い、ログインすると、ダッシュボード画面が開かれる。

![](/assets/posts/supabase/dashboard.png)

New Project のボタンを押してプロジェクトを作成します。

その後、プロジェクト名と DB のパスワードを設定します。

リージョンはなるべく近いところで設定します。（私の場合は日本なので、 Tokyo にします）

![](/assets/posts/supabase/newProject.png)

Create new Project を押すとプロジェクトが作成されます。

![](/assets/posts/supabase/project.png)

# テーブルを作成する

プロジェクトおよび DB が作成されたので、テーブルを作成してみましょう。

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

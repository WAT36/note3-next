---
title: "Webページへのダークモードの設定方法"
excerpt: "CSSでダークモードを設定する方法"
coverImage: "/assets/posts/darkmode/darkTitle.png"
date: "2024-02-18T21:16:45.000Z"
updatedAt: '2025-10-02T00:31:47.000Z'
tag: ["フロントエンド"]
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
---

このブログにダークモードを設定してみたので、その方法と仕組みについて書き記しておく。

# ダークモードとは?

Web サイトでのダークモードとは、ユーザーが Web サイトや Web アプリケーションを訪れた際に、明るい背景色と明るいテキスト色の代わりに、暗い背景色と明るいテキスト色（または暗いテキスト色）を使用する表示モードのことである。

主に夜間での利用時に、明るい背景色の Web サイトを見ていると目に負担をかける場合があるため、暗い背景色を使用することで、ユーザーが長時間 Web サイトを閲覧しても快適に感じることができ、より良いユーザー体験を提供することができる。

# ダークモードの設定方法

Web ページへのダークモードの設定は、使用している CSS にメディアクエリ`prefers-color-scheme`を適用する。

```css
@media (prefers-color-scheme: dark) {
  // ダークモードで適用したいスタイル
  body {
    background-color: #000;
    color: #fff;
  }
}
```

これによりダークモード設定時にはこのスタイルが適用される。

# `prefers-color-scheme`とは？

ここで使用した`prefers-color-scheme`とは、メディアクエリの一種である。

メディアクエリとは CSS の仕様の 1 つで、機器の特性に応じて CSS を切り替える方式である。

`prefers-color-scheme`は、OS のテーマ設定といったようなユーザーの環境設定からカラーテーマを検出し、それに応じて指定したスタイルを適用するときに利用する。

利用例としては以下の通り。

```css
@media (prefers-color-scheme: dark) {
  /* ダークモード用のスタイル */
  body {
    background-color: #1a1a1a;
    color: #ffffff;
  }
}

@media (prefers-color-scheme: light) {
  /* ライトモード用のスタイル */
  body {
    background-color: #ffffff;
    color: #000000;
  }
}
```

ダークモードの時は`prefers-color-scheme: dark`で指定された内容が適用され、反対のライトモードの時は`prefers-color-scheme: light`の内容が適用される。

# OS でのダークモードの設定(Mac)

`prefers-color-scheme`は基本、OS での設定内容からダークモードにするかの設定を読み取る。

では、その OS でのダークモードの設定はどこにあるのだろうか。最近の OS では大体自動的に日中ではライトモード、夜間ではダークモードとなるが、このような設定はどこにされているのだろうか。

ここでは MacOS（バージョン：10.15.5）での例を載せる。

Mac OS からシステム環境設定＞ディスプレイ＞ Night Shift

![](/assets/posts/darkmode/nightShift.png)

スケジュールをカスタムに変更し、時間を設定することで、指定した時間にダークモードにすることができる。

また、「日の出から日の入りまで」を選択する事で、Mac が日の出と日の入りの時間を取得しそれに応じて切り替えてくれる。

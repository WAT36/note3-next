---
title: "Cursorを使ってみる"
excerpt: "AI統合エディタ「Cursor」を実際に使用した体験記"
coverImage: ""
date: "2025-06-19T23:34:27.000Z"
updatedAt: "2025-06-19T23:34:27.000Z"
tag: []
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
---

今更ながら、話題の AI 統合エディタ「Cursor」を使ってみたので、その体験をまとめてみた。

開発者なら一度は気になったことがあるのではないでしょうか。

# Cursor とは？

Cursor は AI 機能を搭載したコードエディタです。Visual Studio Code をベースに開発されており、ChatGPT など多くの大規模言語モデル（LLM）と連携して、AI とペアプログラミングができるようなツールです。

## ダウンロードと初期設定

### ダウンロード方法

**[公式サイト](**[cursor.sh](https://cursor.sh/)**)**[^1]からダウンロードできます。

OS は Windows、macOS、Linux に対応していますが、自動で OS を検出してダウンロードボタンが表示されます。

![](/assets/posts/startCursor/download.png)

### インストール

ダウンロードしたファイルを実行し、通常のアプリケーションと同様にインストールします。(以下の図は Mac での場合です)

![](/assets/posts/startCursor/installMac.png)

### 初回設定

初回起動時に、VS Code を利用していた場合は利用していたプラグインなどをインポートできます。

(写真は撮り忘れました。。)

## 価格

基本無料で使えますが、無料版の他にいくつか有料プラン[^2]もあります。

エージェントの利用回数などで制限の差があるようです。

![](/assets/posts/startCursor/pricing.png)

# 基本的な使用方法

## AI チャット機能

**Ctrl+L**（macOS では**Cmd+L**）で AI チャットパネルを開けます。ここでコードについて質問したり、実装方針を相談できます。

例えば「この React コンポーネントにローディング状態を追加したい」と入力して実行したら、AI が具体的なコード例を提示してくれます。

![](/assets/posts/startCursor/cursorChat.png)

### インライン編集

**Ctrl+K**でインライン編集モードに入ります。コードの一部を選択して自然言語で修正指示を出せます。

---

[^1]: [Cursor(公式サイト)](https://cursor.sh/)
[^2]: [Cursor(公式サイト) - 料金プラン](https://www.cursor.com/ja/pricing)

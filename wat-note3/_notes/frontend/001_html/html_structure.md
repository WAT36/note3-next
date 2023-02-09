---
title: 'HTMLの全体構造'
excerpt: 'HTMLファイルの大まかな構成について'
tag: ["HTML"]
date: "2019-11-04T18:34:30.000Z"
updatedAt: '2023-02-08T23:20:10.000Z'
author:
  name: Tatsuroh Wakasugi
  picture: '/assets/blog/authors/WAT.jpg'
---

HTMLファイルの構造についてを述べる。

HTMLファイルは、主に以下から構成される。

- DOCTYPE宣言（文書型宣言）
- html要素
 - head要素
 - body要素

これらを使った、HTMLファイルの大まかな構成は以下の通り。

```html
<!DOCTYPE html>
<html>
    <head>
        <!-- 文書に関する情報 -->
    </head>
    <body>
        <!-- 表示させるコンテンツの情報 -->
    </body>
</html>
```

一つずつ以下で説明する。

<hr>

# DOCTYPE宣言

HTML5では実は必要なものではないそうだが、ブラウザの表示モードを「標準モード」にする目的で指定することになっている。

指定がない場合、通常は以下の通りに記入する。

```html
<!DOCTYPE HTML>
```

なお、DOCTYPE宣言は大文字で書いても小文字で書いても問題ない。


# html要素

html要素は、HTML文書のルートとなる要素である。

他の全ての要素は、この要素内に記述しなければならない。

また、グローバル属性であるlang属性を指定して、その文書で使用されている言語の種類を示すことが推奨されている。

```html
<!DOCTYPE html>
<html lang="ja>
    ・・・
</html>
```

<hr>

## head要素

head要素は、HTML文書のメタデータを入れるための要素である。

大体は文書のタイトル(title要素)、また文書の文字コード(meta要素)をここで指定する。

### title要素

title要素は、HTML文書のタイトル(名前)を示す要素である。この要素は、必ずhead要素の中で指定する。

```html
・・・
<head>
    <title>XXXのページ</title>
</head>
・・・
```

<hr>

### meta要素

meta要素は、HTML文書の様々なメタデータを指定できる空要素である。

属性が色々あり、以下の通りである。

|属性|指定する値|
|:---|:---|
|charset|文書の文字コード|
|name|メタデータの名前|
|http-equiv|プラグマディレクティブ(再読み込みや他文書への遷移など、文書の状態や挙動を指示する命令のこと)|
|content|メタ情報の値|

使用例

```html
・・・
<head>
    <meta charset="UTF-8">
    <meta name="author" content="T.Wakasugi">
    <meta name="keywords" content="HTML programming meta">
</head>
・・・
```

<hr>

### link要素

link要素は、このHTML文書に関連する外部ファイルやリソースを示すための要素である。

ここでいう関連するファイルやリソースというのは、HTML,CSS,RSSファイルなどのことを言う。

link要素にはhref属性とrel属性は必ず指定する必要がある。

|属性|指定する値|
|:---|:---|
|href|外部ファイルやリソースのアドレス|
|rel|当文書から見た外部ファイルやリソースの関係性を示すキーワード|
|rev|外部ファイルから見た当文書の関係性を示すキーワード|
|hrefflag|外部ファイルの言語(日本語や英語など)|

rel・rev属性に指定できる値としては以下の通り（一部）。

|指定する値|意味|
|:---|:---|
|author|執筆者|
|help|ヘルプ|
|icon|アイコン|
|license|著作権ライセンス|
|prev|前の文書|
|next|次の文書|
|stylesheet|適用するスタイルシート|

<hr>

### base要素

base要素は、そのHTML文書で使われている相対URL(パス)の基準となるURLを書く要素である。

基準となるURLはhref属性に指定する。

例

```html
・・・
<head>
    <base href="https://wat36.github.io/pages/">
</head>
<body>
    <p><a href="docs/front-end/front_index/">フロントエンドのトップ</a></p>
</body>
・・・
```

## body要素

body要素は、HTML文書のコンテンツを入れるための要素である。通常は、head要素の次に記載する。

例

```html
<body>
　・・・
</body>
```

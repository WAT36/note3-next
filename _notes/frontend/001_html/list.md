---
title: "リスト"
date: "2019-11-04T22:34:30.000Z"
excerpt: "HTMLでのリストについて"
tag: ["HTML"]
updatedAt: "2023-02-17T23:18:26.000Z"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
---

HTML 文書にリストを記載するための要素についてをここでは述べる。

## ul 要素

ul 要素は、箇条書きリストを作成するための要素である。一つの箇条書きリストを ul 要素で表し、リスト内の項目一つを **li 要素** で表す。

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="QwWMJEg" data-pen-title="html-ul" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/QwWMJEg">
  html-ul</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

## ol 要素

ol 要素は、連番付きリストを作成するための要素である。リストのひとかたまりを ol 要素で表し、リスト内の項目一つを **li 要素** で表す。

指定できる属性は以下の通り。

| 属性名   | 意味                                      |
| :------- | :---------------------------------------- |
| type     | 行頭の数字の種類(値は"1","a","A","i","I") |
| start    | 連番の開始番号                            |
| reversed | リストの番号を逆順にする                  |

```
<p>サーバー再起動手順</p>
<ol>
    <li>rootユーザにログインする</li>
    <li>サーバーを停止する</li>
    <li>サーバーを起動する</li>
</ol>
```

表示例

<p>サーバー再起動手順</p>
<ol>
    <li>rootユーザにログインする</li>
    <li>サーバーを停止する</li>
    <li>サーバーを起動する</li>
</ol>
<hr>

## li 要素

前述の ul,ol 要素のところで出てきてはいるが、li 要素は ul,ol 要素によるリストの各項目を示す時に用いる要素である。

使用例・表示例は ul,ol 要素を参照。

## dl 要素・dt 要素・dd 要素

ul 要素は箇条書き、ol 要素は連番と決まっていたが、**dl 要素**(description list)はリストの項目の種類を自分で指定できる要素である。記号である必要はなく、具体的な名前を入れても良い。

dl 要素で書いたリストは、**dt 要素**で項目名を指定し、その後**dd 要素**でその具体的な内容を指定する。

```
<p>試験時間</p>
<dl>
    <dt>国語</dt>
    <dd>9:00~10:30</dd>
    <dt>数学</dt>
    <dd>10:45~12:15</dd>
    <dt>英語</dt>
    <dd>13:30~15:00</dd>
</dl>
```

表示例

<p>試験時間</p>
<dl>
    <dt>国語</dt>
    <dd>9:00~10:30</dd>
    <dt>数学</dt>
    <dd>10:45~12:15</dd>
    <dt>英語</dt>
    <dd>13:30~15:00</dd>
</dl>
<hr>

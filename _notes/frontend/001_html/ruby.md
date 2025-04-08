---
title: "ルビ"
date: "2019-11-04T23:34:30.000Z"
excerpt: "HTMLでのルビについて"
tag: ["HTML"]
updatedAt: '2025-03-25T23:16:20.000Z'
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
---

HTML 文書にルビ(ふりがな)を記載するための要素についてをここでは述べる。

# ruby 要素

ruby 要素は文字にルビを振る要素であり、実際にルビを振る文字及びルビとなる部分を囲む事で表現する。

具体的なルビ及びルビを振る対象の文字の指定は、次の rt,rb,rp,rtc 要素を使う。以下にそれぞれの要素についてを示す。

## rt 要素

rt 要素はルビ(ふりがな)自体を表す要素である。rt は ruby text の略である。

## rb 要素

rb 要素はルビを振る対象の部分を表す要素である。rb は ruby base text の略である。

## rp 要素

rp 要素はルビが未対応のブラウザの時に、ルビを振らずに()などでルビを振る文字の後に表示させる要素である。

使用する際は、()をそれぞれ rp 要素で囲んで使用する。

## rtc 要素

rtc 要素は複数の rt 要素をグループ化してまとめる要素である。

## 使用例

これら要素の使用例を以下に示す。

使用例

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="vEYemmz" data-pen-title="html-ruby" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/vEYemmz">
  html-ruby</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

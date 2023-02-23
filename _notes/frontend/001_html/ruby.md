---
title: "ルビ"
date: "2019-11-04T23:34:30.000Z"
excerpt: 'HTMLでのルビについて'
tag: ["HTML"]
updatedAt: '2023-02-18T12:07:04.000Z'
author:
  name: Tatsuroh Wakasugi
  picture: '/assets/blog/authors/WAT.jpg'
---

HTML文書にルビ(ふりがな)を記載するための要素についてをここでは述べる。


# ruby要素

ruby要素は文字にルビを振る要素であり、実際にルビを振る文字及びルビとなる部分を囲む事で表現する。

具体的なルビ及びルビを振る対象の文字の指定は、次のrt,rb,rp,rtc要素を使う。以下にそれぞれの要素についてを示す。


## rt要素

rt要素はルビ(ふりがな)自体を表す要素である。rtはruby textの略である。

## rb要素

rb要素はルビを振る対象の部分を表す要素である。rbはruby base textの略である。

## rp要素

rp要素はルビが未対応のブラウザの時に、ルビを振らずに()などでルビを振る文字の後に表示させる要素である。

使用する際は、()をそれぞれrp要素で囲んで使用する。

## rtc要素

rtc要素は複数のrt要素をグループ化してまとめる要素である。


## 使用例

これら要素の使用例を以下に示す。

```
<ruby>
  <rb>薔</rb> <rp>(</rp><rt>ば</rt><rp>)</rp>
  <rb>薇</rb> <rp>(</rp><rt>ら</rt><rp>)</rp>
  <rtc><rp>(</rp><rt>ba</rt><rt>ra</rt><rp>)</rp></rtc>
</ruby>
```

表示例

<ruby>
  <rb>薔</rb> <rp>(</rp><rt>ば</rt><rp>)</rp>
  <rb>薇</rb> <rp>(</rp><rt>ら</rt><rp>)</rp>
  <rtc><rp>(</rp><rt>ba</rt><rt>ra</rt><rp>)</rp></rtc>
</ruby>
<hr>



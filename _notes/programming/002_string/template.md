---
title: "テンプレート文字列"
excerpt: "文字列の中に変数の値、改行を入れたい時"
tag: ["Java", "Python", "Javascript"]
programming: ["Java", "Python", "Javascript"]
date: "2024-06-08T18:47:45.000Z"
updatedAt: "2024-06-08T18:47:45.000Z"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

変数や式を埋め込んだ文字列のことを **テンプレート文字列** という。

これにより、変数の値や式の結果に応じた文字列を作成でき、また改行を用いることで複数行にわたる文字列を作成することもできる。

ここでは、各言語におけるテンプレート文字列の宣言方法についてを述べる。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
// 作成中...
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
# 作成中...
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
`変数の値：${変数}`;
```

Javascript では、バッククォート「`」1 文字で囲った部分がテンプレート文字列になる。

変数等の値を入れたいときは、「${変数名}」の形式で埋め込ませる。

例

```javascript
let name = "佐藤";
console.log(`こんにちは。${name}さん。
今日もいい天気ですね！`);
```

</div>

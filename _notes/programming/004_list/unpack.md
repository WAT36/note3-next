---
title: "分割代入(アンパック)"
excerpt: "配列(リスト)の分割代入(アンパック)について"
coverImage: ""
date: "2024-06-12T01:01:16.000Z"
updatedAt: "2024-06-12T01:01:16.000Z"
tag: ["Python", "Javascript"]
programming: ["Python", "Javascript"]
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
mode: programming
---

文字列の末尾に別の文字列を繋げて新しい文字列としてデータを作る方法についてをまとめる。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
// 作成中・・
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
# 作成中・・
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
let a,b,c
[a,b,c] = [10,20,30]
// a=10,b=20,c=30

[a,b,...c] = [10,20,30,40,50]
// a=10,b=20,c=[30,40,50]
```

Javascript では配列やオブジェクトを分解し、要素の値を個々の変数に代入する手法がある。これを **分割代入** という。

記法は上記の例の通り。

また、...演算子を利用することで、個々の変数に代入しきれなかった残りの要素をまとめて配列として代入することも可能である。

また配列ではないが、オブジェクトに対しても可能である。

以下に例をいくつか示す。

```javascript
let book = {
  title: "本のタイトル",
  author: "山田一郎",
  publisher: "A社",
  yen: 2300,
};
let { title, author, ...rest } = book;
// title="本のタイトル",author="山田一郎",rest={publisher:'A社',yen:2300}
```

オブジェクトの場合は、プロパティの名前と同じ名前の変数に変数が分解されて代入される。

...演算子を用いると、代入されなかったプロパティ全てが入る。

```javascript
let book = {
  title: "本のタイトル",
  author: "山田一郎",
  publisher: "A社",
  yen: 2300,
  other: {
    keyword: "キーワード",
    excerpt: "概略",
  },
};
let {
  title: name,
  author,
  other,
  other: { keyword },
} = book;
// name="本のタイトル",author="山田一郎",  other: {keyword: 'キーワード',excerpt: '概略'}
```

オブジェクト内に入れ子になったオブジェクト内のプロパティを入れたい場合は、代入先の変数も{..}で入れ子構造で表す。

また、変数名：別名の形式で、プロパティと異なる名前の変数に値を割り当てることもできる。

</div>

---
title: "ジェネレータ関数"
date: "2019-10-29T07:37:30+09:00"
excerpt: "ジェネレータ関数について"
tag: ["Javascript"]
programming: ["Javascript"]
updatedAt: "2019-10-29T07:37:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

**ジェネレータ関数**とは、呼び出されるたびにこ t なる値を返す関数の事である。例としては乱数がある。

ジェネレータ関数が普通の関数と違うのは、前回の呼び出しで処理が戻された位置が保存されており、次の呼び出しでは前回の呼び出しで処理が戻された位置から処理を開始するところである。

各言語のジェネレータ関数についてを以下に述べる。

<div class="note_content_by_programming_language" id="note_content_Javascript">

Javascript で、ジェネレータ関数内で return 文のように処理を戻すものが**yield 文**である。

yield 文を指定するとジェネレータ関数内で処理が止まり、次の呼び出しではその止まった位置から処理が始まる。

ジェネレータ関数で処理を開始するメソッドは **next()** である。

例

```javascript
function* generator() {
  //処理１
  console.log("1");
  yield;
  //処理２
  console.log("2");
  yield;
  //処理３
  console.log("3");
  yield;
}

var g = generator();

console.log("generator 1回目スタート");
g.next();
console.log("generator 2回目スタート");
g.next();
console.log("generator 3回目スタート");
g.next();
```

結果

```
generator 1回目スタート
1
generator 2回目スタート
2
generator 3回目スタート
3
```

</div>

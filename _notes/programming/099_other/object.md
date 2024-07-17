---
title: "Objectオブジェクト"
excerpt: "全ての型・オブジェクトの大元"
coverImage: ""
date: "2024-07-16T23:59:06.000Z"
updatedAt: "2024-07-16T23:59:06.000Z"
tag: ["Javascript"]
programming: ["Javascript"]
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
mode: programming
---

<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
var obj = new Object();
```

Object オブジェクトは javascript におけるすべてのオブジェクトの大元となるオブジェクトであり、オブジェクトの共通的な性質・機能を提供するオブジェクトでもある。

Object オブジェクトには toString,valueOf などといったメソッドが用意されている。諸オブジェクトはこれらのメソッドを継承しており、それぞれのオブジェクトで利用できる。例えば String や Date オブジェクトにも toString メソッドはあると思うが、これの大元は Object 型にある toString メソッドを受け継いだものである。

Object オブジェクトにある主なメソッド類は以下の通り。

| メソッド                      | 意味                                                            |
| :---------------------------- | :-------------------------------------------------------------- |
| Object.toString()             | オブジェクトの文字列表現を取得                                  |
| Object.valueOf()              | オブジェクトの基本型(大体は数値型)表現を取得                    |
| Object.assign(target,src,...) | オブジェクト target にオブジェクト src のプロパティをコピーする |
| Object.create(proto [,props]) | オブジェクト proto を元に、新しいオブジェクトを生成する         |

</div>

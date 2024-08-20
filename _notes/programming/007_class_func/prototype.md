---
title: "prototypeプロパティ"
excerpt: "prototypeプロパティ(javascript)について"
coverImage: ""
date: "2024-08-20T22:10:14.000Z"
updatedAt: "2024-08-20T22:10:14.000Z"
tag: ["Javascript"]
programming: ["Javascript"]
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
mode: programming
---

javascript の prototype プロパティについてを示す。

<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript

```

javascript では、オブジェクトに**prototype**というプロパティがある。

javascript で、コンストラクタからインスタンスを生成するとき、コンストラクタでメソッドを定義していると、作成されるインスタンスにメソッドの実体も作成される。

メソッドの数が少なければいいのだが、メソッドの数が多い場合、作成されるインスタンスに全メソッドが作られ、メモリが逼迫する恐れがある。

ここで、prototype プロパティにプロパティやメソッドを定義すると、作成されたインスタンスにはメソッド類の実体は作られず、元となるオブジェクトの prototype プロパティに定義したメソッド類を参照して利用するようになる。

これにより、実行時のメモリ利用量を抑えられる。

</div>

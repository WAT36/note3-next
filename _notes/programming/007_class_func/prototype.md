---
title: "プロトタイプ(javascript)"
excerpt: "プロトタイプとprototypeプロパティ(javascript)について"
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

javascript の 概念の１つであるプロトタイプと、prototype プロパティについてを示す。

<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
var Person = function (name) {
  this.name = name;
};

Person.prototype.getName = function () {
  return this.name;
};
// 以下も可能
Person.prototype = {
  getName: function () {
    return this.name;
  },
};

// インスタンス作成
var p1 = new Person();
```

javascript では「プロトタイプ（ひな形）」という概念がある。

**プロトタイプ**とは、「あるオブジェクトの元となるオブジェクト」のこと。javascript ではこのプロトタイプを利用することでも、オブジェクトを生成できる。

まず、javascript では上記のような形で、クラスのような雛形の定義とインスタンスの作成を行う。

javascript では、関数(Function オブジェクト)にクラスとしての役割を与えている。

この関数に引数を設定し、関数内で引数を利用した処理を定義することで、コンストラクターとしての意味も設定できる。

また、javascript では、オブジェクトに**prototype**というプロパティがある。

javascript で、コンストラクタからインスタンスを生成するとき、コンストラクタでメソッドを定義していると、作成されるインスタンスにメソッドの実体も作成される。

メソッドの数が少なければいいのだが、メソッドの数が多い場合、作成されるインスタンスに全メソッドが作られ、メモリが逼迫する恐れがある。

ここで、prototype プロパティにメソッドを定義すると、作成されたインスタンスにはメソッド類の実体は作られず、元となるオブジェクトの prototype プロパティに定義したメソッド類を参照して利用するようになる。

これにより、実行時のメモリ利用量を抑えられる。

実行例を以下に示す。（上記の例を使用する）

```javascript
var Person = function (name) {
  this.name = name;
};

Person.prototype.getName = function () {
  return this.name;
};

var john = new Person("john");
console.log(john.getName());
// 'john'
```

</div>

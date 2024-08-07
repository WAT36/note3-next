---
title: "クラス(プロトタイプ)"
date: "2019-10-29T00:37:30+09:00"
excerpt: "クラス(javascriptはプロトタイプ)の定義について"
tag: ["Java", "Python", "Javascript"]
programming: ["Java", "Python", "Javascript"]
updatedAt: "2019-10-29T00:37:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

クラスを定義する方法についてを示す。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
[public] class クラス名 [extends 継承元クラス名] [implements 実装先インタフェース名]{
    //文
}
```

Java でのクラス定義方法は上記の通り。

アクセス修飾子を指定したいときは public などを、あるクラスを継承して作りたい時はクラス名の後に extends を、インタフェースを実装する時はその後に implements を書き加える。

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
class クラス名:
    #文
```

Python でのクラスを定義するときの記法は上記の通り。

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript

```

javascript では「クラス」というのはなく、「プロトタイプ（ひな形）」という概念がある。

**プロトタイプ**とは、「あるオブジェクトの元となるオブジェクト」のこと。javascript では、クラスの代わりにこのプロトタイプを利用して、オブジェクトを生成していく。

まず、javascript では以下のような形で、クラスのような雛形の定義とインスタンスの作成を行う。

javascript では、関数(Function オブジェクト)にクラスとしての役割を与えている。

この関数に引数を設定し、関数内で引数を利用した処理を定義することで、コンストラクターとしての意味も設定できる。

**this**キーワードを利用することで、インスタンスのプロパティを設定することもできる。

```javascript
var Member = function (name) {
  this.name = name;
};

var m1 = new Member("Takao");

console.log(m1.name); // 'Takao'
```

</div>

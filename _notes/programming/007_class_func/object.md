---
title: "オブジェクト(Javascript)"
date: "2019-10-29T09:37:30+09:00"
excerpt: "オブジェクト(Javascript)について"
tag: ["Javascript"]
programming: ["Javascript"]
updatedAt: "2019-10-29T09:37:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

Javascript のオブジェクトについて。

Javascript では、オブジェクトと呼ばれる、C 言語などの構造体のようなデータ構造が存在する。

ここではそれについて記載する。

<div class="note_content_by_programming_language" id="note_content_Javascript">

## オブジェクトの定義

Javascript でのオブジェクトは、以下のような方法で記載する。

記法

```javascript
var 変数名 = {
    key名1 : value名1,
    key名2 : value名2,
    ・・・
}
```

このように、キーと値のセットを複数連ねたような構造になる。

ちなみに、オブジェクトではこのキーと値のセットのことを**プロパティ**と呼んでいる。

<hr>

## プロパティの書き換え

オブジェクト中のプロパティの値を書き換える方法についてを述べる。

Javascript でのオブジェクトのプロパティの書き換えは、以下のような記法で行う。

```javascript
オブジェクトの変数名.変更したいプロパティのキー = 書き換えたい値;
//または
オブジェクトの変数名["変更したいプロパティのキー"] = 書き換えたい値;
```

<hr>

## プロパティの追加

オブジェクトにプロパティを追加する方法についてを述べる。

Javascript でのオブジェクトのプロパティの追加は、以下のような記法で行う。

```javascript
オブジェクトの変数名.追加したいプロパティのキー = 追加したい値;
```

要はプロパティの書き換えと同じ。

<hr>

## プロパティの削除

オブジェクト中のプロパティを削除するには、特殊演算子の**delete**を利用する。

```javascript
delete オブジェクトの変数名.削除したいプロパティ名;
```

<hr>

## this キーワード

**this**キーワードは、オブジェクト内でオブジェクトのプロパティを参照するときに用いる。

但し、オブジェクトを参照するのは、this がメソッドとして使用された場合に限るので注意。

```javascript
var 変数名 = {
    key名1 : value名1,
    key名2 : value名2,
    ・・・
    key名n : function(){
        //メソッド
        this.key名1  //これでvalue名1が参照できる
    }
}
```

<hr>

## セッターの設定(set 演算子)

**set**演算子は、擬似プロパティを設定する演算子で、プロパティが呼び出された時に呼び出す関数を設定する演算子である。

これを利用して、オブジェクトのプロパティに値を設定しようとした時に、設定した関数を呼び出してプロパティに値を設定する事が行える。

```javascript
//例
var obj = {
  set setAge(age) {
    this.age = age;
    this.category = age >= 20 ? "大人" : "小人";
  },
};

obj.setAge = 18;
console.log(obj);
```

結果

```
{age: 18, category: "小人"}
```

<hr>

## ゲッターの設定(get 演算子)

**get**演算子は、擬似プロパティを取得する演算子で、set と同様にプロパティが呼び出された時に呼び出す関数を設定する演算子である。

関数には、オブジェクトのプロパティを返すように設定する。このようにする事で、プロパティを取得することが可能になる。

```javascript
//例
var obj = {
  set setAge(age) {
    this.age = age;
    this.category = age >= 20 ? "大人" : "小人";
  },

  get getAge() {
    return this.age;
  },
};

obj.setAge = 18;
console.log(obj.getAge);
```

結果

```
18
```

<hr>

## プロパティの存在確認(in 演算子)

指定したプロパティがオブジェクト内に存在するかを確認したいときは、**in**演算子を利用する。

```javascript
//例
var obj = {
  set setAge(age) {
    this.age = age;
    this.category = age >= 20 ? "大人" : "小人";
  },

  get getAge() {
    return this.age;
  },
};

console.log("setAge" in obj);
console.log("a" in obj);
```

結果

```
true
false
```

# Object オブジェクト

Javascript の Object オブジェクトは、全てのオブジェクトの基本オブジェクトである。

プロパティ・メソッド類は以下の通り。

| プロパティ名 | 説明                 |
| :----------- | :------------------- |
| constructor  | コンストラクタを返す |

| メソッド名             | 説明                                                           |
| :--------------------- | :------------------------------------------------------------- |
| toString()             | オブジェクトを文字列で返す                                     |
| valueOf()              | オブジェクトのプリミティブ値を返す                             |
| hasOwnProperty()       | 指定したプロパティがオブジェクトのプロパティならば true を返す |
| propertyIsEnumerable() | 指定したプロパティが列挙可能な場合 true を返す                 |
| isPrototypeOf()        | 指定したオブジェクトがプロトタイプの場合は true を返す         |

以下に例を記載する。

```javascript
var mike = {
  age: 18,
  category: "小人",
};

console.log("--constructor:--");
console.log(mike.constructor);
console.log("--toString():--");
console.log(mike.toString());
console.log("--valueOf():--");
console.log(mike.valueOf());
console.log("--hasOwnProperty(age):--");
console.log(mike.hasOwnProperty("age"));
console.log("--propertyIsEnumerable(age):--");
console.log(mike.propertyIsEnumerable("age"));
console.log("--isPrototypeOf():--");
console.log(mike.isPrototypeOf());
```

実行結果

```
--constructor:--
function Object() {
    [native code]
}
--toString():--
[object Object]
--valueOf():--
{age: 18, category: "小人"}
--hasOwnProperty(age):--
true
--propertyIsEnumerable(age):--
true
--isPrototypeOf():--
false
```

# prototype

prototype プロパティは、特定のオブジェクトに存在するプロパティとメソッドを、他のオブジェクトでも利用できるように定義する方式である。

必要に応じて他のオブジェクトのメソッドやプロパティを追加することで、それらを新たに追加する必要がなくなる。

オブジェクト指向の言語の特徴の一つに継承というものがある。Java などではクラスで継承を行うが、Javascript ではこのオブジェクトで継承を行う。このような継承をプロトタイプベースの継承という。

例を以下に記載する。

```javascript
function Person(name) {
  this.name = name;
}

// オブジェクト作成
var mike = new Person("mike");

// コンストラクタのprototypeプロパティにプロパティsexを追加
Person.prototype.sex = "male";

// オブジェクトにsexプロパティが追加されている
console.log(mike.sex);
```

実行結果

```
male
```

</div>

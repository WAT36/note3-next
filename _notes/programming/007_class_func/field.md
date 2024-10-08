---
title: "フィールド(クラス変数・インスタンス変数)"
date: "2019-10-29T01:37:30+09:00"
excerpt: "クラス変数・インスタンス変数について"
tag: ["Java", "Python", "Javascript"]
programming: ["Java", "Python", "Javascript"]
updatedAt: "2019-10-29T01:37:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

フィールド変数とはクラス内に定義する変数のこと。  
その中でも主に、クラス内で定義して全てのインスタンス間で値を共有する変数をクラス変数、  
インスタンス毎に独立して値を保持する変数をインスタンス変数という。  
言語により呼び名が違う？ので注意

<div class="note_content_by_programming_language" id="note_content_Java">

```java
class クラス名{

    //フィールド変数
    [static] (フィールド変数１の定義)
    [static] (フィールド変数２の定義)
    ・・・

    //文
}
```

Java でのフィールド変数定義方法は以下の通り。

クラス変数にしたい時は変数の前に**static**をつける。  
static をつけない場合はインスタンス変数となる。  
フィールド変数を参照したい時は、クラス変数は**クラス(インスタンス)名.変数名**で参照できる。  
インスタンス変数はインスタンス毎で独立のため、**インスタンス名.変数名** で参照すること。クラス名を使っても参照はできない(コンパイルエラーとなる)

実行例は以下の通り。

```java
class Car {

    //フィールド変数
    static String name = "lexus";
    String number = "";
    String owner = "";
}

class Main{
  public static void main(String args[]){

    Car c1 = new Car();
    c1.number="100-1010";
    c1.owner="ai-ueo";
    System.out.println("c1:" + c1.name + " " + c1.number + " " + c1.owner);

    Car c2 = new Car();
    c2.number="200-2020";
    c2.owner="kaki-kukeko";
    System.out.println("c2:" + c2.name + " " + c2.number + " " + c2.owner);

    System.out.println("carname :"+Car.name);   //Car.name   ->クラス変数なのでクラス名.変数名で参照できる
    System.out.println("carnum  :"+Car.number); //Car.number ->インスタンス変数なのでクラス名からは参照できない(エラー)
  }
}
```

実行結果（コンパイルエラー発生）

```
$ javac Main.java
Main.java:22: エラー: staticでない変数 numberをstaticコンテキストから参照することはできません
    System.out.println("carnum  :"+Car.number);
                                      ^
エラー1個
```

そのためエラー箇所をコメントアウトして再度実行する

```java
//  System.out.println("carnum  :"+Car.number);
```

実行結果

```
$ javac Main.java
$ java Main
c1:lexus 100-1010 ai-ueo
c2:lexus 200-2020 kaki-kukeko
carname :lexus
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
class クラス名:
  クラス変数 = 値
```

Python にもクラス変数とインスタンス変数がある。  
クラス変数はクラス内、各関数外に定義し、クラス、インスタンスオブジェクトから参照することができる。  
インスタンス変数は、後述するがクラスの**init**関数で定義する。ここで定義した変数はインスタンスからしか参照できない。

使用例を以下に示す。

```python
>>>
>>> class Car:
...     name = "lexus"
...     def __init__(self,n,o):
...             self.number=n
...             self.owner=o
...
>>>
>>> c1=Car("100-1010","ai-ueo")
>>> c2=Car("200-2020","kaki-kukeko")
>>>
>>> print(Car.name)
lexus
>>> print(Car.number)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
AttributeError: type object 'Car' has no attribute 'number'
>>>
>>> print(c1.name)
lexus
>>> print(c1.number)
100-1010
>>> print(c1.owner)
ai-ueo
>>>
>>> print(c2.name)
lexus
>>> print(c2.number)
200-2020
>>> print(c2.owner)
kaki-kukeko
>>>
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
// クラス
class クラス名 {
  constructor([引数]) {
    this.property1 = 値1;
    this.property2 = 値2;
    //...
  }

  // 静的プロパティ
  static property3 = 値3;
}

// オブジェクト
var クラス名2 = function () {
  // 定義など。ここに定義したメンバーはインスタンスプロパティ/メソッド (インスタンス変数)
  this.name = "instance name";
};

// 静的プロパティ/メソッド (直接クラス名を指定して利用する)
クラス名2.name = "static name";
```

javascript では、コンストラクタ内で**this**キーワードを利用することで、インスタンスのプロパティを設定できる。

またプロパティに関数オブジェクトを設定することもでき、関数オブジェクトが設定されたプロパティはメソッドとみなされる。

また、**静的プロパティ/メソッド** を定義することもできる。

これは、クラスの場合`static プロパティ/メソッド名 = 値` で、プロトタイプのオブジェクトベースの場合は`オブジェクト名.プロパティ名 = 値`のような形式で定義することができる。

静的プロパティ/メソッドは、インスタンスを生成しなくてもオブジェクトから直接呼び出せるプロパティ/メソッドのことであるが、**インスタンスからは呼び出せない**点が前述のクラス変数の考え方とは違うので注意すること。

実行例を以下に示す。

```javascript
// クラス
class Person {
  constructor(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }

  static country = "Japan";
}

var john = new Person("john");

console.log(john.getName()); // 'Takao'
console.log(john.country); // undefined(インスタンスから読んでいるため)
console.log(Person.country); // 'Japan'

// プロトタイプベースのオブジェクト
var Member = function (name) {
  this.name = name;

  this.getName = function () {
    return this.name;
  };
};
Member.country = "Japan";

var m1 = new Member("Takao");

console.log(m1.name); // 'Takao'
console.log(m1.getName()); // 'Takao'

m1.sayHello = function () {
  return "Hello! World!";
};

console.log(m1.sayHello()); // 'Hello! World!'

console.log(Member.country); // 'Japan'

var m2 = new Member("Kotone");
console.log(m2.sayHello()); // エラー。定義されていないので
```

## プライベートメンバー

インスタンスプロパティ/メソッドは基本 this キーワードで定義し、これはオブジェクト内外から自由にアクセスできるものになっている。このようなプロパティ/メソッドを**パブリックメンバー**という。

これに対して、オブジェクト内部のメソッドからのみ呼び出すことができるプロパティ/メソッドのことを**プライベートメンバー**と呼ぶ。

プライベートメンバーを定義するにはどうすれば良いか。

それはオブジェクトのコンストラクタ内で this キーワードではなく、var キーワードを利用して定義するのである。

そのようにすると、基本オブジェクト外からはアクセスできない。以下に例を示す。

```javascript
var Member = function () {
  var _name;

  this.getName = function () {
    return _name;
  };
  this.setName = function (name) {
    _name = name;
  };
};

var m1 = new Member();
m1._name = "Takao";
console.log(m1.getName()); // undefined

m1.setName("Takao");
console.log(m1.getName()); // 'Takao'
```

この例では、まず最初にインスタンス m1 のプロパティ\_name に直接値を代入しているが、うまく設定できてないことがわかる。

次の行で、setName メソッドを使って定義することで、プロパティ\_name に値を設定できていることもわかるだろう。

このように設定することで、プライベートメンバーを定義できる。

また、プライベートメンバーにアクセスできるメソッドのことを**特権メソッド**とも呼び、この例では getName,setName が該当する。

## (補足) アクセサーメソッド

またこの例のような、プロパティはプライベートメンバー化し、プライベートメンバーにアクセスするためのメソッドを用意することは多々ある。このようなメソッドを**アクセサーメソッド**という。

プライベートメンバーを参照するメソッド(この例だと getName)を**ゲッターメソッド**、プライベートメンバーを設定するメソッド(この例だと setName)を**セッターメソッド**と呼ぶ。

</div>

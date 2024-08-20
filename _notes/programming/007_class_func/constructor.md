---
title: "コンストラクタ"
date: "2019-10-29T02:37:30+09:00"
excerpt: "コンストラクタについて"
tag: ["Java", "Python", "Javascript"]
programming: ["Java", "Python", "Javascript"]
updatedAt: "2019-10-29T02:37:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

クラスのコンストラクタについてを書く。  
コンストラクタとはクラスのインスタンスを作成した時に、そのインスタンスで最初に実行される関数である。主に初期化のために使われる。  
これも言語により呼び名が違うので注意。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
class クラス名{
  // コンストラクタ
  クラス名(引数) {
    // 処理文
  }
}
```

Java では、クラス内でそのクラス名と同じ名前のメソッドを定義した時、それがコンストラクタになる。  
引数を変えれば、多重定義（オーバーロード）でいくらでも定義できる。  
ただし、コンストラクタを定義したら、インスタンス生成時に設定する引数はそのコンストラクタと同じでなければならない。  
因みにコンストラクタは定義しなくても良い。その場合インスタンス生成時に設定する引数は無しでないといけない。

使用例を以下に示す。

```java
class Car{

  String name = null;
  String number = null;
  String owner = null;

  public Car(String carname,String carnumber,String carowner) {
    this.name = carname;
    this.number = carnumber;
    this.owner = carowner;
  }
}

class Main{
  public static void main(String args[]){

    Car car1 = new Car("lexus","100-1010","ai-ueo");
    Car car2 = new Car("carrola","200-2020","kaki-kukeko");

    System.out.println("Car1:"+car1.name+" "+car1.number+" "+car1.owner);
    System.out.println("Car2:"+car2.name+" "+car2.number+" "+car2.owner);
  }
}
```

実行結果

```
> java Main
Car1:lexus 100-1010 ai-ueo
Car2:carrola 200-2020 kaki-kukeko
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
class クラス名:
  def __init__(self,引数):
    # 処理文
```

Python では　**\_\_init()\_\_** という関数がクラスのコンストラクタの役目を果たす。  
クラスのインスタンス生成後、真っ先にこの関数\_\_init\_\_が実行される。  
大体はインスタンス変数を設定するために利用されることが多い。そのときは\_\_init\_\_の引数に、変数に設定したい値に加えて**self**を追加することを忘れずに行う。

実行例を以下に示す。

```python
>>>
>>> class Car:
...     def __init__(self,carname,carnumber,carowner):
...             self.name=carname
...             self.number=carnumber
...             self.owner=carowner
...
>>> car1 = Car("lexus","100-1010","ai-ueo")
>>> car2 = Car("carrola","200-2020","kaki-kukeko")
>>>
>>> [car1.name,car1.number,car1.owner]
['lexus', '100-1010', 'ai-ueo']
>>> [car2.name,car2.number,car2.owner]
['carrola', '200-2020', 'kaki-kukeko']
>>>
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

Javascript でのコンストラクタは Java や Python のそれとは対象が微妙に異なる。

まず、Javascript には Java のクラスのといったデータ構造はないため、これに対するコンストラクタではない。

しかし、Javascript では関数がクラスのようなデータ構造を表せることがあり、コンストラクタとはこれに対してのコンストラクタである。

これを利用すると、関数の中身で指定されたプロパティを持ったオブジェクトが生成される。

例えば以下の関数があったとする。

```javascript
var Person = function (name) {
  this.name = name;
};
```

この関数を、**new**キーワードを用いて別の変数に格納すると、変数にはオブジェクト型のデータが格納される。

```javascript
var john = new Person("john");
console.log(john.name);
```

実行結果

```
john
```

何が起きているのだろうか？実は、new キーワードを使うと、指定された関数は以下の処理が追加されたような挙動を示す。

```javascript
var Person = function (name) {
  //var this={}
  this.name = name;
  //return this
};
```

new を追加することによって、関数をオブジェクトとして表すことが可能になる。

javascript では、この new で指定された関数のことを**コンストラクタ**と呼んでいる。また、コンストラクタにより生成されたオブジェクトを**インスタンス**と呼ぶ。

</div>

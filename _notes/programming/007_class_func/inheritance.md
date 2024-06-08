---
title: "継承"
date: "2019-10-29T03:37:30+09:00"
excerpt: "継承について"
tag: ["Java", "Python", "Javascript"]
programming: ["Java", "Python", "Javascript"]
updatedAt: "2019-10-29T03:37:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

クラスを実装できる言語の大半は、他のクラスの構造を受け継ぎ、そこから新しい変数やメソッド(関数)等を付け足す形でクラスを定義することができる。  
これを**継承**という。  
クラスの継承の方法についてをここでは示す。

<div class="note_content_by_programming_language" id="note_content_Java">

Java でのクラスの継承の方法は以下の通り。

```java
[アクセス修飾子] class クラス名 extends 継承元クラス(スーパークラス)名 {
  //文
}
```

Java では継承する元となるクラスを**スーパークラス**、継承して作成したクラスを**サブクラス**という。  
サブクラスはスーパークラスを継承して作成されるため、スーパークラスで定義した変数やメソッドは全て受け継がれる。
サブクラスからはスーパークラスの変数やメソッドを利用することができる（ただし設定されているアクセス修飾子により、利用できない場合がある）

実行例を以下に示す。

```java
//  Beverageクラス
class Beverage{

    int price = 0;
    String name = "";

    public Beverage(int p,String n){
        price = p;
        name = n;
    }

    public void howMuch(){
        System.out.println("This "+name+" is "+price+" yen.");
    }
}

// Liquorクラス、Beverageクラスを継承
class Liquor extends Beverage{

    int alcohol_content=100;

    public Liquor(int p,String n,int a){
        super(p,n); //スーパークラスのコンストラクタ
        alcohol_content=a;
    }
}

class Main{
  public static void main(String args[]){

    Beverage orange_juice = new Beverage(100,"orange juice");
    Liquor screw_driver = new Liquor(1000,"screw driver",15);

    //orange_juice,変数、メソッドを表示
    System.out.println("orange_juice.price:" + orange_juice.price);
    System.out.println("orange_juice.name :" + orange_juice.name);

//  以下、Beverageクラスはalcohol_contentは持ってないので、参照しようとするとエラーになる
//  というよりコンパイルエラーになるので、一時的にコメントアウト
//   System.out.println("orange_juice.alcohol_content:" + orange_juice.alcohol_content);

    orange_juice.howMuch();

    //screw_driver、変数、メソッドを表示
    System.out.println("screw_driver.price:" + screw_driver.price);
    System.out.println("screw_driver.name :" + screw_driver.name);
    System.out.println("screw_driver.alcohol_content:" + screw_driver.alcohol_content);

    screw_driver.howMuch();
  }
}
```

実行結果

```
> java Main
orange_juice.price:100
orange_juice.name :orange juice
This orange juice is 100 yen.
screw_driver.price:1000
screw_driver.name :screw driver
screw_driver.alcohol_content:15
This screw driver is 1000 yen.
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
class クラス名(継承元クラス名):
    #文
```

Python でのクラスの継承の方法は上記の通り。

ここで定義したクラスは継承元クラスが持つ変数や関数を受け継ぐので、文中に定義しなくても参照が可能である。  
別クラスを継承したクラスに定義した変数や関数はそのクラスのみが持ち、継承元のクラスは利用できない。

実行例を以下に示す。

```python
>>> #Beverageクラス(飲み物)
>>> class Beverage():
...     price=0
...     name=""
...     def __init__(self,p,n):
...             self.price=p
...             self.name=n
...     def howmuch(self):
...             return "This "+self.name+" is "+str(self.price)+" yen."
...
>>>
>>> #Liquorクラス(アルコール飲料)、Beverageクラスを継承
>>> class Liquor(Beverage):
...     alcohol_content=100
...     def __init__(self,p,n,a):
...             self.price=p
...             self.name=n
...             self.alcohol_content=a
...
>>>
>>> orange_juice = Beverage(100,"orange juice")
>>>
>>> screw_driver = Liquor(1000,"screw driver",15)
>>>
>>> #Beverageクラスのprice,nameは参照できる
>>> orange_juice.price
100
>>> orange_juice.name
'orange juice'
>>>
>>> #Beverageクラスはalcohol_contentは持ってないので、参照しようとするとエラーになる
>>> orange_juice.alcohol_content
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
AttributeError: 'Beverage' object has no attribute 'alcohol_content'
>>>
>>> #Beverageクラスのhowmuch関数は利用できる
>>> orange_juice.howmuch()
'This orange juice is 100 yen.'
>>>
>>> #LiquorクラスはBeverageクラスを継承しているので、変数price,nameを参照できる。
>>> screw_driver.price
1000
>>> screw_driver.name
'screw driver'
>>>
>>> #Liquorクラスはalcohol_contentを定義しているので、これも参照できる。
>>> screw_driver.alcohol_content
15
>>> #LiquorクラスはBeverageクラスを継承しているので、関数howmuch()を利用できる。
>>> screw_driver.howmuch()
'This screw driver is 1000 yen.'
>>>
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

Javascript ではコンストラクタを使って作られたオブジェクトを使った継承が行える。

例えば以下のようなオブジェクトがあったとする。

```javascript
var Person = function (name) {
  this.name = name;
  this.introduce = function () {
    console.log("My name is " + this.name);
  };
};

var Student = function (name, grade) {
  this.name = name;
  this.grade = grade;
};
```

ここで、Student オブジェクトにも Person オブジェクトが持つプロパティを持たせたい（継承）とき、以下のようにする。

```javascript
Student.prototype = new Person();
```

これにより、Student オブジェクトに Person オブジェクトが持つプロパティを持たせることができる。これが javascript での継承の方法である。この後の例を以下に示す。

```javascript
var mary = new Student("Mary", 1);
console.log(mary.introduce());
```

実行結果

```
My name is Mary
```

</div>

---
title: "ラムダ式（無名関数）"
date: "2019-10-29T08:37:30+09:00"
excerpt: "ラムダ式（無名関数）について"
tag: ["Java", "Python", "Javascript"]
programming: ["Java", "Python", "Javascript"]
updatedAt: "2019-10-29T08:37:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

# ラムダ式（無名関数）

ラムダ式（無名関数）についてを述べる。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
import java.util.function.Function;
Function<引数の型,返り値の型> 変数名 = (引数) -> { 処理 };
```

Java では簡易的なメソッドを実装する方法としてラムダ式というのがある。

`( 実装するメソッドの引数 ) -> { 処理 }`

ラムダ式では、**関数型インターフェース**の変数に、この記法で記述されたコードを代入する。  
関数型インターフェースとは**java.util.function**に定義されているインターフェースであり、それぞれ用途があるが、共通して言えるのは定義されているのが抽象メソッド１つということである。この抽象メソッドをラムダ式で実装することによって利用する。

記法について、引数には型名も基本必要だが、すでに定義している変数を使う場合は型名が省略できる。  
また、引数が１つの場合は()を省略できる。

`引数 -> { 処理 }`

ただし、引数が無い場合は()の省略はできない。

`() -> { 処理 }`

右辺において、処理が 1 文の場合は、{}の省略が可能。{}を省略している場合は、return も省略可能。

`(引数) -> 処理`

実行例を以下に示す。

```java
import java.util.function.Function;

class Main{
  public static void main(String args[]){

    Function<String,String> func = (String str) -> {
      return "Lambda:" + str;
    };

    System.out.println(func.apply("implemented."));


    func = str -> "none() Lambda:" + str;

    System.out.println(func.apply("implemented."));

  }
}
```

実行結果

```
$ java Main
Lambda:implemented.
none() Lambda:implemented.
```

この例で出てきた Function クラスは関数型インターフェースで、中には抽象メソッド **R apply(T t)** が定義されている(T は引数の型、R は返り値の型)。Function クラスの変数宣言時にラムダ式を代入すると、そのラムダ式の定義が抽象メソッド apply に適用される。  
他の関数型インタフェースに対しても、同様にラムダ式を定義し代入することで利用できる。（他にどのような関数型インタフェースがあるかはここでは割愛する。）

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

Python ではキーワード**lambda**を使って定義することで無名関数が書ける。

```python
lambda (引数): (処理・返り値)
```

引数は何個でも設定できる。  
特徴としては lambda の式は変数に格納することができる。  
その変数に引数を指定して実行すると、lambda に渡されて実行される。

```python
>>> a=lambda x:x+1
>>>
>>> a(0)
1
>>> a(1)
2
>>>
>>> b=lambda x,y:x*y
>>> b(1,2)
2
>>> b(10,-10)
-100
>>>
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
var 変数名 = function([引数1[,引数2]]){
    //関数内の処理
}
// または(アロー関数)
var 変数名 = ([引数1[,引数2]]) => {
    //関数内の処理
}
```

また、Javascript では**無名関数(匿名関数)**という仕様があり、変数に直接関数を代入することができる。

呼び出すときは、`変数名(引数);`という形で利用できる。

関数リテラルの時は、**アロー関数** と呼ばれる表記法でも定義できる。アロー関数は `(引数..) => { 関数の処理.. }` のような表記で書くことができる。

</div>

---
title: "変数を宣言する"
date: "2019-11-01T00:37:30+09:00"
excerpt: "変数を宣言する方法について"
tag: ["Java", "Python", "Swift", "Javascript", "Go"]
programming: ["Java", "Python", "Swift", "Javascript", "Go"]
updatedAt: "2019-11-01T00:37:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

変数を宣言する方法についてを述べる。

<div class="note_content_by_programming_language" id="note_content_Java">

Java での変数の宣言は以下の通り。

```java
データ型 変数名;
変数名 = 値;
// または
データ型 変数名 = 値;
```

Java は静的型付け言語(コンパイルなどの実行前の段階で、変数の型を決定する言語)のため、変数の宣言時に設定できる値の型を指定してやる必要がある。

そのため、変数には指定されたデータ型の値しか格納することはできない。(継承等の場合を除く)

例

```java
int a = 3;

int b;
b = 2;
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

Python での変数の宣言方法は以下の通り。

```python
変数名 = 値
```

Python は動的型付け言語のため、変数の型は宣言する必要はない。一つの変数にどのような型の値も入れられる。

例

```python
>>> a=1
>>> a
1
>>> a='1'
>>> a
'1'
>>>
```

</div>
<div class="note_content_by_programming_language" id="note_content_Swift">

Swift では**var**キーワードを用いて以下の様に表現する。

```swift
var 変数名:型名
```

Swift は静的型付け言語(コンパイルなどの実行前の段階で、変数の型を決定する言語)のため、記載時の段階で変数に入れられる型を決める必要がある。

例

```swift
var a: Int
a = 10
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
var 変数名 [= 初期値];
var 変数1,変数2,...

let 変数名 [= 初期値];
let 変数1,変数2,...
```

Javascript では**var** 及び **let** キーワードを用いて変数を宣言する。

記法は上記のとおり。

Javascript はスクリプト言語のため、型は宣言しなくても良い。<br>
（しかし、変数に値が入るとその変数は型を持つ。変数の型を調べるには typeof キーワード等を用いる。）

宣言と同時に初期値を設定することも、１回で複数の変数を宣言することも可能である。

また、var を使って宣言した変数は同じ名前で再宣言することが可能であるが、let を使って宣言した場合、同じ名前で変数を宣言することはできない。

例

```Javascript
var a
a = 10

var a = 20; // 動作する

let a = 30; // エラーが起きて動作しない
```

</div>
<div class="note_content_by_programming_language" id="note_content_Go">

```go
// 明示的な定義
var a int
a  = 10

// 暗黙的な定義
b := 1
```

Go で変数を定義するには、明示的な書き方と暗黙的な書き方の 2 種類あります。

明示的な方では、予約語である var の後に続けて変数の名前を指定し、最後に変数の方を指定します。

定義した変数には演算子=を利用して値を代入できます。型が正しくない場合はコンパイルエラーが発生します。

これに対して暗黙的な方では、「型指定の必要がない」という特徴を持ちます。

演算子:=を利用することで、変数の型の定義と値の代入をまとめて実行できます。

型指定はどこにも見当たりませんが、代入する値によって、暗黙的にその変数はその型であると決定されます。この様な機能は一般に「型推論」と呼びます。

</div>

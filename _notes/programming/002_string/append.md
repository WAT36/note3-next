---
title: "文字列を繋げる"
date: "2019-10-14T19:58:19.000Z"
excerpt: "文字列に別の文字列を追加する方法"
tag: ["Java", "Python", "Javascript"]
programming: ["Java", "Python", "Javascript"]
updatedAt: "2024-03-17T22:39:43.000Z"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

文字列の末尾に別の文字列を繋げて新しい文字列としてデータを作る方法についてをまとめる。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
"文字列A" + "文字列B";  //"文字列A文字列B"

// StringBuilderクラスの場合
StringBuilder sb = new StringBuilder("文字列A");
sb.append("文字列B"); // "文字列A文字列B",インプレースで処理
```

java の場合は使用しているクラスにより方法が異なる。

String では **+** 演算子を使うことで文字列を連結できる。

以下に使用例を示す。

```java
String s = "test";
String t = "1" + s;
System.out.println(t); // 1test
String t = s + "1";
System.out.println(t); // test1
```

また、StringBuilder クラスを使っている場合は、**append(追加する値)** メソッドを使うと末尾に追加されるので便利。

指定した位置に追加したい場合は **insert(追加する位置,追加する値)** メソッドを使う。

ちなみに、これらメソッドは引数の型にかかわらず入力でき、引数は自動的に文字列型に置き換えられて追加される。

```java
StringBuilder sb = new StringBuilder("test");
sb.append("1");
System.out.println(sb.toString()); // test1
sb.insert(0,"1");
System.out.println(sb.toString()); // 1test1
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
"文字列A" + "文字列B"  # "文字列A文字列B"
"文字列A" += "文字列B" # "文字列A文字列B",インプレース処理

"文字列A" * 5 # "文字列A文字列A文字列A文字列A文字列A"
```

Python でも " **+** "," **+=** " 演算子を使って文字列を連結できる。

また" \* "演算子を使って同じ文字を指定回数連結することもできる。

以下に使用例を示す。

```python
s = "test"
t = s + "1"
print(t) # s1

t += "1"
print(t) # s11

t = s * 5
print(t) # testtesttesttesttest
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
"文字列A" + "文字列B"; // "文字列A文字列B"
//または
"文字列A".concat("文字列B"); // "文字列A文字列B"

// 文字列を指定回数繰り返し連結した文字列を取得
"文字列A".repeat(3); // "文字列A文字列A文字列A"
```

Javascript でも" **+** " 演算子を使って文字列を連結できる。

または、文字列の関数 **concat()** を使って連結も行える。

```javascript
var str = "Hello!" + "World!";
console.log(str); // Hello!World!

var str2 = "Hello!".concat("World!");
console.log(str2);
```

実行結果

```
Hello!World!
Hello!World!
```

(番外)

文字列同士を繋げるという意味では似てはいるが、以下のメソッドも紹介する。

javascript には、指定した文字列を指定した回数だけ繰り返し連結した文字を取得する **repeat(num)** というメソッドも存在する。引数 num には繰り返す回数を入力する。

例

```javascript
var str = "Hello!World!";
console.log(str.repeat(3));
```

実行結果

```
Hello!World!Hello!World!Hello!World!
```

</div>

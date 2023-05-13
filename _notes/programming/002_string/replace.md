---
title: "文字列の置換"
date: "2019-10-12T19:46:41.000Z"
excerpt: '文字列を別の文字列に置換する'
tag: ["Java","Python","Javascript"]
programming: ["Java","Python","Javascript"]
updatedAt: '2019-10-12T19:46:41.000Z'
author:
  name: Tatsuroh Wakasugi
  picture: '/assets/blog/authors/WAT.jpg'
mode: programming
---

文字列を別の文字列に置換する方法。

例えば"a"という文字を全て"e"に変えたいとなった時

```
"a" -> "e"
"and" -> "end"
```

など、指定した文字列全ての他、文字列の一部分または文字列中の条件に合う文字列に対する置換を行う方法を示す。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
文字列.replace(置換前の文字列,置換後の文字列);
```

javaで文字列を置換したい時は **replace()** メソッドを使う。

以下に使用例を示す。

```java
String s = "and";
String t = s.replace("a","e");
System.out.println(t); // end
```

上記例では"and"という文字列をreplaceメソッドで"a"を"e"に置換し、結果を表示している。結果として"end"という文字列が表示される。

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
文字列.replace(old,new [,count]);
```

Pythonでは文字列型のstrオブジェクトにメソッド **replace()** があり、これにより文字列中の文字を置換できる。

これにより文字列中のoldの部分をnewに変換する。

また、オプション引数countがあり、指定すると先頭からcount個分のoldのみを置換する。  

なお、文字列にoldが無い場合は、置換されずにそのまま出力される。  

使用例を以下に示す。

```python
s = "and"
t = s.replace("a","e")
print(t)  # "end"

s = "andand"
t = s.replace("a","e",1)
print(t)  # "endand"
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
文字列.replace(old,new);
```

Javscriptでは文字列のメソッド **replace()** があり、これにより文字列中の文字を置換できる。

置換対象の文字列oldは、文字列の他に正規表現の形でも入力できる。  

文字列を入力した場合は最初の一致した箇所のみを置換し、正規表現の場合は一致した箇所全てを置換する。

ただし、文字列自体が変換されるわけではないので、反映させたい場合は出力を元の変数に代入してやる必要がある。

使用例を以下に示す。

```javascript
var s = "and and"
var t = s.replace("a","e")
console.log(t)  // "end and"

t = s.replace(/a/g,"e")
console.log(t)  // "end end"
```

</div>

---
title: "標準出力"
date: "2019-10-12T17:19:30.000Z"
excerpt: ""
tag: ["Java", "Python", "Node.js"]
programming: ["Java", "Python", "Node.js"]
updatedAt: "2019-10-12T17:19:30.000Z"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

標準出力とはプログラムから値を出力することで、通常はコンソール画面上に出力される。ここではその方法について示す。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
System.out.println(変数もしくは値);
```

クラスはここでは Main.java とする

java で画面に出力したい時は **System.out.println()** を利用する。

引数には画面に出力したい変数またはデータを入れる。

出力後改行したくない時は System.out. **print()** を使う。

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
print(変数もしくは値)
```

Python でコンソール画面への出力を扱うには組み込み関数の **print()** を使う。

基本、入力された引数を画面に出力する。

改行したくない場合は print()の end パラメータに""を指定する

```python
print(値,end="")
```

</div>
<div class="note_content_by_programming_language" id="note_content_Node.js">

```javascript
console.log(変数もしくは値);
```

Javascript 及び Node.js では、**console.log()** 関数を利用する。
引数には出力したい値及び変数を入力する。

</div>

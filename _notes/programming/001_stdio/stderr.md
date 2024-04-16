---
title: "標準エラー出力"
date: "2019-10-12T17:25:47.000Z"
excerpt: ""
tag: ["Java", "Python", "Node.js"]
programming: ["Java", "Python", "Node.js"]
updatedAt: "2019-10-12T17:25:47.000Z"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

標準エラー出力とは、先述の標準出力とはまた別の出力の事で、エラー情報として出力される値のことである。ここではその方法についてを示す。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
System.err.println(変数もしくは値);
```

クラスはここでは Main.java とする

基本標準出力と似ており、メソッドは **System.err.println()** を利用する。

出力後改行したくない時は、同様に **System.err.print()** を利用する。

ただし、エラー出力は java の場合例外処理を受け取ったときに利用するため、そのときに出たエラーメッセージを出力するのが普通である。

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
import sys
print(x,file=sys.stderr) # xを画面にエラー出力する
```

Python でエラー出力を扱うにはまず sys モジュールをインポートし、<br>
print()の file パラメータに **sys.stderr** を指定する。

</div>
<div class="note_content_by_programming_language" id="note_content_Node.js">

```javascript
console.error(変数もしくは値);
```

Javascript 及び Node.js では、同様に **console.error()** 関数を利用する。
引数には出力したい値及び変数を入力する。

なお、Javascript では error 以外にも、警告情報としてコンソール画面に出力する **console.warn()** という関数もある。（テスト時などに利用できる）

</div>

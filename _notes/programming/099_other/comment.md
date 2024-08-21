---
title: "コメントアウト"
date: "2019-11-01T04:37:30+09:00"
excerpt: "コメントアウトについて"
tag: ["Java", "Python", "Javascript"]
programming: ["Java", "Python", "Javascript"]
updatedAt: "2019-11-01T04:37:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

プログラミングでコメント（注釈）を付け加えたい時、或いはある箇所だけを実行(・コンパイル)の対象外としたい時にはコメントアウトを使う。ここではコメントアウトの方法についてを示す。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
//  (コメント)

/*
 (コメント)
 */
```

Java でのコメントアウトの仕方は上記の通り。

1 行だけをコメントアウトしたい時は`//`を利用した方が良い。これを利用すると、その行内で//から後は全てコメントアウトされる。  
複数行をコメントアウトするときは`/* */`を利用する。これを利用すると、/_ から _/ までの間は全てコメントアウトされる。

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
#  (コメント)

'''
(コメント)
'''
```

Python では **#** がコメントアウトの役割を成す。  
＃を書くと、その行で#以後の部分はコメントアウトされる。  
＃は１行に対してのコメントアウトである。  
複数行に対して行うには、コメントアウトしたい行をシングルクォート(')またはダブルクォート(")**３つ**で囲むと、コメントアウトされる。

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
// コメント（１行）
/* コメント（複数行） */
/**
 * コメント（ドキュメンテーション）
 */
```

Javascript でのコメントの仕方は上記の通り。

１行だけの場合は`//`を利用するのが良い。

複数行の場合は`/* */` で、 `/*` から `*/` まで囲まれた間をコメントとみなし、複数行に渡って書ける。

複数行コメントの中でも、以下のような形式をドキュメンテーションコメントといい、主にコードの使用方法や仕様、意図を説明するために使われる。

```javascript
/**
 * (コードの説明を載せる)
 */
```

</div>

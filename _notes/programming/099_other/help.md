---
title: "関数、メソッドのヘルプを見る"
date: "2019-11-01T03:37:30+09:00"
excerpt: "関数、メソッドのヘルプを見る方法について"
tag: ["Python"]
programming: ["Python"]
updatedAt: "2019-11-01T03:37:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

関数やメソッドの使い方がわからないとき、ヘルプを見る方法がある。それについてを述べる。  
ただし、対話型などこちらがコマンドライン上で扱える言語に限る。故に今は Python のみ記載する。

<div class="note_content_by_programming_language" id="note_content_Python">

Python に **help()** という組み込み関数がある。引数に関数名を入力すると、文字列として扱われて検索し、得たレファレンスなどを返してくれる。  
help()は、対話モードで使用する。

例えば関数 max を help で調べて見ると以下のようになる。

```python
>>> help(max)
```

実行結果

```
Help on built-in function max in module builtins:

max(...)
    max(iterable, *[, default=obj, key=func]) -> value
    max(arg1, arg2, *args, *[, key=func]) -> value

    With a single iterable argument, return its biggest item. The
    default keyword-only argument specifies an object to return if
    the provided iterable is empty.
    With two or more arguments, return the largest argument.
(END)
```

</div>

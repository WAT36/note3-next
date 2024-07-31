---
title: "引数のデフォルト値"
date: "2019-10-29T05:37:30+09:00"
excerpt: "引数のデフォルト値について"
tag: ["Python", "Javascript"]
programming: ["Python", "Javascript"]
updatedAt: "2019-10-29T05:37:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

関数の引数にデフォルト値を設定できる言語がある。  
定義した引数に何も値が入力されなかった場合に、自動でデフォルト値が指定された引数に入るという仕組みである。ここではそれについてを示す。

<div class="note_content_by_programming_language" id="note_content_Python">

```python
def 関数名(引数=デフォルト値):
    #処理文
```

Python では関数の定義時に引数に**引数名=デフォルト値**と書くとデフォルト値を設定できる。

実行例を以下に示す。

```python
>>>
>>> #関数greet、引数の文字をそのまま返す。引数のデフォルト値は"Hello!"
>>> def greet(s='Hello!'):
...     return s
...
>>>
>>> #引数に"World!" -> 引数sに"World!"が入りそれが返る
>>> greet('World!')
'World!'
>>>
>>> #引数無し -> 引数sにはデフォルト値"Hello!"が入りそれが返る
>>> greet()
'Hello!'
>>>
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
function 関数名(引数1=デフォルト値1,引数2=デフォルト値2,...){
  //  関数の処理
}

// (応用) 名前付き引数
function 関数名({引数1=デフォルト値1,引数2=デフォルト値2,...}){
  //  関数の処理
}
```

</div>

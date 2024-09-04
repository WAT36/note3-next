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

javascript で関数のデフォルト値を宣言するには、**引数名 = デフォルト値** の形式で宣言すれば良い。

実行時に入力されなかった引数でデフォルト値の定義があるものは、そのデフォルト値が使われる。

## 名前付き引数

少しそれるが、似た技法として**名前付き引数**という方法もあるのでここで記載する。

名前付き引数とは、呼び出し時に名前を明示的に指定できる引数のことである。

関数の引数にオブジェクトのような形式で定義し、プロパティに引数名を明記する形で定義する。

この時、引数名 = デフォルト値　とすることで、デフォルト値を定義できる。

実行例を以下に示す。

```javascript
function getSquare(edge = 5) {
  return edge * edge;
}

console.log(getSquare());
console.log(getSquare(1));

function getTriangle({ base = 1, height = 1 }) {
  return (base * height) / 2;
}

console.log(getTriangle({}));
console.log(getTriangle({ base: 5, height: 5 }));
```

実行結果

```
25
1
0.5
12.5
```

</div>

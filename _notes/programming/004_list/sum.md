---
title: "リストの全要素の合計値"
date: "2019-10-25T19:35:30+09:00"
excerpt: "リストの全要素の合計値を取得する方法。"
tag: ["Java", "Python", "Javascript"]
programming: ["Java", "Python", "Javascript"]
updatedAt: "2019-10-25T19:35:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

リスト中の全要素を合計した値を取得する方法についてを示す。  
またここで扱うリスト内の要素は全て数値であることを前提とする。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
// 作成中・・
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
sum(リスト)
```

Python では組み込み関数として **sum()** という関数があり、引数として受け取ったイテラブルな値（リストなど）の全要素の合計値を算出してくれる。  
文字列など、計算が行えない値が入っていた場合はエラーになる。

```python
>>> a=[1,2,3,4,5,6,7,8,9,10]
>>> sum(a)
55
>>>
>>> b=['a','bb','ccc','dddd','eeeee']
>>> sum(b)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: unsupported operand type(s) for +: 'int' and 'str'
>>>
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
Array.reduce((a, b) => a + b, 0);
```

javascript の Array オブジェクトには、要素の合計値を求める専用のメソッドはないため、Array オブジェクトのメソッドである**reduce**を利用して求める。

```
Array.reduce(func,initialValue)
```

reduce メソッドは、Array オブジェクトの要素を順に見ていき、指定した関数 func の処理を行わせる。この関数 func は、第一引数に前の要素に関数を適用した際の実行結果(accumulator)を、第二引数に Array オブジェクトの要素(currentValue)を取り、何らかの処理を行わせた結果を出力させる。その結果が、さらに次の要素に処理するときの実行結果として使われる。Array オブジェクトの最初の要素を見るときに使われる前の要素の実行結果として、reduce メソッドの第二引数に初期値(innitialValue)を設定する。最終的には、全ての要素に対して処理が終わった時の計算結果が出力される。

```javascript
Array.reduce((accumulator, currentValue) => {
  return; // 何らかの処理
}, initialValue);
```

このとき、initialValue を 0 とし、関数には現在の要素に前の要素での実行結果を足し合わせていくようにさせると、最終的に全要素の合計値が出力されるようになる。

```javascript
Array.reduce((accumulator, currentValue) => {
  return accumulator + currentValue;
}, initialValue);
```

実行例を以下に示す。

```javascript
let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let result = arr.reduce((accumulator, currentValue) => {
  return accumulator + currentValue;
}, 0);

console.log(result);
// 55
```

</div>

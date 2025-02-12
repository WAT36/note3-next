---
title: "配列・リストの一部分を切り出す"
excerpt: "配列・リストのある位置からある位置までの部分を切り出す"
coverImage: ""
date: "2024-06-30T12:48:23.000Z"
updatedAt: "2024-06-30T12:48:23.000Z"
tag: ["Java", "Python", "Javascript"]
programming: ["Java", "Python", "Javascript"]
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
mode: programming
---

配列(リスト)の一部分（ある位置からある位置まで）を切り出す方法を示す。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
// 工事中。。。
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
# 工事中。。。
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
Array.slice(start [,end]);
```

javascript には Array オブジェクトに**slice**メソッドがある。
これを利用することで、ある Array オブジェクトのインデックス start から end-1 までの部分を抜き出してくれる。

なお、第二引数 end は指定しなくてもよく、ない場合は start から最後までの部分が抜き出される。

例を以下に示す。

```javascript
let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

console.log(arr.slice(2, 6));
// [3, 4, 5, 6]
console.log(arr.slice(5));
// [6, 7, 8, 9, 10]
```

</div>

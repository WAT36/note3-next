---
title: "配列・リストを別の配列・リストと連結する"
date: "2024-06-30T12:31:51.000Z"
excerpt: ""
tag: ["Java", "Python", "Javascript"]
programming: ["Java", "Python", "Javascript"]
updatedAt: "2024-06-30T12:31:51.000Z"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

配列(リスト)を別の配列(リスト)に連結する方法を示す。

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
Array.concat(リスト);
```

javascript には Array オブジェクトに**concat**メソッドがある。これを利用することで、ある Array オブジェクトの末尾に、別の Array オブジェクトの要素を全て追加したオブジェクトを出力する。

例を以下に示す。

```javascript
let arr1 = [1, 2, 3, 4, 5];
let arr2 = [6, 7, 8, 9, 10];

console.log(arr1.concat(arr2));
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

</div>

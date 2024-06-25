---
title: "文字列を切り出す"
excerpt: "文字列のp文字目からq文字目を切り出して取得する方法"
coverImage: ""
date: "2024-06-24T20:17:32.000Z"
updatedAt: "2024-06-24T20:17:32.000Z"
tag: []
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
---

<div class="note_content_by_programming_language" id="note_content_Java">

```java
// 工事中。。
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
# 工事中。。
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
"文字列".substring(start [,end]);
"文字列".substr(start [,cnt]);
```

javascript は String に**substring**メソッドがあり、これによって文字列の一部分を切り出すことができる。

引数には 1 つか 2 つ(start,end とする)とることができ、これにより文字列の start+1 文字目から end 文字目までを切り出せる。

また、**substr**メソッドもあり、こちらを利用しても文字列の一部分を切り出すことができる。

こちらも引数には 1 つか 2 つ(start,cnt とする)とることができ、これにより文字列の start+1 文字目から cnt 文字までを切り出せる。

```javascript
let str = "abcdefghijklmnopqrstuvwxyz";

console.log(str.substring(10));
console.log(str.substring(10, 20));

console.log(str.substr(10));
console.log(str.substr(10, 5));
```

実行結果

```
klmnopqrstuvwxyz
klmnopqrst
klmnopqrstuvwxyz
klmno
```

</div>

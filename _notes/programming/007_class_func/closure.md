---
title: "クロージャ"
excerpt: ""
coverImage: ""
date: "2024-08-04T22:30:23.000Z"
updatedAt: "2024-08-04T22:30:23.000Z"
tag: ["Javascript"]
programming: ["Javascript"]
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
mode: programming
---

javascript の**クロージャ**についてを述べる。

<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
function 関数名(引数) {
  var 変数名;

  return function () {
    return 変数名;
  };
}
```

Javascript におけるクロージャとは、関数と変数が一体となったデータ構造である。この構造により、変数の値を保持する処理を簡潔に記述することができる。

関数内の変数は関数の処理が終わると破棄されるが、クロージャではガベージコレクションの対象とならず、変数への参照が残ったままになる。

クロージャの例としては以下の通り。

```javascript
//クロージャ
function closure() {
  var a = 1;

  return function () {
    return a++;
  };
}

var c = closure();

//c()を呼び出すごとにカウントアップ。クロージャなので値が残る
console.log(c());
console.log(c());
console.log(c());
```

実行結果

```
1
2
3
```

</div>

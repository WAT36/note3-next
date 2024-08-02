---
title: "高階関数"
excerpt: "関数の引数に関数を定義する"
coverImage: ""
date: "2024-08-03T02:43:21.000Z"
updatedAt: "2024-08-03T02:43:21.000Z"
tag: ["Javascript"]
programming: ["Javascript"]
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
mode: programming
---

高階関数とは関数を引数または戻り値として扱う関数のことである。ここでは高階関数についてを述べる。

<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
function 関数1() {
  // 関数1の処理
}

function 関数2(関数1) {
  関数1();
}
```

javascript では関数もデータ型の一種であるため、関数も他の関数の引数および戻り値として指定することができる。これが高階関数である。

高階関数において、呼び出し先の関数の中で呼び出される関数のことを、**コールバック関数** ともいう。

実行例を以下に示す。

```javascript
const hands = ["グー", "チョキ", "パー"];
function enemyHand() {
  return hands[Math.floor(Math.random() * hands.length)];
}

function autoHand(enemy) {
  const e = enemy();
  console.log(`相手：${e}`);
  switch (e) {
    case "グー":
      return "パー";
    case "チョキ":
      return "グー";
    case "パー":
      return "チョキ";
  }
}

console.log(`勝つには：${autoHand(enemyHand)}`);
```

実行結果

```
相手：パー
勝つには：チョキ
```

</div>

---
title: "非同期処理"
excerpt: "非同期処理を行う方法について"
coverImage: ""
date: "2024-06-19T22:36:20.000Z"
updatedAt: "2024-06-19T22:36:20.000Z"
tag: ["Javascript"]
programming: ["Javascript"]
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
---

プログラミングにおける非同期処理とは、特定の操作を待つことなくプログラムの他の部分を実行できる処理方法のことを指す。

非同期処理を使うことで、プログラムが途中で終了することなく、複数のタスクを効率的に実行することが可能になる。

例えばネットワーク通信でデータの送受信や、データベースのクエリ結果を待つ間も他の処理を行うことができる。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
// 作成中・・
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
# 作成中・・
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript

```

javascript での非同期処理はいくつかあるが、ここでは **Promise** オブジェクトについて記載する。

Promise オブジェクトは、非同期処理の状態を監視し、その結果を元に処理を分けたりするオブジェクトである。

利用するには、以下のコンストラクタを利用する。

```javascript
// resolve: 処理の成功を通知するための関数
// reject:  処理の失敗を通知するための関数
// statements: 処理本体
new Promise((resolve, reject) => {
  statements;
});
```

</div>

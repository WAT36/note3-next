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
new Promise((resolve, reject) => {
  // ....非同期処理
  resolve(); // 非同期処理成功時
  // ...
  reject(); // 非同期処理失敗時
}).then(success /*成功時実行関数*/, failure /*失敗時実行関数*/);
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

コンストラクタの引数である resolve,reject は、それぞれ非同期処理の成功と失敗を通知するための関数である。

statements(処理)の中でこの resolve,reject 関数を利用して、成功か失敗かを戻す。またこれらの関数の引数には結果やエラーメッセージなど、任意のオブジェクトを渡すことができる。

この処理が終わり、戻ってきた結果に応じて処理を分けるのが、Promise オブジェクトの**then**メソッドである。

```javascript
// promise: Promiseオブジェクト
// success: 成功時に実行する関数
// failure: 失敗時に実行する関数
promise.then(success, failure);
```

ここでの引数 success,failure は、それぞれ resolve,reject が返ってきた時に呼び出され、また resolve.reject で渡された引数がそのまま success,failure の引数に渡される。

ここまでの内容を例にしてみよう。以下に示す。

```javascript
// 例：タイムアウトを待つ関数
function doTimeout(value) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (value) {
        // valueが定義されていれば成功
        resolve(value);
      } else {
        // そうでない場合失敗
        reject();
      }
    });
  });
}

doTimeout("value").then(
  // 成功時
  (response) => {
    console.log(`成功！:${response}`);
  },
  // 失敗時
  (error) => {
    console.error(`失敗.:${error}`);
  }
);

// 成功！:value
```

この例では、関数 doTimeout で Promise オブジェクトを生成し、非同期処理として setTimeout を実行している。doTimeout に引数があれば成功として戻り、そうでない場合は失敗として戻る。

下の部分で、doTimeout の引数に"value"を設定し実行している。成功として戻ってくるので、then メソッドで指定した成功時の関数が実行される。

</div>

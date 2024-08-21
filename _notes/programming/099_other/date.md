---
title: "日付/時刻型"
excerpt: "日付/時刻データを扱いたい時"
coverImage: ""
date: "2024-07-13T11:51:44.000Z"
updatedAt: "2024-07-13T11:51:44.000Z"
tag: ["Javascript"]
programming: ["Javascript"]
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
mode: programming
---

<div class="note_content_by_programming_language" id="note_content_Java">

```java
// 作成中。。。
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
# 作成中。。。
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
var d = new Date(); // 現在時刻
var d = new Date("2022/12/01 12:23:34"); // 引数に入力した時刻
```

javascript では基本データ型として日付を扱うオブジェクトは無いが、組み込みオブジェクト**Date**を利用すれば、日付のデータを扱える。

Date オブジェクトを生成するには、**new Date()** で生成する。引数には設定したい時刻を入力し、何も入力しない場合は実行時点での時刻が入る。

Date オブジェクトで利用可能なメソッド等は以下の通り。

| メソッド            | 概要                                                                  |
| :------------------ | :-------------------------------------------------------------------- |
| getFullYear()       | 年を取得                                                              |
| getMonth()          | 月を取得                                                              |
| getDate()           | 日を取得                                                              |
| getDay()            | 曜日(0:日曜~6:土曜)を取得                                             |
| getHours()          | 時を取得                                                              |
| getMinutes()        | 分を取得                                                              |
| getSeconds()        | 秒を取得                                                              |
| getMilliseconds()   | ミリ秒を取得                                                          |
| getTime()           | 1970/01/01 00:00:00 からの経過ミリ秒                                  |
| setFullYear(y)      | 年を y に設定                                                         |
| setMonth(m)         | 月を m に設定                                                         |
| setDate(d)          | 日を d に設定                                                         |
| setHours(h)         | 時を h に設定                                                         |
| setMinutes(m)       | 分を m に設定                                                         |
| setSeconds(s)       | 秒を s に設定                                                         |
| setMilliseconds(ms) | ミリ秒を ms に設定                                                    |
| now()               | 現在時点での 1970/01/01 00:00:00 からの経過ミリ秒を取得(静的メソッド) |
| toString()          | 日時を文字列として取得                                                |
| toDateString()      | 日付部分を文字列として取得                                            |
| toTimeString()      | 時刻部分を文字列として取得                                            |

いくつか例を記載する。

```javascript
var d = new Date("2022/12/01 12:23:34");
console.log(`年：${d.getFullYear()}`);
console.log(`月：${d.getMonth()}`);
console.log(`日：${d.getDate()}`);
console.log(`曜：${d.getDay()}`);
console.log(`時：${d.getHours()}`);
console.log(`分：${d.getMinutes()}`);
console.log(`秒：${d.getSeconds()}`);
console.log(`ms：${d.getMilliseconds()}`);
console.log(`time：${d.getTime()}`);

console.log(`nowtime：${Date.now()}`);
console.log(`日時：${d.toString()}`);
console.log(`日付：${d.toDateString()}`);
console.log(`時刻：${d.toTimeString()}`);
```

実行結果

```
年：2022
月：11
日：1
曜：4
時：12
分：23
秒：34
ms：0
time：1669865014000
nowtime：1720870255912
日時：Thu Dec 01 2022 12:23:34 GMT+0900 (日本標準時)
日付：Thu Dec 01 2022
時刻：12:23:34 GMT+0900 (日本標準時)
```

</div>

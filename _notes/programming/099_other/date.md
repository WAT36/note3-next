---
title: "日付/時刻型"
excerpt: "日付/時刻データを扱いたい時"
coverImage: ""
date: "2024-07-13T11:51:44.000Z"
updatedAt: "2024-07-13T11:51:44.000Z"
tag: []
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
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
var d = new Date(2022/12/01 12:23:34); // 引数に入力した時刻

```

javascript では基本データ型として日付を扱うオブジェクトは無いが、組み込みオブジェクト**Date**を利用すれば、日付のデータを扱える。

Date オブジェクトを生成するには、**new Date()** で生成する。引数には設定したい時刻を入力し、何も入力しない場合は実行時点での時刻が入る。

Date オブジェクトで利用可能なメソッド等は以下の通り。

| メソッド          | 概要                                 |
| :---------------- | :----------------------------------- |
| getFullYear()     | 年を取得                             |
| getMonth()        | 月を取得                             |
| getDate()         | 日を取得                             |
| getDay()          | 曜日(0:日曜~6:土曜)を取得            |
| getHours()        | 時を取得                             |
| getMinutes()      | 分を取得                             |
| getSeconds()      | 秒を取得                             |
| getMilliSeconds() | ミリ秒を取得                         |
| getTime()         | 1970/01/01 00:00:00 からの経過ミリ秒 |

</div>

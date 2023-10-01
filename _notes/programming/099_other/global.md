---
title: "大域変数と局所変数（グローバルオブジェクトとCallオブジェクト）"
date: "2019-11-01T09:37:30+09:00"
excerpt: "大域変数と局所変数（グローバルオブジェクトとCallオブジェクト）について"
tag: ["Javascript"]
programming: ["Javascript"]
updatedAt: "2019-11-01T10:37:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

大域変数と局所変数（グローバルオブジェクトと Call オブジェクト）についてを述べる。

<div class="note_content_by_programming_language" id="note_content_Javascript">

## グローバルオブジェクトと Call オブジェクト

Javascript はスクリプトを読み込んだ時に、**グローバルオブジェクト**なるものを自動で生成する。グローバルオブジェクトはグローバルスコープを持ったグローバル変数やグローバル関数を管理する。

同様に、関数を呼んだ時には**Call オブジェクト**が生成される。Call オブジェクトには関数のスコープ内での変数や関数が管理される。

変数が参照された時、それが関数内でだった場合はその関数に対応した Call オブジェクトから変数を探し、無い場合はその上位の Call オブジェクト(あるいはグローバルオブジェクト)に変数を探していく。

## グローバルオブジェクト

グローバルオブジェクトはブラウザが新しいページを読み込む時に自動で生成されるオブジェクトで、インスタンスの記述は不要である。関数やプロパティを参照する際も、インスタンス名の記述は不要である。

代表的なグローバルオブジェクトは以下の通り。

<table style="border:none;">
    <thead>
        <th style="border:none;">オブジェクト名</th>
        <th style="border:none;">説明</th>
    </thead>
    <tr>
        <td style="border:none;">Array</td>
        <td style="border:none;">配列オブジェクト</td>
    </tr>
    <tr>
        <td style="border:none;">Boolean</td>
        <td style="border:none;">真偽値オブジェクト</td>
    </tr>
    <tr>
        <td style="border:none;">Date</td>
        <td style="border:none;">日付オブジェクト</td>
    </tr>
    <tr>
        <td style="border:none;">Error</td>
        <td style="border:none;">エラーオブジェクト</td>
    </tr>
    <tr>
        <td style="border:none;">JSON</td>
        <td style="border:none;">JSONオブジェクト</td>
    </tr>
    <tr>
        <td style="border:none;">Math</td>
        <td style="border:none;">Mathオブジェクト</td>
    </tr>
    <tr>
        <td style="border:none;">Number</td>
        <td style="border:none;">数値オブジェクト</td>
    </tr>
    <tr>
        <td style="border:none;">Object</td>
        <td style="border:none;">オブジェクト</td>
    </tr>
    <tr>
        <td style="border:none;">String</td>
        <td style="border:none;">文字列オブジェクト</td>
    </tr>
</table>

## グローバル関数

グローバル関数はグローバルオブジェクトに含まれる関数である（グローバルオブジェクトそのものでは無い）。グローバル関数はオブジェクトのインスタンス化不要で利用できる。

代表的なグローバル関数は以下の通り。

<table style="border:none;">
    <thead>
        <th style="border:none;">関数名</th>
        <th style="border:none;">説明</th>
    </thead>
    <tr>
        <td style="border:none;">decodeURI()</td>
        <td style="border:none;">URIをデコード</td>
    </tr>
    <tr>
        <td style="border:none;">decodeURIComponnent()</td>
        <td style="border:none;">URIの要素をデコード</td>
    </tr>
    <tr>
        <td style="border:none;">encodeURI()</td>
        <td style="border:none;">URIをエンコード</td>
    </tr>
    <tr>
        <td style="border:none;">encodeURIComponent()</td>
        <td style="border:none;">URIの要素をエンコード</td>
    </tr>
    <tr>
        <td style="border:none;">escape()</td>
        <td style="border:none;">文字列を16進数文字列を変換</td>
    </tr>
    <tr>
        <td style="border:none;">eval()</td>
        <td style="border:none;">文字列を評価する(演算)</td>
    </tr>
    <tr>
        <td style="border:none;">isFinite()</td>
        <td style="border:none;">有限か否かを判定</td>
    </tr>
    <tr>
        <td style="border:none;">isNaN()</td>
        <td style="border:none;">NaN(非数値)か否かを判定する</td>
    </tr>
    <tr>
        <td style="border:none;">parseFloat()</td>
        <td style="border:none;">文字列を浮動小数点数に変換</td>
    </tr>
    <tr>
        <td style="border:none;">parseInt()</td>
        <td style="border:none;">文字列を整数に変換</td>
    </tr>
</table>

## クロージャ

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

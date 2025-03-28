---
title: "ストレージ(JavaScript)"
excerpt: ""
coverImage: ""
date: "2025-03-25T23:46:20.000Z"
updatedAt: "2025-03-26T23:13:36.000Z"
tag: []
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
---

Javascript で扱えるストレージ類についてを記載する。

# Web Storage

Web Storage とは、ブラウザ内にキーと値のペア形式でデータを保存できる API のことで、Cookie では扱えないような数 MB (5MB 以下が推奨)のデータをブラウザに蓄積できるようになる。

ユーザーの PC やスマホのブラウザにデータを一時的または永続的に保存できるので、ログイン情報の保持やちょっとしたデータのキャッシュに便利。

Web Storage で定義されているストレージには次の 2 種類あります。

- セッションストレージ ・・・ ウィンドウごとのセッションで有効なストレージ
- ローカルストレージ ・・・ ブラウザ内に永続的にデータを保存するストレージ

この２つはどちらも共通の Storage の API からなる。

<table style="border:none;">
    <tr>
        <th style="border:none;">プロパティ名</td>
        <th style="border:none;">意味</td>
    </tr>
    <tr>
        <td style="border:none;">length</td>
        <td style="border:none;">ストレージに格納されているキー・値のペア数</td>
    </tr>
</table>

<table style="border:none;">
    <tr>
        <th style="border:none;">メソッド</td>
        <th style="border:none;">意味</td>
    </tr>
    <tr>
        <td style="border:none;">key()</td>
        <td style="border:none;">指定した番号のキーを返す</td>
    </tr>
    <tr>
        <td style="border:none;">getItem()</td>
        <td style="border:none;">指定したキーの値を取得する</td>
    </tr>
    <tr>
        <td style="border:none;">setItem()</td>
        <td style="border:none;">指定したキーと値を保存する</td>
    </tr>
    <tr>
        <td style="border:none;">removeItem()</td>
        <td style="border:none;">指定したキーのデータを削除する</td>
    </tr>
    <tr>
        <td style="border:none;">clear()</td>
        <td style="border:none;">すべてのデータを削除する</td>
    </tr>
</table>

ストレージのデータへのアクセス権限は、ページのオリジンが同一か否かで判断される。

ストレージに変更が発生した場合に、storage イベントが発火します。この際に参照できる StorageEvent のプロパティは以下になる。

<table style="border:none;">
    <tr>
        <th style="border:none;">プロパティ名</td>
        <th style="border:none;">意味</td>
    </tr>
    <tr>
        <td style="border:none;">key</td>
        <td style="border:none;">変更があったキー</td>
    </tr>
    <tr>
        <td style="border:none;">oldValue</td>
        <td style="border:none;">変更があった値の古い値</td>
    </tr>
    <tr>
        <td style="border:none;">newValue</td>
        <td style="border:none;">変更があった値の新しい値</td>
    </tr>
    <tr>
        <td style="border:none;">url</td>
        <td style="border:none;">キーが変更されたドキュメントのアドレス</td>
    </tr>
    <tr>
        <td style="border:none;">storageArea</td>
        <td style="border:none;">変更のあったStorageオブジェクト</td>
    </tr>
</table>

使用例を以下に示す。

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="wBvxjrO" data-pen-title="js-webstorage" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/wBvxjrO">
  js-webstorage</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

この例では、値を入力して保存ボタンを押すと、入力内容がローカルストレージに保存される。その後にブラウザを更新したり別ページに遷移して戻っても、その値が保持されて表示される。

# Indexed Database API

Indexed Database API とは、ブラウザ内に構造化されたデータ（オブジェクト）を保存・検索できるローカルデータベースである。

Web storage とは異なり、データベースとして扱う事ができます。また Web Storage よりも高機能かつ大容量で、Web アプリでオフライン保存や検索機能を使いたいときに役立つ。

リレーショナルデータベースの「テーブル」に相当するのが「オブジェクトストア」で、キーバリュー型で格納されている「オブジェクト」がリレーショナルデータベースの「レコード」に相当します。

基本的にキーはオブジェクトを指定して取得する際に使用し、インデックスは特定範囲のオブジェクトをまとめて取得する際に使用します。データベースを利用するために IndexedDB オブジェクトを利用します。

IndexedDB オブジェクトは IDBEnvironment のプロパティに定義されています。IDBEnvironment は Window オブジェクトに実装されているので、そこから利用します。

<table style="border:none;">
    <tr>
        <th style="border:none;">プロパティ名</td>
        <th style="border:none;">意味</td>
    </tr>
    <tr>
        <td style="border:none;">indexedDB</td>
        <td style="border:none;">データベースを生成/削除するためのIDBFactory型のオブジェクト</td>
    </tr>
</table>

indexedDB は IDBFactory 型のオブジェクトです。IDBFactory の API を示します。

<table style="border:none;">
    <tr>
        <th style="border:none;">メソッド</td>
        <th style="border:none;">意味</td>
    </tr>
    <tr>
        <td style="border:none;">open()</td>
        <td style="border:none;">データベースを開く</td>
    </tr>
    <tr>
        <td style="border:none;">deleteDatabase()</td>
        <td style="border:none;">データベースを削除する</td>
    </tr>
    <tr>
        <td style="border:none;">cmp()</td>
        <td style="border:none;">２つのキー値を比較する</td>
    </tr>
</table>

以下に使用例を記載する。

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="pvoZmvb" data-pen-title="js-indexed-database" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/pvoZmvb">
  js-indexed-database</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

# File API

File API とは、ブラウザ上でユーザーのファイルを扱うための API です。ローカルのファイルを選んでもらって、読み込んだり、内容を表示したりできるようになります。

File API では、ブラウザ上でユーザがフォームから選択したファイルや、ユーザがドラッグ&ドロップしたファイルを扱う事ができます。

File API で扱うオブジェクトは以下のようなものがあります。

<table style="border:none;">
    <tr>
        <th style="border:none;">オブジェクト名</td>
        <th style="border:none;">役割</td>
    </tr>
    <tr>
        <td style="border:none;">File</td>
        <td style="border:none;">実際に選ばれたファイルを表す</td>
    </tr>
    <tr>
        <td style="border:none;">FileList</td>
        <td style="border:none;">ファイルが複数選ばれたときの配列っぽいリスト</td>
    </tr>
    <tr>
        <td style="border:none;">FileReader</td>
        <td style="border:none;">ファイルの中身（テキスト、画像など）を読み込むため</td>
    </tr>
</table>

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="zxYLQWj" data-pen-title="js-file-api" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/zxYLQWj">
  js-file-api</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

# バイナリーデータ

Javascript では、画像、音声、動画などを扱うときに**バイナリーデータ**と呼ばれるデータ形式を利用します。

バイナリデータは 0 と 1 で構成された生データであり、ファイルやメモリの内容をそのまま格納したものです。

以下に、Javascript でバイナリーデータを扱うためのオブジェクトやインターフェースについてをいくつか記載します。

## ArrayBuffer

ArrayBuffer は、JavaScript でバイナリデータをメモリ上に格納するためのオブジェクトです。

```javascript
new ArrayBuffer(length);
```

引数 length には、メモリ上に確保する領域のサイズをバイトで指定します。

使用例を以下に記載します。

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="GgRXOrq" data-pen-title="js-arraybuffer" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/GgRXOrq">
  js-arraybuffer</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

この例では、new ArrayBuffer(1) で 1 バイト（8 ビット）の空のバッファを確保し、そこに入力した数値（１バイトの最高値である 255 以内）を格納して、表示しています。

## TypedArray

TypedArray は型付配列とも呼ばれ、バイナリーデータの領域を配列の形で操作するための型付きの配列になります。

```javascript
new <型付配列のオブジェクト名>(length)
```

length には配列の要素の数を指定します。

利用には、後述するバイト境界やエンディアンを考慮する必要があります。

TypedArray のオブジェクトを以下に示します。

<table style="border:none;">
    <tr>
        <th style="border:none;">配列名</td>
        <th style="border:none;">説明</td>
    </tr>
    <tr>
        <td style="border:none;">Uint8Array()</td>
        <td style="border:none;">符号なし８ビット整数</td>
    </tr>
    <tr>
        <td style="border:none;">Uint8ClampedArray()</td>
        <td style="border:none;">入力値を0から255の間に揃える(0以下の数値を0,255以上の数値を255に)</td>
    </tr>
    <tr>
        <td style="border:none;">Uint16Array()</td>
        <td style="border:none;">符号なし１６ビット整数</td>
    </tr>
    <tr>
        <td style="border:none;">Uint32Array()</td>
        <td style="border:none;">符号なし３２ビット整数</td>
    </tr>
    <tr>
        <td style="border:none;">Int8Array()</td>
        <td style="border:none;">符号付き８ビット整数</td>
    </tr>
    <tr>
        <td style="border:none;">Int16Array()</td>
        <td style="border:none;">符号付き１６ビット整数</td>
    </tr>
    <tr>
        <td style="border:none;">Int32Array()</td>
        <td style="border:none;">符号付き３２ビット整数</td>
    </tr>
    <tr>
        <td style="border:none;">Float32Array()</td>
        <td style="border:none;">３２ビット浮動小数点数</td>
    </tr>
    <tr>
        <td style="border:none;">Float64Array()</td>
        <td style="border:none;">６４ビット浮動小数点数</td>
    </tr>
</table>

使用例を以下に示します。

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="JojaOxo" data-pen-title="js-typedarray" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/JojaOxo">
  js-typedarray</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

この例では、数値を Uint8Array 配列に読み取らせ、表示させています。

### エンディアン

エンディアンとは、複数バイトで表現されるデータ（数値など）を、メモリ上にどう配置するかの順序 を指します。

**ビッグエンディアン** とは最上位バイトから順にバイトが格納されます。

**リトルエンディアン** とは最上位バイトから順にバイトが格納されます。

CPU によっては最下位バイトから読んだ方が処理が速くなるため、リトルエンディアンで配置されます。

以下に、システムがビッグエンディアンかリトルエンディアンかを判定するコードを記載します。

```javascript
// システムのエンディアンを確認
function getSystemEndianness() {
  const buffer = new ArrayBuffer(4);
  const uint32View = new Uint32Array(buffer);
  const uint8View = new Uint8Array(buffer);

  uint32View[0] = 0x12345678;

  // ビッグエンディアンの場合は 0x12 が先頭
  return uint8View[0] === 0x12 ? "Big Endian" : "Little Endian";
}

console.log(getSystemEndianness()); // 通常は "Little Endian"
```

### バイト境界

TypedArray（型付き配列） がデータを格納・読み取る際に、メモリ上でのデータの配置が特定のバイト単位で揃っている必要があります。

TypedArray は特定のバイトサイズ（1, 2, 4, 8 バイトなど）でデータを格納するので、データはそのサイズの倍数でアライメント（整列）される必要があります。

例えば Uint16Array 等は要素のサイズが２バイトなので２の倍数、Uint32Array は要素のサイズが 4 倍となので４の倍数のアドレスに要素を配置する必要があります。

以下は、TypedArray のバイト境界ルールです。

<table style="border:none;">
    <tr>
        <th style="border:none;">TypedArray</td>
        <th style="border:none;">バイトサイズ</td>
        <th style="border:none;">バイト境界</td>
    </tr>
    <tr>
        <td style="border:none;">Int8Array / Uint8Array</td>
        <td style="border:none;">1バイト</td>
        <td style="border:none;">1バイト</td>
    </tr>
    <tr>
        <td style="border:none;">Int16Array / Uint16Array</td>
        <td style="border:none;">2バイト</td>
        <td style="border:none;">2バイト</td>
    </tr>
    <tr>
        <td style="border:none;">Int32Array / Uint32Array</td>
        <td style="border:none;">4バイト</td>
        <td style="border:none;">4バイト</td>
    </tr>
    <tr>
        <td style="border:none;">Float32Array</td>
        <td style="border:none;">4バイト</td>
        <td style="border:none;">4バイト</td>
    </tr>
    <tr>
        <td style="border:none;">Float64Array</td>
        <td style="border:none;">8バイト</td>
        <td style="border:none;">8バイト</td>
    </tr>
</table>

以下に一例を記載します（エラーになる例もあるので直書きにしています）

```javascript
/***
 * 正しい例
 */
let buffer = new ArrayBuffer(8); // 8バイトのバッファを作成
let int32View = new Int32Array(buffer, 0, 2); // 4バイト境界で開始

int32View[0] = 42;
int32View[1] = 100;

console.log(int32View[0]); // 42
console.log(int32View[1]); // 100
```

この場合、Int32Array は 4 バイト単位 でデータを読み書きしているので、問題なく動作します。

```javascript
/**
 * エラーになる例
 */
buffer = new ArrayBuffer(8);
int32View = new Int32Array(buffer, 1, 2); // 1バイトずれた位置で開始

// Error: Uncaught RangeError: Start offset of Int32Array should be a multiple of 4.
```

Int32Array は 4 バイト境界 に揃えられる必要があるため、1 バイトずれた位置から開始しようとすると RangeError が発生します。

## DataView

TypedArray では同じ型の配列のみですが、DataView では異なる型を含める事ができます。構文は以下となります。

```javascript
new DataView(buffer [, byteOffset [, byteLength]])
```

| パラメータ | 説明                                                     |
| :--------- | :------------------------------------------------------- |
| buffer     | バイナリデータを格納した ArrayBuffer                     |
| byteOffset | 読み書き開始位置のバイトオフセット（デフォルトは 0）     |
| byteLength | DataView の長さ（省略時は buffer.byteLength 全体を使用） |

DataView の特徴としては以下があります。

|:---|:---|
|バイナリデータの読み書き|ArrayBuffer 内のデータを任意の型で読み書きできる|
|エンディアン制御|ビッグエンディアン / リトルエンディアンの制御が可能|
|型の柔軟性|8 ビット、16 ビット、32 ビット、64 ビットの整数や浮動小数点数をサポート|
|オフセット指定|バイト単位で任意の位置から読み書き可能|
|高度なバイナリ操作|画像、音声、動画、ファイル解析、通信プロトコル解析などに応用可能|

また、DataView の主なメソッドを以下に示します。

| メソッド               | バイト数 | 説明                                                                          |
| :--------------------- | :------- | :---------------------------------------------------------------------------- |
| getInt8(byteOffset)    | 1        | DataView の先頭から指定されたバイト数の位置で 8 ビット符号付き整数を読み取る  |
| getUint8(byteOffset)   | 1        | DataView の先頭から指定されたバイト数の位置で 8 ビット符号なし整数を読み取る  |
| getInt16(byteOffset)   | 2        | DataView の先頭から指定されたバイト数の位置で 16 ビット符号付き整数を読み取る |
| getUint16(byteOffset)  | 2        | DataView の先頭から指定されたバイト数の位置で 16 ビット符号なし整数を読み取る |
| getInt32(byteOffset)   | 4        | DataView の先頭から指定されたバイト数の位置で 32 ビット符号付き整数を読み取る |
| getUint32(byteOffset)  | 4        | DataView の先頭から指定されたバイト数の位置で 32 ビット符号なし整数を読み取る |
| getFloat32(byteOffset) | 4        | DataView の先頭から指定されたバイト数の位置で 32 ビット浮動小数点を読み取る   |
| getFloat64(byteOffset) | 8        | DataView の先頭から指定されたバイト数の位置で 64 ビット浮動小数点を読み取る   |

| メソッド                      | バイト数 | 説明                                                                          |
| :---------------------------- | :------- | :---------------------------------------------------------------------------- |
| setInt8(byteOffset, value)    | 1        | DataView の先頭から指定されたバイト数の位置で 8 ビット符号付き整数を書き込む  |
| setUint8(byteOffset, value)   | 1        | DataView の先頭から指定されたバイト数の位置で 8 ビット符号なし整数を書き込む  |
| setInt16(byteOffset, value)   | 2        | DataView の先頭から指定されたバイト数の位置で 16 ビット符号付き整数を書き込む |
| setUint16(byteOffset, value)  | 2        | DataView の先頭から指定されたバイト数の位置で 16 ビット符号なし整数を書き込む |
| setInt32(byteOffset, value)   | 4        | DataView の先頭から指定されたバイト数の位置で 32 ビット符号付き整数を書き込む |
| setUint32(byteOffset, value)  | 4        | DataView の先頭から指定されたバイト数の位置で 32 ビット符号なし整数を書き込む |
| setFloat32(byteOffset, value) | 4        | DataView の先頭から指定されたバイト数の位置で 32 ビット浮動小数点を書き込む   |
| setFloat64(byteOffset, value) | 8        | DataView の先頭から指定されたバイト数の位置で 64 ビット浮動小数点を書き込む   |

以下に簡単な使用例を記載します。

```javascript
const buffer = new ArrayBuffer(8); // 8バイトのバッファ
const view = new DataView(buffer);

// データを書き込み
view.setInt8(0, 127); // 8ビット整数
view.setUint8(1, 255); // 8ビット符号なし整数
view.setInt16(2, 0x1234, true); // 16ビット整数（リトルエンディアン）
view.setFloat32(4, 3.14, false); // 32ビット浮動小数点（ビッグエンディアン）

// データを読み取り
console.log(view.getInt8(0)); // 127
console.log(view.getUint8(1)); // 255
console.log(view.getInt16(2, true)); // 4660 (0x1234)
console.log(view.getFloat32(4, false)); // 3.14
```

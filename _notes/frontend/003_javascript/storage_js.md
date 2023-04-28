---
title: "ストレージ(JavaScript)"
date: "2023-04-28T23:24:26.000Z"
excerpt: 'Javascriptでの動画・音声について'
tag: ["Web","HTML","Javascript"]
updatedAt: '2023-04-28T23:24:26.000Z'
author:
  name: Tatsuroh Wakasugi
  picture: '/assets/blog/authors/WAT.jpg'
link:
  javascript: ['/assets/note/frontend/javascript/storage.js']
draft: true
---

Javascriptで扱えるストレージについてを示す。

# Web Storage

Web Storageは、大容量(数MB)のデータをブラウザ側に蓄積するためのAPIである。キーと値のペアでデータを保存し、キーを指定すると、それに対応する値を取り出すことができる。

Web Storageによって表示コンテンツを事前にブラウザに蓄積することができ、それによりサーバ負荷の低減やパフォーマンスの向上が見込まれる。

Web Storageで定義されているストレージには次の２種類がある。

- セッションストレージ　・・・　ウィンドウごとのセッションで有効なストレージ
- ローカルストレージ　　・・・　ブラウザ内に永続的にデータを保存するストレージ

両ストレージに共通するプロパティ、メソッドは以下の通り。

<hr>
<table style="border:none;">
    <tr>
        <th style="border:none;">プロパティ名</td>
        <th style="border:none;">意味</td>
    </tr>
    <tr>
        <td style="border:none;">length</td>
        <td style="border:none;">格納されているデータの数</td>
    </tr>
</table>

<hr>
<table style="border:none;">
    <tr>
        <th style="border:none;">メソッド名</td>
        <th style="border:none;">意味</td>
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
        <td style="border:none;">全データを削除する</td>
    </tr>
</table>


以下に、セッションストレージを使った例を載せてみる。

HTML

```html
テキスト入力(セッションストレージから取得/保存)<br>
<textarea id="text" rows="4" cols="20"></textarea><br>
<input type="button" value="セッションストレージに保存" onclick="save()">
<script type="text/javascript" src="/js_sample_pages/storage.js"></script>
```

Javascript

```javascript
function save() {
    //入力データを取得
    var inputtext = document.getElementById("text").value;
    //セッションストレージに保存
    sessionStorage.setItem("text",inputtext);
}

window.onload = function(){
    //セッションストレージから取得
    var text = sessionStorage.getItem("text");
    //入力欄にデータを表示
    document.getElementById("text").value=text
}
```

表示例

<hr>
テキスト入力(セッションストレージから取得/保存)<br>
<textarea id="text" rows="4" cols="20"></textarea><br>
<input type="button" value="セッションストレージに保存" onclick="save()">
<script type="text/javascript" src="/js_sample_pages/storage.js"></script>
<hr>

上記例では、まずテキストボックスにセッションストレージに保存されている値が入るが、初期状態だと何も保存されてないので入らない。

テキストボックスに何か入力した上でボタンを押下すると、テキストボックスに入力した値をセッションストレージに保存する。

その後、ブラウザを更新すると、テキストボックスには先程入力した値(セッションストレージにある値)が最初から入ってくる。

ただし、セッションストレージなので、一回ブラウザを閉じるとその値は削除される。


# Indexed Database API

Indexed Database APIは、値とオブジェクトを保存できるローカルのデータベースである。

Web Storageとは異なり、データベースとして扱うことができる。

このデータベースは、ブラウザ上で確認できる。

Indexed Database APIでは、**オブジェクトストア**と呼ばれる領域に、キーバリュー型で格納されるバリューの**オブジェクト**を格納している。

Indexed Database APIのオブジェクトは、JavascriptのIDBEnvironmentのプロパティに定義されている。

<table style="border:none;">
    <tr>
        <th style="border:none;">プロパティ名</td>
        <th style="border:none;">意味</td>
    </tr>
    <tr>
        <td style="border:none;">indexedDB</td>
        <td style="border:none;">データベースを生成・削除するためのオブジェクト</td>
    </tr>
</table>

<hr>

このindexedDBはIDBFactory型のオブジェクトである。IDBFactoryのAPIは以下の通り。

<table style="border:none;">
    <tr>
        <th style="border:none;">メソッド名</td>
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
</table>

<hr>

上記のAPIは、返り値としてIDBOpenDBRequest型のオブジェクトを返す。

IDBOpenDBRequest型はIDBRequestを継承しており、IDBRequestのAPIは以下の通り。

<table style="border:none;">
    <tr>
        <th style="border:none;">プロパティ名</td>
        <th style="border:none;">意味</td>
    </tr>
    <tr>
        <td style="border:none;">result</td>
        <td style="border:none;">データベースへの操作の実行結果</td>
    </tr>
    <tr>
        <td style="border:none;">error</td>
        <td style="border:none;">エラーが発生した場合のオブジェクト</td>
    </tr>
    <tr>
        <td style="border:none;">transaction</td>
        <td style="border:none;">本処理のトランザクション(IDBTransaction型)</td>
    </tr>
</table>

<table style="border:none;">
    <tr>
        <th style="border:none;">イベントハンドラ名</td>
        <th style="border:none;">意味</td>
    </tr>
    <tr>
        <td style="border:none;">onsuccess</td>
        <td style="border:none;">正常終了した場合</td>
    </tr>
    <tr>
        <td style="border:none;">onerror</td>
        <td style="border:none;">エラーが発生した場合</td>
    </tr>
</table>

IDBOpenDBRequest型のAPIは以下の通り。


<table style="border:none;">
    <tr>
        <th style="border:none;">イベントハンドラ名</td>
        <th style="border:none;">意味</td>
    </tr>
    <tr>
        <td style="border:none;">onblocked</td>
        <td style="border:none;">処理をブロックした場合に呼ばれる</td>
    </tr>
    <tr>
        <td style="border:none;">onupgradeneeded</td>
        <td style="border:none;">アップグレード処理が必要になった場合に呼ばれる。データベースが存在しない場合にopenメソッドを利用した時も発生する</td>
    </tr>
</table>


open()メソッドによりデータベースが作成され、IDBOpenDBRequestオブジェクトが返される。

成功時、その実行結果のresultプロパティにIDBDatabaseオブジェクトが格納されている。

IDBDatabase型のAPIは以下の通り。

<table style="border:none;">
    <tr>
        <th style="border:none;">プロパティ名</td>
        <th style="border:none;">意味</td>
    </tr>
    <tr>
        <td style="border:none;">name</td>
        <td style="border:none;">データベースの名前</td>
    </tr>
    <tr>
        <td style="border:none;">version</td>
        <td style="border:none;">データベースのバージョン</td>
    </tr>
    <tr>
        <td style="border:none;">objectStoreNames</td>
        <td style="border:none;">データベースが保持しているオブジェクトストアの名前のリスト</td>
    </tr>
</table>

<table style="border:none;">
    <tr>
        <th style="border:none;">メソッド名</td>
        <th style="border:none;">意味</td>
    </tr>
    <tr>
        <td style="border:none;">createObjectStore()</td>
        <td style="border:none;">オブジェクトストアを生成(IDBObjectStore型オブジェクトを返す)</td>
    </tr>
    <tr>
        <td style="border:none;">deleteObjectStore()</td>
        <td style="border:none;">オブジェクトストアを削除</td>
    </tr>
    <tr>
        <td style="border:none;">transaction()</td>
        <td style="border:none;">トランザクションを生成(IDBTransactionオブジェクトを返す)</td>
    </tr>
    <tr>
        <td style="border:none;">close()</td>
        <td style="border:none;">データベースとの接続を終了する</td>
    </tr>
</table>

<table style="border:none;">
    <tr>
        <th style="border:none;">イベントハンドラ名</td>
        <th style="border:none;">意味</td>
    </tr>
    <tr>
        <td style="border:none;">onversionchange</td>
        <td style="border:none;">バージョンが変更された場合</td>
    </tr>
    <tr>
        <td style="border:none;">onerror</td>
        <td style="border:none;">エラーが発生した場合</td>
    </tr>
</table>


このうちtransaction()メソッドではIDBTransaction型のオブジェクトが返される。

IDBTransaction型のAPIは以下の通り。

<table style="border:none;">
    <tr>
        <th style="border:none;">プロパティ名</td>
        <th style="border:none;">意味</td>
    </tr>
    <tr>
        <td style="border:none;">mode</td>
        <td style="border:none;">トランザクションのモード</td>
    </tr>
    <tr>
        <td style="border:none;">db</td>
        <td style="border:none;">トランザクションが属しているデータベース</td>
    </tr>
    <tr>
        <td style="border:none;">error</td>
        <td style="border:none;">エラーが発生した場合のエラーオブジェクト</td>
    </tr>
</table>

<table style="border:none;">
    <tr>
        <th style="border:none;">メソッド名</td>
        <th style="border:none;">意味</td>
    </tr>
    <tr>
        <td style="border:none;">objectStore()</td>
        <td style="border:none;">指定したオブジェクトストアを返す</td>
    </tr>
    <tr>
        <td style="border:none;">abort()</td>
        <td style="border:none;">トランザクションをabortする</td>
    </tr>
</table>

<table style="border:none;">
    <tr>
        <th style="border:none;">イベントハンドラ名</td>
        <th style="border:none;">意味</td>
    </tr>
    <tr>
        <td style="border:none;">onabort</td>
        <td style="border:none;">abortされた場合に呼ばれる</td>
    </tr>
    <tr>
        <td style="border:none;">oncomplete</td>
        <td style="border:none;">完了した場合に呼ばれる</td>
    </tr>
    <tr>
        <td style="border:none;">onerror</td>
        <td style="border:none;">完了した場合に呼ばれる</td>
    </tr>
</table>

<hr>


# File API

File APIは、ローカルファイルの属性や内容を取得できるAPIである。

File APIは、ブラウザ上でユーザが選択したファイルを扱う事ができる。ファイルが選択した時に取得する事ができるFileList型オブジェクトには、ユーザが選択したファイルが格納される。

まず、FileList型のAPIを以下に示す。

<table style="border:none;">
    <tr>
        <th style="border:none;">プロパティ名</td>
        <th style="border:none;">意味</td>
    </tr>
    <tr>
        <td style="border:none;">length</td>
        <td style="border:none;">含まれるファイル数</td>
    </tr>
</table>

<table style="border:none;">
    <tr>
        <th style="border:none;">メソッド名</td>
        <th style="border:none;">意味</td>
    </tr>
    <tr>
        <td style="border:none;">item()</td>
        <td style="border:none;">指定されたインデックスのFileオブジェクトを返す</td>
    </tr>
</table>

<hr>

このitem()メソッドで返されるのはファイルを示すFileオブジェクトである。

Fileオブジェクトはバイナリーデータを扱うBlobオブジェクトを継承している。まずはBlobオブジェクトのAPIを示す。

<table style="border:none;">
    <tr>
        <th style="border:none;">プロパティ名</td>
        <th style="border:none;">意味</td>
    </tr>
    <tr>
        <td style="border:none;">size</td>
        <td style="border:none;">Blobオブジェクトのバイト数</td>
    </tr>
    <tr>
        <td style="border:none;">type</td>
        <td style="border:none;">Blobオブジェクトのメディアタイプ</td>
    </tr>
</table>

<table style="border:none;">
    <tr>
        <th style="border:none;">メソッド名</td>
        <th style="border:none;">意味</td>
    </tr>
    <tr>
        <td style="border:none;">close()</td>
        <td style="border:none;">Blobオブジェクトを閉じる</td>
    </tr>
</table>

<hr>

File型のAPIは以下の通り。

<table style="border:none;">
    <tr>
        <th style="border:none;">プロパティ名</td>
        <th style="border:none;">意味</td>
    </tr>
    <tr>
        <td style="border:none;">name</td>
        <td style="border:none;">ファイル名</td>
    </tr>
    <tr>
        <td style="border:none;">lastModifiedDate</td>
        <td style="border:none;">ファイルが最後に修正された日時</td>
    </tr>
</table>

Fileオブジェクトを取得したら、FileReaderオブジェクトをインスタンスかしてコンテンツをメモリに読み取る。

FileReaderのAPIは以下の通り。

<table style="border:none;">
    <tr>
        <th style="border:none;">プロパティ名</td>
        <th style="border:none;">意味</td>
    </tr>
    <tr>
        <td style="border:none;">readyState</td>
        <td style="border:none;">(下記の定数の表にある状態を返す)</td>
    </tr>
    <tr>
        <td style="border:none;">result</td>
        <td style="border:none;">ファイルの内容を読み込んだメソッドに合わせた型で表す</td>
    </tr>
    <tr>
        <td style="border:none;">error</td>
        <td style="border:none;">ファイルの読み込みで発生したエラーに関するオブジェクト</td>
    </tr>
</table>

<table style="border:none;">
    <tr>
        <th style="border:none;">定数名</td>
        <th style="border:none;">意味</td>
    </tr>
    <tr>
        <td style="border:none;">EMPTY</td>
        <td style="border:none;">FileReaderオブジェクトが生成されて、まだデータを読み込んでない状態</td>
    </tr>
    <tr>
        <td style="border:none;">LOADING</td>
        <td style="border:none;">ファイルのデータを読み込んでいる状態</td>
    </tr>
    <tr>
        <td style="border:none;">DONE</td>
        <td style="border:none;">ファイルのデータをメモリ上にロードし終わったが、途中でエラーが発生した状態</td>
    </tr>
</table>

<table style="border:none;">
    <tr>
        <th style="border:none;">メソッド名</td>
        <th style="border:none;">意味</td>
    </tr>
    <tr>
        <td style="border:none;">readAsArrayBuffer()</td>
        <td style="border:none;">データをArrayBuffer(バイナリデータ)として読み込む</td>
    </tr>
    <tr>
        <td style="border:none;">readAsText()</td>
        <td style="border:none;">データをテキストとして読み込む</td>
    </tr>
    <tr>
        <td style="border:none;">readAsDataURL()</td>
        <td style="border:none;">データをDataURLとして読み込む</td>
    </tr>
    <tr>
        <td style="border:none;">abort()</td>
        <td style="border:none;">データの読み込みを中断する</td>
    </tr>
</table>

<table style="border:none;">
    <tr>
        <th style="border:none;">イベントハンドラ名</td>
        <th style="border:none;">意味</td>
    </tr>
    <tr>
        <td style="border:none;">onloadstart</td>
        <td style="border:none;">読み込みが開始したときに呼ばれる</td>
    </tr>
    <tr>
        <td style="border:none;">onload</td>
        <td style="border:none;">読み込みが正常終了したときに呼ばれる</td>
    </tr>
    <tr>
        <td style="border:none;">onabort</td>
        <td style="border:none;">読み込みが中断された場合に呼ばれる</td>
    </tr>
    <tr>
        <td style="border:none;">onerror</td>
        <td style="border:none;">読み込みが失敗したときに呼ばれる</td>
    </tr>
</table>


# バイナリデータ

バイナリデータ等を扱うデータ型について述べる。

## ArrayBuffer

ArrayBuffer型はバイナリデータの領域を確保するデータ型である。

宣言は以下の通りで、引数には確保する領域のサイズを入力する。

```javascript
new ArrayBuffer(領域のサイズ);
```

プロパティ、メソッドは以下の通り。

<table style="border:none;">
    <tr>
        <th style="border:none;">プロパティ名</td>
        <th style="border:none;">意味</td>
    </tr>
    <tr>
        <td style="border:none;">byteLength</td>
        <td style="border:none;">サイズ</td>
    </tr>
</table>

<table style="border:none;">
    <tr>
        <th style="border:none;">メソッド名</td>
        <th style="border:none;">意味</td>
    </tr>
    <tr>
        <td style="border:none;">slice()</td>
        <td style="border:none;">指定した開始位置から終了位置までを切り出す</td>
    </tr>
</table>

## Blob

BlobはBinary Large Objectの略で、主に32KB以上の大きさのデータを扱うためのデータ型である。

プロパティ、メソッドは以下の通り。

<table style="border:none;">
    <tr>
        <th style="border:none;">プロパティ名</td>
        <th style="border:none;">意味</td>
    </tr>
    <tr>
        <td style="border:none;">size</td>
        <td style="border:none;">Blobオブジェクトのサイズ(バイト)</td>
    </tr>
    <tr>
        <td style="border:none;">type</td>
        <td style="border:none;">Blobオブジェクトに含まれるデータのMIMEタイプ</td>
    </tr>
</table>

<table style="border:none;">
    <tr>
        <th style="border:none;">メソッド名</td>
        <th style="border:none;">意味</td>
    </tr>
    <tr>
        <td style="border:none;">slice()</td>
        <td style="border:none;">指定した開始位置から終了位置までを別blobオブジェクトとして切り出す</td>
    </tr>
</table>


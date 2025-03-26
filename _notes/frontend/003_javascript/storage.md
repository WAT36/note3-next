---
title: "ストレージ(JavaScript)"
excerpt: ""
coverImage: ""
date: "2025-03-25T23:46:20.000Z"
updatedAt: "2025-03-25T23:46:20.000Z"
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

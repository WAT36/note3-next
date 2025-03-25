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

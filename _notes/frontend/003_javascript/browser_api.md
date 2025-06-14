---
title: "ブラウザ関連API"
excerpt: ""
coverImage: ""
date: "2025-03-25T23:43:20.000Z"
updatedAt: "2025-03-26T22:13:23.000Z"
tag: []
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
---

ブラウザに関する API について。

# History API

History API は、ブラウザの履歴を提供するための API である。また、ブラウザの戻る・進むボタンの様なページを遷移するためのイベントもここで行える。

主なプロパティ及びメソッドは以下の通り。

| プロパティ名 | 意味                 |
| :----------- | :------------------- |
| length       | 履歴の数             |
| state        | 最後に設定された状態 |

| メソッド       | 意味                                       |
| :------------- | :----------------------------------------- |
| go()           | 履歴において指定した番目のページへ遷移する |
| back()         | 1 つ前のページへ遷移する                   |
| forward()      | 1 つ後のページへ遷移する                   |
| pushState()    | 履歴に新しいページを追加する               |
| replaceState() | 履歴の現在のページの情報を書き換える       |

例を以下に示す。この例では、ボタンを押すと pushState()で色の情報を履歴に追加する。これにより、ボタンを押して色を変化させた後にブラウザの戻る・進むボタンを押すことで色が変化するようになる。

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="dPyjWLb" data-pen-title="js-history" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/dPyjWLb">
  js-history</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

# Location API

Location API は、画面の URL に関する操作を行う API である。

主なプロパティ及びメソッドは以下の通り。

| プロパティ名 | 意味                     |
| :----------- | :----------------------- |
| href         | URL 全体                 |
| protocol     | URL のプロトコル         |
| host         | URL のホストとポート番号 |
| hostname     | URL のドメイン           |
| port         | URL のポート番号         |
| pathname     | URL のパス               |
| search       | URL のクエリ             |
| hash         | URL のフラグメント識別子 |
| username     | ユーザ名                 |
| password     | パスワード               |
| origin       | オリジン                 |

| メソッド   | 意味                                                     |
| :--------- | :------------------------------------------------------- |
| assign()   | 指定したページをロードする                               |
| replace()  | 現在のページを履歴から削除し、指定したページをロードする |
| reload()   | 現在のページをリロードする                               |
| toString() | 現在のページの URL 全体を返す                            |

使用例を以下に示す。（利用している Codepen の情報が表示されます）

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="KwKBqge" data-pen-title="js-location" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/KwKBqge">
  js-location</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

# ブラウザの開発ツールによるテスト

Internet Explorer,Firefox,Google Chrome などといった様なブラウザには、開発用のツールを有している物がある。

この開発ツールを用いて、画面に関するテストやデバッグを行うことができる。

これらの機能は、Javascript の**console**オブジェクトを用いる。

console オブジェクトの主なメソッドを以下に記載する。

<table style="border:none;">
    <tr>
        <th style="border:none;">メソッド</td>
        <th style="border:none;">意味</td>
    </tr>
    <tr>
        <td style="border:none;">assert()</td>
        <td style="border:none;">テスト結果で異なっていた場合にエラーメッセージを出力</td>
    </tr>
    <tr>
        <td style="border:none;">count()</td>
        <td style="border:none;">通過した回数を出力</td>
    </tr>
    <tr>
        <td style="border:none;">debug()</td>
        <td style="border:none;">メッセージを出力</td>
    </tr>
    <tr>
        <td style="border:none;">error()</td>
        <td style="border:none;">エラーメッセージを出力</td>
    </tr>
    <tr>
        <td style="border:none;">group()</td>
        <td style="border:none;">以後に表示するメッセージをグループ化する</td>
    </tr>
    <tr>
        <td style="border:none;">groupend()</td>
        <td style="border:none;">グループ化する箇所を終了する</td>
    </tr>
    <tr>
        <td style="border:none;">info()</td>
        <td style="border:none;">メッセージ(info)を出力</td>
    </tr>
    <tr>
        <td style="border:none;">time()</td>
        <td style="border:none;">タイマー開始</td>
    </tr>
    <tr>
        <td style="border:none;">timeEnd()</td>
        <td style="border:none;">タイマー終了</td>
    </tr>
    <tr>
        <td style="border:none;">warn()</td>
        <td style="border:none;">メッセージ(warn)を出力</td>
    </tr>
</table>

例えば、以下のプログラムをブラウザ上のコンソールで実行してみる。
（表示に使用している CODEPEN というライブラリでは、現状このページで Javascript のコンソール出力を確認できないため、確認したい方は右上の「EDIT ON CODEPEN」>左下の「Console」を見て確認してください。）

<p class="codepen" data-height="300" data-default-tab="js" data-slug-hash="GgRGoZw" data-pen-title="js-console" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/GgRGoZw">
  js-console</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

上記のコンソール上での実行結果

![console](/assets/note/frontend/js/console.png)

---
title: "ブラウザ関連API"
excerpt: ""
coverImage: ""
date: "2025-03-25T23:43:20.000Z"
updatedAt: "2025-03-25T23:43:20.000Z"
tag: []
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
---

ブラウザに関する API について。

なお、ここではサンプルは一部割愛致します（ブラウザ遷移を伴ってしまうため・・・）

# History API

History API は、ブラウザの履歴を提供するための API である。また、ブラウザの戻る・進むボタンの様なページを遷移するためのイベントもここで行える。

主なプロパティ及びメソッドは以下の通り。

<table style="border:none;">
    <tr>
        <th style="border:none;">プロパティ名</td>
        <th style="border:none;">意味</td>
    </tr>
    <tr>
        <td style="border:none;">length</td>
        <td style="border:none;">履歴の数</td>
    </tr>
    <tr>
        <td style="border:none;">state</td>
        <td style="border:none;">最後に設定された状態</td>
    </tr>
</table>

<table style="border:none;">
    <tr>
        <th style="border:none;">メソッド</td>
        <th style="border:none;">意味</td>
    </tr>
    <tr>
        <td style="border:none;">go()</td>
        <td style="border:none;">履歴において指定した番目のページへ遷移する</td>
    </tr>
    <tr>
        <td style="border:none;">back()</td>
        <td style="border:none;">1つ前のページへ遷移する</td>
    </tr>
    <tr>
        <td style="border:none;">forward()</td>
        <td style="border:none;">1つ後のページへ遷移する</td>
    </tr>
    <tr>
        <td style="border:none;">pushState()</td>
        <td style="border:none;">履歴に新しいページを追加する</td>
    </tr>
    <tr>
        <td style="border:none;">forward()</td>
        <td style="border:none;">履歴の現在のページの情報を書き換える</td>
    </tr>
</table>

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

<table style="border:none;">
    <tr>
        <th style="border:none;">プロパティ名</td>
        <th style="border:none;">意味</td>
    </tr>
    <tr>
        <td style="border:none;">href</td>
        <td style="border:none;">URL全体</td>
    </tr>
    <tr>
        <td style="border:none;">protocol</td>
        <td style="border:none;">URLのプロトコル</td>
    </tr>
    <tr>
        <td style="border:none;">host</td>
        <td style="border:none;">URLのホストとポート番号</td>
    </tr>
    <tr>
        <td style="border:none;">hostname</td>
        <td style="border:none;">URLのドメイン</td>
    </tr>
    <tr>
        <td style="border:none;">port</td>
        <td style="border:none;">URLのポート番号</td>
    </tr>
    <tr>
        <td style="border:none;">pathname</td>
        <td style="border:none;">URLのパス</td>
    </tr>
    <tr>
        <td style="border:none;">search</td>
        <td style="border:none;">URLのクエリ</td>
    </tr>
    <tr>
        <td style="border:none;">hash</td>
        <td style="border:none;">URLのフラグメント識別子</td>
    </tr>
    <tr>
        <td style="border:none;">username</td>
        <td style="border:none;">ユーザ名</td>
    </tr>
    <tr>
        <td style="border:none;">password</td>
        <td style="border:none;">パスワード</td>
    </tr>
</table>

<table style="border:none;">
    <tr>
        <th style="border:none;">メソッド</td>
        <th style="border:none;">意味</td>
    </tr>
    <tr>
        <td style="border:none;">assign()</td>
        <td style="border:none;">指定したページをロードする</td>
    </tr>
    <tr>
        <td style="border:none;">reload()</td>
        <td style="border:none;">現在のページをリロードする</td>
    </tr>
    <tr>
        <td style="border:none;">toString()</td>
        <td style="border:none;">現在のページのURL全体を返す</td>
    </tr>
</table>

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

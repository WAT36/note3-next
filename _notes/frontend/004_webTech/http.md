---
title: "HTTP・HTTPS"
date: "2023-03-24T21:37:50.000Z"
excerpt: 'HTTP・HTTPSについて'
tag: ["Web","HTML","CSS"]
updatedAt: '2023-03-24T21:37:50.000Z'
author:
  name: Tatsuroh Wakasugi
  picture: '/assets/blog/authors/WAT.jpg'
---


HTTP、HTTPSプロトコルについてを述べる。

# HTTPプロトコル

HTTP(Hyper Text Transfer Protocol)とは、WebサーバとクライアントのWebブラウザ間でHTML文書などのテキストメッセージを受け渡すためのプロトコルである。

HTTPの通信は、クライアントからサーバへの**HTTPリクエスト**と、サーバからクライアントへの**HTTPレスポンス**の2つに分けられる。

<img src="/assets/note/frontend/web_other/http1.png">


# HTTPSプロトコル

HTTPSプロトコルは、大まかにいうとセキュリティを確保した通信路上でHTTP通信を行うプロトコルである。

HTTP通信を行う前に、セキュリティの確保として、データを暗号化して送受信するプロトコルであるSSLプロトコル(またはTLSプロトコル)を利用しセッションを確定する。その後に、HTTPセッションの接続を行う。

<img src="/assets/note/frontend/web_other/https.png">


# HTTPのメッセージ構造

HTTPのメッセージは大きく開始行、ヘッダフィールド、CRLFの改行、メッセージボディの4つに分けられる。

- 開始行 (リクエストライン/ステータスライン)
- ヘッダフィールド(０行以上、以下から構成)
 - General-header
 - Request-header
 - Response-header
 - Entity-header
- 改行(CRLF)
- メッセージボディ


# HTTPの開始行(リクエストメッセージ)

HTTPメッセージの一番最初に書く開始行は以下のような構造になる。

```
メソッド  /任意のパス(+クエリストリング)  HTTP/1.1
```

クエリストリングとはリクエストと同時に送るデータのことで、任意のパスの後に"?"を書き、その後にデータを記入する。

また、メソッドとは以下のいずれかである。

<table>
    <thead>
        <th>メソッド名</th>
        <th>説明</th>
    </thead>
    <tr>
        <td>GET</td>
        <td>指定したURL(URI)で識別されるリソースを取得</td>
    </tr>
    <tr>
        <td>POST</td>
        <td>指定したURL(URI)で識別されるリソースの子リソースの作成、またはリソースへのデータの追加などを要求</td>
    </tr>
    <tr>
        <td>PUT</td>
        <td>指定したURL(URI)に対してエンティティ(メッセージボディ)に含まれる情報を保存することを要求</td>
    </tr>
    <tr>
        <td>HEAD</td>
        <td>GETと同じだがヘッダのみを取得</td>
    </tr>
    <tr>
        <td>OPTIONS</td>
        <td>指定したURL(URI)がサポートしているメソッドを取得</td>
    </tr>
    <tr>
        <td>DELETE</td>
        <td>指定したURL(URI)で識別されるリソースの削除を要求</td>
    </tr>
    <tr>
        <td>TRACE</td>
        <td>自分宛にリクエストメッセージを要求するループバック試験に使用</td>
    </tr>
</table>

このうちよく使われるのはGETとPOSTである。


# HTTPのレスポンスメッセージ

HTTPのレスポンスメッセージの例は以下の通り。上から開始行、ヘッダフィールド、改行、メッセージボディの順。


```
HTTP/1.1 200 OK
```

```
Date:Wed,  19 Aug 2020 23:48:50 GMT
Server:Apache
Content-type:text/html
```

```
(改行)
```

```
<!DOCTYPE html>
・・・
・・・
```

ここで、レスポンスメッセージの開始行には、レスポンスの状態を示す3桁の数字「ステータスコード」が含まれている。

ステータスコードは以下のように分類される。

<table>
    <thead>
        <th>ステータスコード</th>
        <th>説明</th>
    </thead>
    <tr>
        <td>1xx</td>
        <td>Informational(情報提供のコード)</td>
    </tr>
    <tr>
        <td>2xx</td>
        <td>Success(成功)</td>
    </tr>
    <tr>
        <td>3xx</td>
        <td>Redirection(転送)</td>
    </tr>
    <tr>
        <td>4xx</td>
        <td>Client Error(クライアントエラー)</td>
    </tr>
    <tr>
        <td>5xx</td>
        <td>Server Error(サーバーエラー)</td>
    </tr>
</table>


# HTTPのヘッダフィールド

ヘッダフィールドには、メッセージの外部情報（メタ情報）を扱うためのHTTPヘッダが含まれる。

HTTPヘッダとして代表的なものを示す。

<table>
    <thead>
        <th>ヘッダ名</th>
        <th>説明</th>
    </thead>
    <tr>
        <td>Accept</td>
        <td>受入可能なメディア型</td>
    </tr>
    <tr>
        <td>Authorization</td>
        <td>HTTPの認証情報</td>
    </tr>
    <tr>
        <td>Cache-Control</td>
        <td>キャッシュの振る舞い</td>
    </tr>
    <tr>
        <td>Content-Language</td>
        <td>エンティティの自然言語</td>
    </tr>
    <tr>
        <td>Content-Length</td>
        <td>メッセージボディの長さ</td>
    </tr>
    <tr>
        <td>Content-Type</td>
        <td>メッセージボディの型</td>
    </tr>
    <tr>
        <td>Cookie</td>
        <td>ブラウザに保存されたクッキーの値</td>
    </tr>
    <tr>
        <td>Expires</td>
        <td>レスポンスの有効期間</td>
    </tr>
    <tr>
        <td>If-Modified-Since</td>
        <td>指定時刻以降に更新されているかを確認（条件付きGETで使用）</td>
    </tr>
    <tr>
        <td>Last-Modified</td>
        <td>リソースの最終更新時刻</td>
    </tr>
    <tr>
        <td>Referer</td>
        <td>リンクされている元のリソースのURL(URI)</td>
    </tr>
    <tr>
        <td>Set-Cookie</td>
        <td>Webサーバが生成したクッキーの値</td>
    </tr>
    <tr>
        <td>User-Agent</td>
        <td>ユーザーエージェントの名前</td>
    </tr>
</table>

# HTTPでの認証

HTTPでは、特定のファイルへのアクセスを制限するために認証することが可能である。

その種類は主に以下の２種類。


## Basic認証

Basic認証は、ユーザー名とパスワードをコロンで接続し、Base64でエンコードして送信することで認証を実施する方式である。

盗聴や改竄が容易にできてしまう。

<img src="/assets/note/frontend/web_other/basic.png" width="75%" height="75%">


## Digest認証

Digest認証は、Basic認証に加えて、盗聴や改竄を防ぐためにユーザー名とパスワードをMDSでハッシュ化して送信し、認証を実施する。

パスワードが暗号化されているので、盗聴できても解読しにくいという利点がある。

<img src="/assets/note/frontend/web_other/digest.png" width="75%" height="75%">


# HTTP cookie (クッキー)

HTTPは、システムの現在の状態を保持しない(ステートレスという)プロトコルであ利、クライアントとサーバ間の状態管理は行えないという点がある。

そこで、Webブラウザにcookie(クッキー)と呼ばれるデータを保持しておくことで、HTTPでの状態管理を実現することができる。

代表的な使用例としては、Webサイト上でのログイン状態の記録、ECサイト上でのカート情報の管理などがある。

クッキーは、サーバからクライアントに返るときのHTTPレスポンスのヘッダ**Set-Cookie**にて指定される。

これにより、Webサーバ上で指定された情報がWebブラウザに保存される。

その後のWebページへのアクセス時には、保存していたクッキーをHTTPリクエストと同時にWebサーバに送ることで、状態管理を行う。

また、クッキーはJavaScriptを利用して、クライアント側で操作することもできる。

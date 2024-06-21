---
title: "HTTPヘッダ"
excerpt: ""
coverImage: ""
date: "2024-06-20T23:12:26.000Z"
updatedAt: "2024-06-20T23:12:26.000Z"
tag: ["Web"]
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
---

HTTP のヘッダについてよくわからなくなったので、個別に切り出して調べたことをまとめておく。

HTTP ヘッダは、HTTP リクエストおよびレスポンスメッセージに関する追加情報を提供するために使用される。HTTP ヘッダには多くの種類があり、それぞれ特定の役割を持っている。

HTTP ヘッダは自分で定義したものも入れ込むことができるため、厳密に全てのヘッダについてを挙げることはできないが、ここでは主要な HTTP ヘッダの種類とその詳細を記載する。

まず、HTTP ヘッダは大まかに以下の 4 種類に分けられる。

- 一般ヘッダ(General Headers)
- リクエストヘッダ（Request Headers）
- レスポンスヘッダ（Response Headers）
- エンティティヘッダ（Entity Headers）

以下、それぞれについて、代表的なものを挙げる。

# 一般ヘッダ（General Headers）

一般ヘッダは、リクエストおよびレスポンスの両方に使用され、メッセージ全体に適用される情報を提供する。

| ヘッダ名              | 意味                                                                                               | 指定する値・例など                                                                                                                 |
| :-------------------- | :------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------- |
| **Cache-Control**     | キャッシュディレクティブ(指示)を指定する。                                                         | max-age:キャッシュの保持秒数の指定<br>no-cache:キャッシュに保存されたデータを使う前にサーバに最新リソースがないか確認する<br>etc.. |
| **Connection**        | 接続の管理に関する指示を提供する。                                                                 | keep-alive:接続を維持する<br>close:接続を閉じる                                                                                    |
| **Date**              | メッセージが送信された日時を示する。                                                               | `Date: Wed, 21 Oct 2015 07:28:00 GMT` など                                                                                         |
| **Pragma**            | レガシーキャッシュ制御指示を提供する。                                                             | no-cache：キャッシュにあるデータを使う前にサーバーに最新リソースがないか確認する<br>`Cache-Control:no-cache`と同じ                 |
| **Trailer**           | トレーラーフィールド(メッセージの終わりに追加のフィールドを含めること)を許可するヘッダを指定する。 | (別のヘッダ名)                                                                                                                     |
| **Transfer-Encoding** | ペイロードの転送エンコード方式を指定する。                                                         | chuncked:データはチャンク (塊) の連続で送られる<br>compress:LZW アルゴリズムを使用する<br>etc..                                    |
| **Upgrade**           | プロトコルのアップグレードを示す。                                                                 | `HTTP/2.0` など                                                                                                                    |
| **Via**               | 中継プロキシサーバーの情報を示す。                                                                 | `1.0 fred, 1.1 example.com (Apache/1.1)`など                                                                                       |
| **Warning**           | キャッシュやプロキシに関連する警告を提供する。                                                     | `199 Miscellaneous warning`など                                                                                                    |

# リクエストヘッダ（Request Headers）

リクエストヘッダは、クライアントからサーバーへのリクエストに関する情報を提供する。

- **Accept**: クライアントが受け入れるメディアタイプを指定する。
  - 例: `Accept: text/html`
- **Accept-Charset**: クライアントが受け入れる文字セットを指定する。
  - 例: `Accept-Charset: utf-8`
- **Accept-Encoding**: クライアントが受け入れるエンコーディング方式を指定する。
  - 例: `Accept-Encoding: gzip, deflate`
- **Accept-Language**: クライアントが受け入れる言語を指定する。
  - 例: `Accept-Language: en-US`
- **Authorization**: 認証情報を提供する。
  - 例: `Authorization: Basic QWxhZGRpbjpPcGVuU2VzYW1l`
- **Expect**: クライアントがサーバーに期待する動作を指定する。
  - 例: `Expect: 100-continue`
- **From**: リクエストの送信者のメールアドレスを指定する。
  - 例: `From: user@example.com`
- **Host**: リクエストの対象ホストを指定する。
  - 例: `Host: www.example.com`
- **If-Match**: リソースの ETag と一致する場合にのみリクエストを実行する。
  - 例: `If-Match: "e0023aa4e"`
- **If-Modified-Since**: 指定日時以降に変更されている場合にのみリクエストを実行する。
  - 例: `If-Modified-Since: Sat, 29 Oct 1994 19:43:31 GMT`
- **If-None-Match**: リソースの ETag と一致しない場合にのみリクエストを実行する。
  - 例: `If-None-Match: "e0023aa4e"`
- **If-Range**: リソースが特定の ETag または日付に一致する場合に範囲リクエストを実行する。
  - 例: `If-Range: "737060cd8c284d8af7ad3082f209582d"`
- **If-Unmodified-Since**: 指定日時以降に変更されていない場合にのみリクエストを実行する。
  - 例: `If-Unmodified-Since: Sat, 29 Oct 1994 19:43:31 GMT`
- **Max-Forwards**: TRACE または OPTIONS リクエストがサーバーに転送される最大回数を指定する。
  - 例: `Max-Forwards: 10`
- **Proxy-Authorization**: プロキシサーバーの認証情報を提供する。
  - 例: `Proxy-Authorization: Basic QWxhZGRpbjpPcGVuU2VzYW1l`
- **Range**: 部分的なリソースのリクエスト範囲を指定する。
  - 例: `Range: bytes=500-999`
- **Referer**: リクエスト元の URL を指定する。
  - 例: `Referer: http://www.example.com/previous`
- **TE**: クライアントが受け入れる転送エンコーディングを指定する。
  - 例: `TE: trailers, deflate`
- **User-Agent**: クライアントのユーザーエージェント情報を提供する。
  - 例: `User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)`

# レスポンスヘッダ（Response Headers）

レスポンスヘッダは、サーバーからクライアントへのレスポンスに関する情報を提供する。

- **Accept-Ranges**: サーバーが受け入れる範囲リクエストの種類を指定する。
  - 例: `Accept-Ranges: bytes`
- **Age**: レスポンスがプロキシサーバーに保存されてからの経過時間（秒）を指定する。
  - 例: `Age: 12`
- **ETag**: リソースのバージョンを示す識別子を提供する。
  - 例: `ETag: "737060cd8c284d8af7ad3082f209582d"`
- **Location**: リダイレクト先の URL を指定する。
  - 例: `Location: http://www.example.com/`
- **Proxy-Authenticate**: プロキシサーバーの認証情報を要求する。
  - 例: `Proxy-Authenticate: Basic`
- **Retry-After**: サーバーが再試行を推奨する時間を指定する。
  - 例: `Retry-After: 120`
- **Server**: サーバーソフトウェアの情報を提供する。
  - 例: `Server: Apache/2.4.1 (Unix)`
- **Vary**: キャッシュのバリエーションの基準を指定する。
  - 例: `Vary: Accept-Encoding`
- **WWW-Authenticate**: クライアントの認証情報を要求する。
  - 例: `WWW-Authenticate: Basic`

# エンティティヘッダ（Entity Headers）

エンティティヘッダは、リクエストまたはレスポンスのペイロードに関する情報を提供する。

- **Allow**: リソースがサポートする HTTP メソッドを指定する。
  - 例: `Allow: GET, POST`
- **Content-Encoding**: エンティティのエンコード方式を指定する。
  - 例: `Content-Encoding: gzip`
- **Content-Language**: エンティティの言語を指定する。
  - 例: `Content-Language: en`
- **Content-Length**: エンティティのサイズをバイト単位で指定する。
  - 例: `Content-Length: 348`
- **Content-Location**: エンティティの代替位置を指定する。
  - 例: `Content-Location: /index.htm`
- **Content-MD5**: エンティティの MD5 ハッシュを指定する。
  - 例: `Content-MD5: Q2hlY2sgSW50ZWdyaXR5IQ==`
- **Content-Range**: エンティティの範囲を指定する。
  - 例: `Content-Range: bytes 21010-47021/47022`
- **Content-Type**: エンティティのメディアタイプを指定する。
  - 例: `Content-Type: text/html; charset=utf-8`
- **Expires**: エンティティの有効期限を指定する。
  - 例: `Expires: Thu, 01 Dec 1994 16:00:00 GMT`
- **Last-Modified**: エンティティの最終更新日時を指定する。
  - 例: `Last-Modified: Tue, 15 Nov 1994 12:45:26 GMT`

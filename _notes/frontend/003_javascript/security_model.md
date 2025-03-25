---
title: "セキュリティモデル(Javascript)"
excerpt: ""
coverImage: ""
date: '2025-03-25T23:16:20.000Z'
updatedAt: '2025-03-25T23:16:20.000Z'
tag: []
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
---

Javascript のセキュリティモデルに関する事項を述べる。

# クロスオリジン制約

コンテンツを取得する場合、それぞれのコンテンツのオリジンが同一の場合は「同一オリジン」からの取得という。異なる場合は「クロスオリジン」からの取得という。

オリジンとはスキーム・ホスト名・ポート番号で構成される、ドメインを表す物である。

例えば、以下の 2 つはスキームが https、ホスト名が hoge.hoge、ポート番号が 443 と同一なので、同一オリジンとなる。

```
https://hoge.hoge:443/index.html
https://hoge.hoge/sitemap.html
```

以下は、スキームが異なるのでクロスオリジンとなる。

```
http://hoge.hoge/sitemap.html
https://hoge.hoge/sitemap.html
```

# CORS(Cross-Originn Resource Sharing)

コンテンツによっては異なるオリジンのコンテンツ(CSS やフォントなど)で構成される場合もある。

そのような異なるオリジンからのアクセスについて、制御を規定しているのが**CORS(Cross-Origin Resource Sharing)**になる。

CORS では、クライアントとサーバ間の HTTP の仕様と、リクエストを受けるサーバ側で許可するオリジン、HTTP メソッド、HTTP ヘッダなどによるアクセス制御を規定する。

CORS には 2 通りの方法がある。1 つはシンプルにリクエスト・レスポンスの形式を取るもの、もう 1 つは、1 つ目に加えて HTTP リクエストの前に OPTIONS メソッドを用いてサーバとブラウザ間で安全を確かめるものである。

このうち、シンプルにリクエスト・レスポンスの形式を取る物についてまず述べる。これは以下の条件の場合に使用される。

- メソッドが「GET」「HEAD」「POST」のいずれかである。
- ヘッダが「Accept」「Accept-Lannguage」「Conntent-Language」「Content-Type」のいずれかである。
- Content-Type が「applicationn/x-www-form-urlencoded」「multipart/form-data」「text/plain」のいずれかである。

リクエストとレスポンスの例は以下の通り。

## リクエスト

リクエストはアクセス元のオリジンを Origin ヘッダに設定し、クロスオリジンのサーバにリクエストを送る。

```
GET https://foo.bar HTTP/1.1
Origin : https://hoge.hoge/index.html
```

## レスポンス

リクエストを受け付けたサーバは、Origin ヘッダに指定されたオリジンを見て、それが許可されているオリジンの設定に含まれている場合のみにレスポンスを返す。

レスポンスの Access-Controle-Allow-Origin ヘッダにアクセス元のオリジンを設定し、レスポンスを送る。

```
HTTP/1.1 200 OK
Access-Controle-Allow-Origin : https://hoge.hoge/index.html
```

# CORS のプリフライトリクエスト

続いて CORS のもう一つの方法について述べる。

シンプルなリクエスト以外の場合はプリフライトリクエストを利用する。プリフライトリクエスト・レスポンスでアクセス可能なことを確認してから、リクエスト・レスポンスを行う。

## プリフライトリクエスト

OPTIONS メソッドにアクセス元のオリジンを設定し、Access-Control-Request-Method にリクエストするメソッド、Access-Control-Request-Headers に CORS で指定するヘッダ名を指定する。

```
OPTIONS https://foo.bar HTTP/1.1
・・・
・・・
Origin : https://hoge.hoge/index.html
Access-Control-Request-Method: POST
Access-Control-Request-Headers: X-PINGOTHER
```

リクエストを受けたサーバは、OPTIONS メソッドの存在により、それがプリフライトリクエストであると認識する。

Origin ヘッダに、サーバにあらかじめ指定されたオリジン、Access-Control-Request-Method に指定されたメソッド、Access-Control-Request-Headers に指定されたヘッダが指定されている場合、アクセスを許可する。

<hr>

アクセス可能と判断したサーバは、レスポンス可能なアクセス元オリジンを Access-Control-Allow-Origin ヘッダに指定し、メソッドを Access-Control-Allow-Methods、ヘッダを Access-Control-Allow-Headers、アクセス許可の有効期限を秒単位で Access-Control-Max-Age に設定して返す。

```
HTTP/1.1 200 OK
・・
・・
Access-Control-Allow-Origin: http://foo.bar
Access-Control-Allow-Methods: POST, GET, OPTIONS
Access-Control-Allow-Headers: X-PINGOTHER, Content-Type
Access-Control-Max-Age: 3600
```

<hr>

プリフライトリクエストのレスポンスを受けたクライアントは、X-PINGOTHER ヘッダと Origin ヘッダを指定してリクエストを送信する。

```
OPTIONS https://foo.bar HTTP/1.1
・・・
・・・
Origin : https://hoge.hoge/index.html
Access-Control-Request-Method: POST
Access-Control-Request-Headers: X-PINGOTHER
```

<hr>

するとサーバから OK(Status code=200)が返される。

```
HTTP/1.1 200 OK
・・
・・
Access-Control-Allow-Origin: http://foo.bar
```

# セキュリティモデルと SSL

## 混在コンテンツ(Mixed Content)

HTTPS のページにも関わらず、一部のコンテンツが HTTP で取得されているものを混在コンテンツ(Mixed Content)という。

HTTP で取得されるコンテンツは盗聴や改竄が可能であり、元のページは完全には保護されたことにはならない。

## Secure Contexts

ローカルのファイルや通信、https による外部との通信によるコンテンツで構成される場合など、最小限のセキュリティレベルが保たれている場合、コンテンツは Secure Contexts(保護されたコンテキスト)にあるという。

ユーザーの位置情報等のプライバシーに関する情報を取得する API や、接続へのハイジャックの恐れがある API 等へのアクセスは、Secure Contexts になければならない、すなわち https でなければ実行されないことでコンテンツを保護することができる。

Secure Contexts であるページか否かは Windows オブジェクトの isSecureContext プロパティを参照して行う。

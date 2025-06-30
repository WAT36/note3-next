---
title: "コードのビルドと実行方法"
excerpt: ""
coverImage: ""
date: '2025-06-30T20:44:30.000Z'
updatedAt: '2025-06-30T20:44:30.000Z'
tag: ["Go"]
programming: ["Go"]
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
mode: programming
---

プログラミングで書いたコードのビルド及び実行方法についてを記載する。

<div class="note_content_by_programming_language" id="note_content_Java">

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

</div>
<div class="note_content_by_programming_language" id="note_content_Node.js">

</div>
<div class="note_content_by_programming_language" id="note_content_Go">

```bash
go run main.go

# または
go build -o myapp
./myapp
```

主に方法は２つある。

まずは `go run` コマンドを使う方法で、これによりソースコードを直接実行できる。（コンパイルから実行まで続けて行う）

もう一つは `go build -o 実行ファイル名` で実行ファイルを作成し、それを実行する方法です。

</div>

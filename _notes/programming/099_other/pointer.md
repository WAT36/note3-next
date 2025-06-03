---
title: "ポインタ"
excerpt: ""
tag: ["Go"]
programming: ["Go"]
date: "2025-05-28T20:41:38.000Z"
updatedAt: "2025-05-28T20:41:38.000Z"
tag: []
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

ポインタについてを記載する。

<div class="note_content_by_programming_language" id="note_content_Go">

```go
// ポインタ型
var 変数名 *型名

// 任意の型からポインタ型を生成する
&変数

// ポインタ型から値を参照する
*ポインタ型変数
```

Go ではポインタ型は「\*int」のようにポインタを使って参照・操作する型の前に「 \* 」をおくことで定義できます。初期値は nil になります。

```go
var p *int
```

また、演算子 **&** を使って、任意の型からそのポインタ型を生成する事ができます。

```go
var i int
p := &i
```

ポインタ型変数からその値を参照するには、演算子\*をポインタ型変数の前に置くことで、値を参照する事ができる。これを**デリファレンス**という。

```go
var i int
p := *i
fmt.Println(*p) // pが指す値を参照する
```

ポインタ型は配列に対しても利用可能です。

```go
p := &[3]int{1,2,3}
fmt.Println((*p)[0]) // 1
```

ポインタ型の変数にはメモリ上のアドレスの値が入っています。

fmt.Printf の「%p」で表示するとそのアドレスを表示させる事ができます。

```go
i := 5
ip := &i
fmt.Printf("%p",ip) // 0xc000010090 など
```

</div>

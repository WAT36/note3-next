---
title: '構造体'
excerpt: ''
tag: ["Go"]
programming: ["Go"]
date: '2025-06-04T21:44:07.000Z'
updatedAt: '2025-06-04T21:44:07.000Z'
tag: []
author:
  name: Tatsuroh Wakasugi
  picture: '/assets/blog/authors/WAT.jpg'
ogImage:
  url: ''
---

構造体についてを記載する。

<div class="note_content_by_programming_language" id="note_content_Go">

```go
type 構造体名 struct {
  X int // フィールドの定義。左は例
  // ...
}

// フィールドの参照
構造体型変数.フィールド名
```

Go では構造体を定義するには一般的に type と組み合わせて新しい型を定義します。

`struct { [フィールドの定義] }` という形で書きます。

フィールドは何個でも定義する事ができます。

```go
type Point struct {
  X int
  Y int
}
```

構造体内のフィールドを参照したり値を代入したいときは、`構造体型変数.フィールド名`で参照できます。

```go
var pt Point
pt.X // == 0
pt.Y // == 0

/*フィールドへの代入*/
pt.X = 10
pt.Y = 8
```

## 複合リテラル

構造体では各フィールドの初期値を指定しつつ構造体を生成できる**複合リテラル**といった機能があります。

`{}`で囲んだ中に各フィールドの初期値を列挙する事ができ、それぞれの値は構造体のフィールドが定義された順序に対応しています。

```go
pt := Point{1,2}
pt.X // == 1
pt.Y // == 2
```

</div>

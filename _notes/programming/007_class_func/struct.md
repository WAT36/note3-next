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

ポインタについてを記載する。

<div class="note_content_by_programming_language" id="note_content_Go">

```go
type 構造体名 struct {
  X int // フィールドの定義。左は例
  // ...
}
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

</div>

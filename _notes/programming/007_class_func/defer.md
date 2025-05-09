---
title: "defer文(Go)"
excerpt: "golangのdefer文について"
coverImage: ""
date: "2025-05-09T23:54:01.000Z"
updatedAt: "2025-05-09T23:54:01.000Z"
tag: []
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
---

<div class="note_content_by_programming_language" id="note_content_Go">

```go
func deferSample() {
  defer fmt.Println("defer") // deferで登録された式は関数の終了時に実行される
  fmt.Println("done")
}
```

Go には関数中で利用できる**defer**文があり、これを利用すると順序に関わらず、defer で宣言された式は関数の終了時に実行されるようになる。

defer 文は関数中に何個でも宣言可能であるが、その場合は**後ろから宣言された順**に実行されるので注意。

```go
func deferSample(){
  defer fmt.Println(1)
  defer fmt.Println(2)
  defer fmt.Println(3)
  fmt.Println(4)
  fmt.Println(5)
  fmt.Println(6)
}
deferSample()
```

実行結果

```
4
5
6
3
2
1
```

defer 文の用途としては、リソースの解放処理などが挙げられる。

例えばファイル処理などをしているときに、最後にファイルクローズをするのを忘れがちだが defer 文であらかじめ定義しておくことで解放漏れを防ぐことができる。

</div>

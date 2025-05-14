---
title: '並行処理'
excerpt: ''
tag: ["Go"]
programming: ["Go"]
date: '2025-05-14T00:57:33.000Z'
updatedAt: '2025-05-14T00:57:33.000Z'
tag: []
author:
  name: Tatsuroh Wakasugi
  picture: '/assets/blog/authors/WAT.jpg'
mode: programming
---

並行処理についてを記載する。

<div class="note_content_by_programming_language" id="note_content_Go">

```go
go 関数名()
```

Go には**go 文** があり、Go 言語と同じ名前でややこしいが、並行処理を司る特別な機能である。

go 文は関数呼び出し形式での式を受け取る形で実行でき、そうするとその関数が並行して実行される。

並行して実行される関数のことを**ゴルーチン(goroutine)**という。Go は、スレッドよりも小さい処理単位であるゴルーチンが並行して動作するように実装されている。go 文は、このゴルーチンを新たに生成して、メインスレッドとは別に並行して処理させるものである。

実行例

```go
func say(message string) {
	for i := 0; i < 3; i++ {
		fmt.Println(message)
		time.Sleep(100 * time.Millisecond)
	}
}

func main() {
	go say("こんにちは") // 並行処理
	say("Hello")    // メインスレッド
}
```

実行結果(一例)

```
Hello
こんにちは
こんにちは
Hello
Hello
こんにちは
```

</div>

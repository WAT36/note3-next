---
title: 'インターフェース'
excerpt: ''
tag: ["Go"]
programming: ["Go"]
date: '2025-06-11T20:39:58.000Z'
updatedAt: '2025-06-11T20:39:58.000Z'
tag: []
author:
  name: Tatsuroh Wakasugi
  picture: '/assets/blog/authors/WAT.jpg'
mode: programming
---

インターフェースについてを記載する。

<div class="note_content_by_programming_language" id="note_content_Go">

```go
type 型名 interface {
  // 定義
}
```

Go の「インターフェース（interface）」とは、複数の型に共通するメソッドの集合を抽象的に定義するものです。

オブジェクト指向言語における「インターフェース型」や「抽象クラス」に近い概念です。

Go での例として、代表的なインターフェース「error」を見てみます。

```go
type error interface {
  Error() string
}
```

Go では、エラーが発生する可能性がある関数やメソッドの戻り値として、この error 型がよく使われます。

この error 型では、文字列を返すメソッド Error のみが定義されています。

error インターフェースを実装した型を定義してみましょう。ここでは構造体 MyError 型を定義して error インターフェースが要求する Error() string をメソッドのシグネチャ通りに定義します。

これだけでインターフェースの実装は完了になります。

```go
/*独自のエラーを定義*/
type MyError struct {
  Message string
  ErrCode int
}

/*errorインターフェースのメソッドを実装*/
func (e *MyError) Error() string {
  return e.Message
}

func RaiseError() error {
  return &MyError{Message: "エラーが発生しました", ErrCode: 1234}
}

err := RaiseError()
err.Error() // === "エラーが発生しました"
```

</div>
